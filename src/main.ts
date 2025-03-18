import * as express from 'express'
import { getDamsData } from './services/getDamsData'
const app = express()
const router = express.Router()

router.get('/data', async (req, res) => {
  const data = await getDamsData()
  res.json(data)
})
app.use('/api', router)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
})
