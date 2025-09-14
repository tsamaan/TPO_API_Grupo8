import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, writeFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))

// Database helpers
const DB_PATH = join(__dirname, '..', 'db.json')

const readDB = () => {
  try {
    const data = readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return { products: [], users: [], cart: [] }
  }
}

const writeDB = (data) => {
  try {
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing database:', error)
    return false
  }
}

// Response helpers
const successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data
  })
}

const errorResponse = (res, message = 'Error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null
  })
}

// Products routes
app.get('/products', (req, res) => {
  try {
    const db = readDB()
    const { category, tags_like } = req.query

    let products = db.products

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category)
    }

    // Filter by tags
    if (tags_like) {
      products = products.filter(p =>
        p.tags && p.tags.some(tag =>
          tag.toLowerCase().includes(tags_like.toLowerCase())
        )
      )
    }

    successResponse(res, products, 'Products retrieved successfully')
  } catch (error) {
    errorResponse(res, 'Error fetching products')
  }
})

app.get('/products/:id', (req, res) => {
  try {
    const db = readDB()
    const productId = parseInt(req.params.id)

    const product = db.products.find(p => p.id === productId)

    if (!product) {
      return errorResponse(res, 'Product not found', 404)
    }

    successResponse(res, product, 'Product retrieved successfully')
  } catch (error) {
    errorResponse(res, 'Error fetching product')
  }
})

app.post('/products', (req, res) => {
  try {
    const db = readDB()
    const { name, price, description, image, category, stock, tags } = req.body

    // Basic validation
    if (!name || !price || !category) {
      return errorResponse(res, 'Missing required fields: name, price, category', 400)
    }

    const newProduct = {
      id: Math.max(...db.products.map(p => p.id), 0) + 1,
      name,
      price: parseFloat(price),
      description: description || '',
      image: image || 'https://via.placeholder.com/300',
      category,
      stock: parseInt(stock) || 0,
      tags: tags || []
    }

    db.products.push(newProduct)

    if (writeDB(db)) {
      successResponse(res, newProduct, 'Product created successfully')
    } else {
      errorResponse(res, 'Error saving product')
    }
  } catch (error) {
    errorResponse(res, 'Error creating product')
  }
})

// Users routes
app.get('/users', (req, res) => {
  try {
    const db = readDB()
    successResponse(res, db.users, 'Users retrieved successfully')
  } catch (error) {
    errorResponse(res, 'Error fetching users')
  }
})

app.get('/users/:id', (req, res) => {
  try {
    const db = readDB()
    const userId = parseInt(req.params.id)

    const user = db.users.find(u => u.id === userId)

    if (!user) {
      return errorResponse(res, 'User not found', 404)
    }

    successResponse(res, user, 'User retrieved successfully')
  } catch (error) {
    errorResponse(res, 'Error fetching user')
  }
})

// Cart routes
app.get('/cart', (req, res) => {
  try {
    const db = readDB()
    const { userId } = req.query

    let cart = db.cart

    if (userId) {
      cart = cart.filter(c => c.userId === parseInt(userId))
    }

    successResponse(res, cart, 'Cart retrieved successfully')
  } catch (error) {
    errorResponse(res, 'Error fetching cart')
  }
})

app.post('/cart', (req, res) => {
  try {
    const db = readDB()
    const { userId, products } = req.body

    if (!userId || !products || !Array.isArray(products)) {
      return errorResponse(res, 'Missing required fields: userId, products', 400)
    }

    // Calculate total
    const total = products.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)

    const newCart = {
      id: Math.max(...db.cart.map(c => c.id), 0) + 1,
      userId: parseInt(userId),
      products,
      total: parseFloat(total.toFixed(2)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    db.cart.push(newCart)

    if (writeDB(db)) {
      successResponse(res, newCart, 'Cart created successfully')
    } else {
      errorResponse(res, 'Error saving cart')
    }
  } catch (error) {
    errorResponse(res, 'Error creating cart')
  }
})

// Health check
app.get('/health', (req, res) => {
  successResponse(res, { status: 'OK', timestamp: new Date().toISOString() }, 'Server is healthy')
})

// 404 handler
app.use('*', (req, res) => {
  errorResponse(res, 'Endpoint not found', 404)
})

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  errorResponse(res, 'Internal server error')
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}`)
  console.log(`💚 Health check: http://localhost:${PORT}/health`)
})