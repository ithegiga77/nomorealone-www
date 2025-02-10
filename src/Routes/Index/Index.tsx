import { useEffect, useState } from "react";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import globalVariables from "../../globalVariables";

const Index = () => {
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
            <div
                className="relative rounded-3xl bg-cover bg-center bg-no-repeat text-white mt-9 h-[50vh] flex items-center overflow-hidden"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/index-bg.jpg)",
                }}
            >
                <div className="absolute w-full h-full bg-black opacity-40 z-10"></div>
                <p className="text-3xl sm:text-4xl lg:text-6xl text-center p-12 z-50 font-extralight">
                    Izolacja społeczna to cichy problem naszych czasów&nbsp;-
                    razem możemy przerwać ten krąg i przywrócić poczucie
                    bliskości
                </p>
            </div>
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

export default Index;
