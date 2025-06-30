import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isAuthentication: boolean;
    userData: IUser | null;
    setIsAuthentication: (v: boolean) => void;
    setUserData: (v: IUser | null) => void;
}

type TProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = (props: TProps) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser | null>(null)

    return (
        <AuthContext.Provider value={{ isAuthentication, setIsAuthentication, userData, setUserData }}>
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

