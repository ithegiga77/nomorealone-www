import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SetStateAction, useState } from "react";

interface Props {
    images: File[];
    setImages: React.Dispatch<SetStateAction<File[]>>;
}

const NewArticle = ({ images, setImages }: Props) => {
    const [errorMessage, setErrorMessage] = useState("");

    const createArticle = useMutation({
        mutationFn: (formData: FormData) =>
            axios
                .post("http://localhost:3001/createArticle", formData)
                .then((res) => res.data),
        onSuccess: () => {},
        onError: (error: AxiosError<any>) => {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(error.message);
            }
        },
    });

    const handleDeleteImage = (index: number) => {
        setImages((prev) => {
            return prev.filter((_, itemIndex) => index !== itemIndex);
        });
    };

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            title: { value: string };
            content: { value: string };
            images: { files: FileList };
        };
        const title = formElements.title.value;
        const content = formElements.content.value;
        const TOKEN = localStorage.getItem("token");

        const formData = new FormData();
        if (TOKEN) {
            formData.append("token", TOKEN);
        } else {
            setErrorMessage("Token is missing");
            return;
        }
        formData.append("articleTitle", title);
        formData.append("articleDescription", content);
        Array.from(images).forEach((image) => formData.append("images", image));
        createArticle.mutate(formData);
    }

    return (
        <div
            id="createArticle"
            className="flex-1 dark:text-white text-2xl rounded-3xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.3)] px-6 py-4 toggle_theme"
        >
            <form
                onSubmit={handleSubmit}
                method="POST"
                encType="multipart/form-data"
                className="flex flex-col gap-12"
            >
                <div className="flex gap-5 items-center flex-wrap sm:flex-nowrap">
                    <span className="whitespace-nowrap max-sm:px-3">
                        Tytuł artykułu
                    </span>
                    <input
                        className="w-full bg-gray-100 dark:bg-[#28282b] font-light rounded-3xl outline-none py-2 px-3 toggle_theme"
                        type="text"
                        name="title"
                        maxLength={40}
                        size={40}
                        placeholder="Tytuł artykułu"
                        required
                    />
                </div>
                <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                    <span className="whitespace-nowrap max-sm:px-3">
                        Treść artykułu
                    </span>
                    <textarea
                        className="w-full bg-gray-100 dark:bg-[#28282b] rounded-3xl outline-none font-light resize-none py-2 px-3 toggle_theme"
                        name="content"
                        rows={10}
                        cols={60}
                        placeholder="Treść artykułu"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="flex items-center gap-5">
                        <div className="w-full flex justify-between items-center flex-wrap gap-y-4 gap-x-8">
                            <div className="flex gap-5">
                                <span>Zdjęcia</span>
                                <span>
                                    <button
                                        className="bg-gray-100 dark:bg-[#434347] p-1 rounded-full cursor-pointer text-black"
                                        onClick={() =>
                                            document
                                                .getElementById("file-input")
                                                ?.click()
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            <span>Ilość zdjęć: {images.length}</span>
                        </div>
                        <input
                            className="hidden absolute"
                            type="file"
                            name="images"
                            id="file-input"
                            accept="image/*"
                            multiple
                            onChange={(event) =>
                                setImages((prev) => [
                                    ...prev,
                                    ...Array.from(event.target.files || []),
                                ])
                            }
                        />
                    </div>
                    <div className="flex gap-12 flex-wrap">
                        {images.length > 0 &&
                            images.map((image, index) => (
                                <div
                                    className="relative"
                                    key={`image-${index}`}
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        className="h-48 object-cover rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.3)]"
                                    />
                                    <button
                                        className="absolute bg-gray-300 rounded-full p-2 cursor-pointer border border-black"
                                        style={{
                                            top: `-18px`,
                                            right: "-18px",
                                        }}
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-y-4 gap-x-12 items-center">
                    <input
                        className="rounded-2xl bg-sky-500 hover:bg-sky-600 w-fit cursor-pointer text-white py-2 px-4 toggle_theme"
                        type="submit"
                        value="Utwórz artykuł"
                    />
                    {errorMessage && (
                        <div className="text-red-500">{errorMessage}</div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NewArticle;
