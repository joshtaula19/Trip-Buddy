import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function User() {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated || !user) {
    return (
      <>
        <div className="credentials"></div>
      </>
    )
  }
const auth0Id = user.sub
  return (
    <>
      <div className="credentials">
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <p>{user.name}</p>
        <Link to={`/profile/${auth0Id}`}>
          <button>View Profile</button>
        </Link>
      </div>
    </>
  )
}
