require('dotenv').config()

module.exports = {
  fromAddress: process.env.API_USER,
  apiKey: process.env.API_KEY,
  tenantId: process.env.TENANT_ID,
  logLevel: process.env.API_USER,
  baseUrl: process.env.API_URL
}
