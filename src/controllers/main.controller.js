import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const index = (req, res) => {
  console.log(__filename)
  console.log(__dirname)
  res.sendFile(path.resolve(__dirname, '../../private/index.html'))
}
