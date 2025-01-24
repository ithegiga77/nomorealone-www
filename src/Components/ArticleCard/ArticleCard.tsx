interface ArticleCardProps {
    bgImage: string;
    title: string;

}

const ArticleCard = ({ bgImage, title }: ArticleCardProps) => {
    return (
        <div className="mt-4 w-[453px] h-[255px] rounded-3xl flex px-5 py-5 text-white text-xl items-end bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(" + bgImage + ")" }}>
            <p>{title}</p>
        </div>
    );
};

export default ArticleCard;
