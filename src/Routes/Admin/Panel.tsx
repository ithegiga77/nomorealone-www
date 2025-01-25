import { useEffect } from "react";

const Panel = () => {

    useEffect(() => {
        const response = fetch('http://localhost:3001/api/adminData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

    }, []);

    return (
        <div>
            <div className="text-center text-3xl py-6 dark:text-white toggle_theme"><h2>Panel administratora</h2></div>

            <div className="flex">
                <div id="adminInfo" className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 toggle_theme h-fit">
                    <h4>Dane administratora</h4>
                    <p id="adminName">Imie: xxx</p>
                    <p id="adminSurname">Nazwisko: xxx</p>
                    <p id="adminLogin">Login: xxx</p>
                </div>
                <div id="createArticle" className="dark:text-white text-2xl rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] p-10 toggle_theme">
                    <form method="POST" action="/createArticle" encType="multipart/form-data">
                        <div>
                            Tytuł artykułu:
                            <input className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme mb-2" type="text" name="articleTitle" maxLength={40} size={40}
                                placeholder="Tytuł artykułu" />
                        </div>
                        <div>
                            Treść artkułu:
                            <textarea className="dark:bg-[#18181a] rounded-3xl border-2 py-2 px-3 toggle_theme" name="articleDescription" rows={20} cols={60}
                                placeholder="Treść artykułu"></textarea>
                        </div>
                        <div>
                            Zdjęcia: <input type="file" name="images" id="image" accept="image/*" multiple />
                        </div>
                        <input type="submit" value="Utwórz artykuł" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Panel;
