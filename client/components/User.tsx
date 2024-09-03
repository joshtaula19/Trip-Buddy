import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function User() {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated || !user) {
    return (
      <>
        <h2>User</h2>
        <p>Please log in to view user information.</p>
      </>
    )
  }

  return (
    <>
      <div>
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <p>{user.name}</p>
        <Link to="/UserProfile">
          <button>View Profile</button>
        </Link>
      </div>
    </>
  )
}
