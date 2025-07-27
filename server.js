import express from 'express'
import client from './database.js'
import cors from 'cors'
import multer from 'multer'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// For image upload
const storage = multer.memoryStorage()
const upload = multer({ storage })

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL')

    app.get('/', async (req, res) => {
      const result = await client.query('SELECT NOW()')
      res.send(result.rows[0])
    })

    // Create pin (v1/pins)
    app.post('/v1/pins', upload.single('image'), async (req, res) => {
      try {
        const {
          title,
          description,
          link,
          board,
          tags,
          allow_comments,
          alt_text,
          user_id
        } = req.body

        const image = req.file

        if (!image || !title || !user_id) {
          return res.status(400).json({ error: 'Missing required fields: image, title, or user_id' });
        }

        const parsedTags = tags ? JSON.parse(tags) : null;
        const board_id = board ? parseInt(board, 10) : null;


        const query = `
          INSERT INTO pins (user_id, board_id, title, description, link, tags, allow_comments, alt_text, image, mimetype)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id
        `

        const values = [
          parseInt(user_id || '1'), // dummy user
          board_id,
          title,
          description || null,
          link || null,
          parsedTags,
          allow_comments === 'true',
          alt_text || null,
          image.buffer,
          image.mimetype
        ]

        const result = await client.query(query, values)

        res.status(201).json({ success: true, pinId: result.rows[0].id })
      } catch (err) {
        console.error('Error saving pin:', err)
        res.status(500).json({ error: 'Failed to create pin' })
      }
    })

    app.get('/v1/pins', async (req, res) => {
      try {
        const result = await client.query('SELECT id, title, alt_text, image, mimetype FROM pins ORDER BY created_at DESC')
        const pins = result.rows.map(pin => ({
          ...pin,
          image: pin.image.toString('base64')
        }))
        res.json(pins)
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch pins' })
      }
    })

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })


  })
  .catch(err => console.error('Connection error', err.stack))
