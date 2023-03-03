import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth";

const LoginForm = () => {
    const userLogin = useLogin();
    const { register, handleSubmit } = useForm();

    const submitData = async (data) => {
        await userLogin.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(submitData)}>
            <input type="text" {...register("email")} />
            <input type="password" {...register("password")} />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
