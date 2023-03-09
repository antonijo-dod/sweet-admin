import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth";
import { TextInput } from "@/components/elements";

type TLoginForm = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const userLogin = useLogin();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TLoginForm>();

    const submitData = async (data) => {
        await userLogin.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(submitData)}>
            <div className="flex">
                <Controller
                    name="email"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <TextInput
                            placeholder="Enter your email"
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            type="email"
                            label="Email"
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <TextInput
                            placeholder="Enter your email"
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            type="email"
                            label="Email"
                        />
                    )}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
