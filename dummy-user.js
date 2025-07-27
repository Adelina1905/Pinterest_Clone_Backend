import client from './database.js'

async function seedUser() {
  try {
    await client.connect()

    const result = await client.query(`
      INSERT INTO users (id, name, email, password, birth_date)
      VALUES (1, 'Dummy User', 'dummy@example.com', 'hashedpassword', '2000-01-01')
      ON CONFLICT (id) DO NOTHING;
    `)

    console.log('Dummy user created (or already exists)')
    await client.end()
  } catch (err) {
    console.error(' Error inserting dummy user:', err)
    await client.end()
  }
}

seedUser()
