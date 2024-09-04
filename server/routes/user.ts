import express from 'express'
import * as db from '../db/users'

const router = express.Router()

// Get all users  'api/v1/users'
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get a user by ID 'api/v1/users/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const customer = await db.getUserById(id)
    res.json(customer)
  } catch (error) {
    console.error(`Database error ${error}`)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Add a new user
// POST 'api/v1/users/'
router.post('/', async (req, res) => {
  const { username, phone, email, Auth0ID } = req.body

  if (!username || !phone || !email || !Auth0ID) {
    return res.status(400).json({ error: 'Missing required fields: username, phone, email, Auth0ID' })
  }

  try {
    const newUser = await db.addUser({ username, phone, email, Auth0ID })
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error adding user:', error)
    res.status(500).json({ error: 'Failed to add user' })
  }
})

// Update a user
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { username, phone, email } = req.body
  try {
    const updatedUser = await db.updateUserById({
        id,
        username,
        phone,
        email
  })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// Delete a user
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteUserById(id)
    res.status(204)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
