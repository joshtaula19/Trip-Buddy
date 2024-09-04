import connection from './connection.ts'
import { User } from '../../models/user.ts'


const db = connection


// Fetch all users
export async function getAllUsers(): Promise<User[]> {
 return await db('users').select('*')
}

// Fetch user by ID
export async function getUserById(id: number): Promise<User | undefined> {
  const userData = await db('users').where({ id }).first()
  return userData as User | undefined
}

// Fetch user by username
export async function getUserByUsername(username: string): Promise<User | undefined> {
  const userData = await db('users').where({ username }).first();
  return userData as User | undefined;
}

// Add a new user
export async function addUser(newUser: User): Promise<User | undefined> {
  const [user] = await db('users').insert(newUser).returning('*')
  return user as User
}

// Delete a user by ID
export async function deleteUserById(id: number): Promise<number> {
  return db('users').where({ id }).del()
}

// Update a user by ID
export async function updateUserById(updatedUser: {
  id: number,
  username: string, 
  phone: string, 
  email: string
}): Promise<User | undefined> {
  const [user] = await db('users').where({ id }).update(updatedUser).returning('*')
  return user as User | undefined
}