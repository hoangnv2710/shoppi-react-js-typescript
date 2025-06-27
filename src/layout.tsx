import Header from "components/layout/app.header"
import { Outlet } from "react-router-dom"

function Layout() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
