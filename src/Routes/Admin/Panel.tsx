import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import NewArticle from "./NewArticle";
import globalVariables from "../../globalVariables";

const Panel = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate();

    const auth = useMutation({
        mutationFn: () =>
            axios.post(`${globalVariables.api_link}/verifyToken`, {
                token: localStorage.getItem("token"),
            }),
        onError: () => {
            localStorage.removeItem("token");
            navigate("/admin/login");
        },
    });

    const adminData = useMutation({
        mutationFn: () =>
            axios
                .post(`${globalVariables.api_link}/api/adminData`, {
                    token: localStorage.getItem("token"),
                })
                .then((res) => res.data),
        onSuccess: (res) => {
            setName(res.name);
            setSurname(res.surname);
        },
        onError: () => {
            localStorage.removeItem("token");
            navigate("/admin/login");
        },
    });

    useEffect(() => {
        auth.mutate();
        adminData.mutate();
    }, []);

    if (auth.isPending) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            {localStorage.getItem("token") && (
                <div className="w-full my-8 flex flex-col lg:flex-row gap-8 ">
                    <div
                        id="adminInfo"
                        className="max-lg:flex-1 w-full flex flex-col lg:max-w-[240px] gap-4 dark:text-white text-2xl rounded-3xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.3)] px-6 py-4 toggle_theme h-fit"
                    >
                        <h2>Administrator:</h2>
                        <span className="font-light">
                            {name} {surname}
                        </span>
                    </div>
                    <NewArticle images={images} setImages={setImages} />
                </div>
            )}
        </React.Fragment>
    );
};

export default Panel;
