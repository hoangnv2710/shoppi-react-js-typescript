import { fetchAccountAPI } from "services/api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

interface AuthContextType {
    isAuthentication: boolean;
    userData: IUser | null;
    setIsAuthentication: (v: boolean) => void;
    setUserData: (v: IUser | null) => void;
    isFetching: boolean;
    setIsFetching: (v: boolean) => void;
}

type TProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = (props: TProps) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsFetching(true);
            const res = await fetchAccountAPI();
            if (res.data) {
                setUserData(res.data.user);
                setIsAuthentication(true);
            }
            setIsFetching(false);
        }
        if (localStorage.getItem("access_token")) fetchAPI();
    }, [])
    if (isFetching) return (<SyncLoader color={"black"} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />)
    return (
        <AuthContext.Provider value={{ isAuthentication, setIsAuthentication, userData, setUserData, isFetching, setIsFetching }}>
            {props.children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error(
            "useAuthContext has to be used within AuthContextProvider"
        );
    }

    return authContext;
};

