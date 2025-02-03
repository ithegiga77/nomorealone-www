import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

interface LoginData {
    login: string;
    password: string;
}

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const auth = useMutation({
        mutationFn: () =>
            axios.post(`http://localhost:3001/verifyToken`, {
                token: localStorage.getItem("token"),
            }).then((res) => {
                if (res.status === 200) {
                    navigate("/admin/panel");
                }
            }),
        onError: () => {
            localStorage.removeItem("token");
            navigate("/admin/login");
        },
    });

    const mutation = useMutation({
        mutationFn: ({ login, password }: LoginData) =>
            axios
                .post(`http://localhost:3001/adminLogin`, { login, password })
                .then((res) => res.data),
        onSuccess: (res) => {
            localStorage.setItem("token", res.token);
            navigate("/admin/panel");
        },
        onError: (error: AxiosError<any>) => {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(error.message);
            }
        },
    });

    useEffect(() => {
        auth.mutate();
    }, []);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            login: { value: string };
            password: { value: string };
        };
        const login = formElements.login.value;
        const password = formElements.password.value;
        mutation.mutate({ login, password });
    }

    if (mutation.isPending || auth.isPending) {
        return <Loading />;
    }

    return (
        <div className="flex justify-center items-center h-[83vh]">
            <form
                onSubmit={handleSubmit}
                method="POST"
                className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center toggle_theme"
            >
                <div className="my-3">
                    Login:{" "}
                    <input
                        className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme"
                        type="text"
                        name="login"
                    />
                </div>
                <div className="my-3">
                    Hasło:{" "}
                    <input
                        className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme"
                        type="password"
                        name="password"
                    />
                </div>
                {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                )}
                <input
                    className="rounded-2xl bg-green-500 hover:bg-green-600 w-fit cursor-pointer text-white py-2 px-4 toggle_theme"
                    type="submit"
                    value="Zaloguj się"
                />
            </form>
        </div>
    );
};

export default Login;
