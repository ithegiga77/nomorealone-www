import { useState } from "react";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            login: { value: string };
            password: { value: string };
        }
        const login = formElements.login.value;
        const password = formElements.password.value;
        fetch("http://localhost:3001/adminLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password })
        }).then(async res => {
            if (res.ok) {
                window.location.href = "/admin/panel";
            } else {
                setErrorMessage(await res.json().then((data) => data.message));
            }
        })
    }
    return (
        <div className="flex justify-center items-center h-[83vh]">
            <form onSubmit={handleSubmit} method="POST" className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center toggle_theme">
                <div className="my-3">Login: <input className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme" type="text" name="login" /></div>
                <div className="my-3">Hasło: <input className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme" type="password" name="password" /></div>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <input className="rounded-2xl bg-green-500 hover:bg-green-600 w-fit cursor-pointer text-white py-2 px-4 toggle_theme" type="submit" value="Zaloguj się" />
            </form>
        </div>
    )
}

export default Login;