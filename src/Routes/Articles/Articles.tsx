import { useEffect, useState } from "react";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import globalVariables from "../../globalVariables";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch(`${globalVariables.api_link}/api/loadArticles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            setArticles(data[0]);
            console.log(data[0])
        }).catch((error) => { console.error('Error:', error); });
    }, []);

    return (
        <>
            <div className="mt-9">
                <h1 className="text-3xl dark:text-white toggle_theme">
                    Artykuły
                </h1>
                <div className="mt-4 flex flex-wrap">
                    {articles.map(
                        (article: {
                            _id: string;
                            title: string;
                            images: string[];
                        }) => (
                            <ArticleCard
                                link={"article/" + article._id}
                                key={article.title}
                                bgImage={
                                    `${globalVariables.api_link}/static/` +
                                    article.images[0].replaceAll("\\", "/")
                                }
                                title={article.title}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Articles;
