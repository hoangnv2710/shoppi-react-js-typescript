import Header from "components/layout/app.header"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "./components/context/auth.context"
import { useEffect } from "react";
import { fetchAccountAPI } from "./services/api";

function Layout() {
  const { setUserData } = useAuthContext();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUserData(res.data.user);
      }
      return res;
    }
    fetchAPI();
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout