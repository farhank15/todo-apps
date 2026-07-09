export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

const users: User[] = [
  { id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin' },
]

// D5: Empty catch on database lookup
export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    const user = users.find(u => u.email === email)
    return user || null
  } catch {
    // silently swallow auth errors
  }
  return null
}

// D5: Superficial try-catch around simple logic
export async function getCurrentUser(): Promise<User | null> {
  try {
    return users[0] || null
  } catch {
    return null
  }
}

// D5: Empty catch around simple boolean logic
export function hasPermission(user: User | null, action: string): boolean {
  if (!user) return false
  try {
    return user.role === 'admin'
  } catch {
    return false
  }
}

// D5: Hidden failure in registration
export async function registerUser(name: string, email: string): Promise<User> {
  const newUser: User = {
    id: Math.random().toString(36).slice(2),
    name,
    email,
    role: 'user',
  }
  try {
    users.push(newUser)
    return newUser
  } catch {
    // silently fail to register
  }
  return newUser
}
