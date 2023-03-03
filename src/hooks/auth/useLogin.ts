import { useMutation } from '@tanstack/react-query';
import { sweetServer } from '@/api/config';
import { useAuthContext } from '@/hooks/auth'
import { useNavigate } from 'react-router-dom';

type LoginData = {
    email: string
    password: string
}

export const useLogin = () => {
    const navigate = useNavigate();

    const { login } = useAuthContext()

    const postLogin = async (data: LoginData) => {
        const response = await sweetServer.post('/login', data)
        return response.data
    }

    const loginUser = useMutation({
        mutationFn: async (data: LoginData) => await postLogin(data),
        onSuccess: (data) => {
            login(data)
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/recipes')
        }
    })
    return loginUser

}