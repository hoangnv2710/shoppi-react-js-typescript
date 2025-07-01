import { ReactNode } from "react"
import { useAuthContext } from "components/context/auth.context";

interface IProps {
    children: ReactNode;
    allowedRoles: TRole[];
}

const RequireAuth = (props: IProps) => {
    const { isAuthentication, userData } = useAuthContext();

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