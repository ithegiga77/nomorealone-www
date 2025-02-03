import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
    const params = useParams()
    interface Article {
        title: string;
        description: string;
        images: string[];
    }

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/getArticle/' + params.articleId).then(response => response.json()).then(data => setArticle(data)).catch((error) => { console.error('Error:', error); });
    }, []);
    return (
        <div>
            {article ? <div className="py-5 px-3 w-[90vw] min-h-[90vh]">
                <div className="bg-cover bg-center bg-no-repeat px-5 py-24 rounded-3xl my-5" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('http://localhost:3001/static/" + article.images[0].replaceAll('\\', '/') + "')" }}><h1 className="text-white font-semibold text-3xl">{article.title}</h1></div>
                <p className="dark:text-white toggle_theme">{article.description}</p>
            </div>
                : <p>Loading...</p>}
        </div>
    )
}

export default Article;