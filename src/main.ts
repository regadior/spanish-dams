import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { logger } from './logger'
const app = express()
const router = express.Router()

router.get('/data', (req, res) => {
  const filePath = path.join(__dirname, './services/damsData.json')
  const rawData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(rawData)
  res.json(data)
})
app.use('/api', router)

app.listen(process.env.PORT || 3000, () => {
  logger.info(
    `Servidor corriendo en http://localhost:${process.env.PORT || 3000}`
  )
})
