import { config } from 'dotenv'

// Load environment variables
config()

export const serverConfig = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL || 'combined',
  dbPath: process.env.DB_PATH || './db.json'
}

export const isDevelopment = serverConfig.nodeEnv === 'development'
export const isProduction = serverConfig.nodeEnv === 'production'