import ArticleCard from "../../Components/ArticleCard/ArticleCard";

const Index = () => {
    return (
        <><div className="rounded-3xl bg-cover bg-center bg-no-repeat text-white mt-9 h-[50vh] flex items-center p-8" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/src/assets/index-bg.jpg)" }}>
            <p className=" text-5xl max-w-[50vw]">Izolacja społeczna to cichy prroblem naszych czasów&nbsp;- razem możemy przerwać ten krąg i przywrócić poczucie bliskości</p>
        </div><div className="mt-9">
                <h1 className="text-3xl">Artykuły</h1>
                <div className="mt-4 flex flex-wrap justify-between">
                    {/* Przykładowe Artykuły */}
                    <ArticleCard bgImage="https://picsum.photos/453/255" title="Samotność w tłumie – jak radzić sobie z izolacją społeczną w codziennym życiu?" />
                    <ArticleCard bgImage="https://picsum.photos/454/256" title="Izolacja społeczna w dobie cyfryzacji: Rozmowa z psychologiem o wpływie mediów społecznościowych na nasze relacje" />
                    <ArticleCard bgImage="https://picsum.photos/455/257" title="Izolacja społeczna: Psychologiczna perspektywa i sposoby na przełamanie barier" />
                    <ArticleCard bgImage="https://picsum.photos/456/258" title="Izolacja w erze post-pandemicznej: Jak powrócić do kontaktów międzyludzkich po długiej przerwie?" />
                </div>
            </div></>
    );

};

export default Index;