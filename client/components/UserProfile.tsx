import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated || !user) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.picture} alt={user.name} />
      <p>{user.email}</p>
      <p>{user.sub}</p>
    </div>
  )
}

export default Profile
