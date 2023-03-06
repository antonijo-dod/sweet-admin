import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

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
            if (userInLocalStorage.jwt) {
                const { exp } = jwtDecode(userInLocalStorage.jwt);
                if (exp * 1000 < Date.now()) {
                    localStorage.removeItem("user");
                }
            }
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
