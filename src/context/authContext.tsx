import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    user: null,
    isLoading: true,
});

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const userInLocalStorage = JSON.parse(localStorage.getItem("user")!);

        if (userInLocalStorage) {
            setUser(userInLocalStorage);
        }
        setIsLoading(false);
    }, []);

    const login = (value) => {
        setUser(value);
    };
    const logout = () => {};

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export { AuthContext };
