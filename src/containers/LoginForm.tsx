import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth";
import { TextInput } from "@/components/elements";
import { Button } from "@/components";

type TLoginForm = {
  email: string;
  password: string;
};

const ErrorMessageAfterLogin = ({ message }: { message: string }) => {
  return (
    <div className="alert alert-error shadow-lg mt-4 mb-6">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
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
    <div className="card mx-auto max-w-md shadow-xl bg-white">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is regired" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                placeholder="Password"
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                type="password"
                label="Password"
              />
            )}
          />
          {!userLogin.isLoading && userLogin.error && (
            <ErrorMessageAfterLogin
              message={userLogin.error.response.data.message}
            />
          )}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

{
  /* <div className="flex w-full h-screen justify-center items-centers">
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
        </div> */
}
