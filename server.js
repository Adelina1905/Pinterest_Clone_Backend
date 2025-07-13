import express from 'express'
import client from './database.js'

const app = express()
const port = 3000

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL')

    //example that the db connection with server works
    app.get('/', async (req, res) => {
      const result = await client.query('SELECT NOW()')
      res.send(result.rows[0])

      // use to check column names, change table_name to the table you want to check
      // const users_columns = await client.query(`
      //   SELECT column_name
      //   FROM information_schema.columns
      //   WHERE table_name = 'users'
      // `);

      // console.log(users_columns.rows.map(row => row.column_name));
    })

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => console.error('Connection error', err.stack))