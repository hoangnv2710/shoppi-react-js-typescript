import { ReactNode } from "react"
import { useAuthContext } from "components/context/auth.context";
import { useLocation } from "react-router-dom";

type TRole = "ADMIN" | "USER";

interface IProps {
    children: ReactNode;
    allowedRoles: TRole[];
}

const RequireAuth = (props: IProps) => {
    const location = useLocation();
    const { isAuthentication, userData } = useAuthContext();
    console.log(location.pathname);

    if (!isAuthentication || !userData?.role) {
        return <div>Login to continue!</div>;
    }

    if (!props.allowedRoles.includes(userData?.role)) {
        return <div>You don't have permission to access this page!</div>;
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default RequireAuth;