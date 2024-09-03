import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <main>
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}
