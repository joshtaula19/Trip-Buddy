import connection from './connection.ts'
import { User } from '../../models/user.ts'

// Fetch all users
export async function getAllUsers(): Promise<User[]> {
  const userData = await connection('users').select('*')
  return userData as User[]
}

// Fetch user by ID
export async function getUserById(id: number): Promise<User | undefined> {
  const userData = await connection('users').where({ id }).first()
  return userData as User | undefined
}

// Fetch user by username
export async function getUserByUsername(username: string): Promise<User | undefined> {
  const userData = await connection('users').where({ username }).first();
  return userData as User | undefined;
}

// Add a new user
export async function addUser(newUser: User): Promise<User> {
  const [user] = await connection('users').insert(newUser).returning('*')
  return user as User
}

// Delete a user by ID
export async function deleteUserById(id: number): Promise<number> {
  return connection('users').where({ id }).del()
}

// Update a user by ID
export async function updateUserById(id: number, updates: Partial<User>): Promise<User | undefined> {
  const [user] = await connection('users').where({ id }).update(updates).returning('*')
  return user as User | undefined
}