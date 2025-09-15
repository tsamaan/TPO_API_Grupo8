const API_BASE_URL = 'http://localhost:3001'

const unpackPayload = (payload, fallback) => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }

  return payload ?? fallback
}

export const fetchProducts = async (category = null) => {
  try {
    const url = category
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const payload = await response.json()
    const products = unpackPayload(payload, [])

    return Array.isArray(products) ? products : []
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const payload = await response.json()
    return unpackPayload(payload, null)
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}