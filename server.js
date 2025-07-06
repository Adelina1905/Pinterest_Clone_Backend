const express = require('express')
const client = require('./database')

const app = express()
const port = 3000

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL')

    //example that the db connection with server works
    app.get('/', async (req, res) => {
      const result = await client.query('SELECT NOW()')
      res.send(result.rows[0])
    })

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => console.error('Connection error', err.stack))