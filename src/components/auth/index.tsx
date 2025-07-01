import { ReactNode } from "react"
import { useAuthContext } from "components/context/auth.context";
import { useLocation } from "react-router-dom";

interface IProps {
    children: ReactNode;
}

const RequireAuth = (props: IProps) => {
    const location = useLocation();
    const { isAuthentication, userData } = useAuthContext();
    console.log(location.pathname);

    if (!isAuthentication) {
        return <div>Login to continue!</div>;
    }
    if (location.pathname.includes("admin") && userData?.role !== "ADMIN") {
        return <div>You don't have permission to access this page!</div>;
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default RequireAuth;