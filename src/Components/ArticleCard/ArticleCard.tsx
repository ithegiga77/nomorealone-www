interface ArticleCardProps {
    bgImage: string;
    title: string;
    link: string;

}

const ArticleCard = ({ bgImage, title, link }: ArticleCardProps) => {
    function handleClick() {
        window.location.href = link;
    }
    return (
        <div onClick={handleClick} className="cursor-pointer mt-4 mr-[5px] w-[453px] h-[255px] rounded-3xl flex px-5 py-5 text-white text-xl items-end bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(" + bgImage + ")" }}>
            <p>{title}</p>
        </div>
    );
};

export default ArticleCard;
