import { useEffect, useState } from "react";

const Panel = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/verifyToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        }).then(response => {
            if (!response.ok) {
                window.location.href = '/admin/login';
            }
        }).catch((error) => {
            console.error('Error:', error);
        });

        fetch('http://localhost:3001/api/adminData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        }).then(response => response.json()).then(data => {
            setName(data.name);
            setSurname(data.surname);
        }).catch((error) => { console.error('Error:', error); });
    }, []);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            title: { value: string };
            content: { value: string };
            images: { files: FileList };
        }
        const title = formElements.title.value;
        const content = formElements.content.value;
        const images = formElements.images.files;
        const TOKEN = localStorage.getItem('token');

        const formData = new FormData();
        if (TOKEN) {
            formData.append('token', TOKEN);
        } else {
            setErrorMessage('Token is missing');
            return;
        }
        formData.append('articleTitle', title);
        formData.append('articleDescription', content);
        Array.from(images).forEach(image => formData.append('images', image));
        console.log(formData);

        fetch("http://localhost:3001/createArticle", {
            method: "POST",
            body: formData
        }).then(async res => {
            if (!res.ok) {
                setErrorMessage(await res.json().then((data) => data.message));
            }
        })
    }

    return (
        <div>
            <div className="text-center text-3xl py-6 dark:text-white toggle_theme"><h2>Panel administratora</h2></div>

            <div className="flex">
                <div id="adminInfo" className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 toggle_theme h-fit">
                    <h4>Dane administratora</h4>
                    <p>Imie: {name}</p>
                    <p>Nazwisko: {surname}</p>
                </div>
                <div id="createArticle" className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 toggle_theme">
                    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        <div>
                            Tytuł artykułu:
                            <input className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme mb-2" type="text" name="title" maxLength={40} size={40}
                                placeholder="Tytuł artykułu" />
                        </div>
                        <div>
                            Treść artkułu:
                            <textarea className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme" name="content" rows={20} cols={60}
                                placeholder="Treść artykułu"></textarea>
                        </div>
                        <div>
                            Zdjęcia: <input type="file" name="images" id="image" accept="image/*" multiple />
                        </div>
                        <input className="rounded-2xl bg-green-500 hover:bg-green-600 w-fit cursor-pointer text-white py-2 px-4 toggle_theme" type="submit" value="Utwórz artykuł" />
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Panel;
