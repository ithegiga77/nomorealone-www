import { useEffect, useState } from "react";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";

const Index = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/loadArticles', {
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
        <><div className="rounded-3xl bg-cover bg-center bg-no-repeat text-white mt-9 h-[50vh] flex items-center p-8" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/src/assets/index-bg.jpg)" }}>
            <p className=" text-5xl max-w-[50vw]">Izolacja społeczna to cichy prroblem naszych czasów&nbsp;- razem możemy przerwać ten krąg i przywrócić poczucie bliskości</p>
        </div><div className="mt-9">
                <h1 className="text-3xl dark:text-white toggle_theme">Artykuły</h1>
                <div className="mt-4 flex flex-wrap">
                    {articles.map((article: { _id: string, title: string, images: string[] }) => <ArticleCard link={"article/" + article._id} key={article.title} bgImage={"http://localhost:3001/static/" + article.images[0].replaceAll("\\", "/")} title={article.title} />)}
                    <ArticleCard link="/" bgImage="https://picsum.photos/453/255" title="Samotność w tłumie – jak radzić sobie z izolacją społeczną w codziennym życiu?" />
                    <ArticleCard link="/" bgImage="https://picsum.photos/454/256" title="Izolacja społeczna w dobie cyfryzacji: Rozmowa z psychologiem o wpływie mediów społecznościowych na nasze relacje" />
                    <ArticleCard link="/" bgImage="https://picsum.photos/455/257" title="Izolacja społeczna: Psychologiczna perspektywa i sposoby na przełamanie barier" />
                    <ArticleCard link="/" bgImage="https://picsum.photos/456/258" title="Izolacja w erze post-pandemicznej: Jak powrócić do kontaktów międzyludzkich po długiej przerwie?" />
                </div>
            </div></>
    );

};

export default Index;