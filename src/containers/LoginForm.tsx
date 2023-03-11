import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth";
import { TextInput } from "@/components/elements";
import { Button } from "@/components";

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
        <div className="flex w-full h-screen justify-center items-centers">
            <div className="p-4 color-white shadow-md">
                <form onSubmit={handleSubmit(submitData)}>
                    <div className="sm:flex">
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
                                    placeholder="Password"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    onChange={onChange}
                                    type="password"
                                    label="Email"
                                />
                            )}
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
