import { logoutAPI } from "@/services/api"
import "./app.header.scss"
import { useAuthContext } from "../context/auth.context"

const Header = () => {
    return (
        <nav className="navbar-wrapper">
            <ul className="navbar-container">
                <li className="navbar-item logo-icon"><a href="/">Logo</a></li>
                <li className="navbar-item search-bar-container"><a href="">Search bar</a></li>
                <li className="navbar-item account-container"><AccountDetail /></li>
            </ul>
        </nav>
    )
}

const AccountDetail = () => {
    const { setUserData, setIsAuthentication, isAuthentication } = useAuthContext();
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUserData(null);
            setIsAuthentication(false);
        }
    }
    return (
        <>
            {isAuthentication ? <>
                <div className="avatar">avatar</div>
                <div className="user-name">user name</div>
                <ul className="account-subnav">
                    <li className="subnav-item">Cart</li>
                    <li className="subnav-item">Detail</li>
                    <li className="subnav-item logout-btn" role="button" onClick={handleLogout} >
                        Log out
                    </li>
                </ul>
            </>
                : <a href="/login">Login</a>
            }
        </>
    )
}

export default Header;