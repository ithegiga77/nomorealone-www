const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');

async function fetchArticle(articleId) {
    try {
        const response = await fetch(`/api/getArticle/${id}`);
        if (!response.ok) {
            throw new Error('An error occured while downloading article!');
        }

        const article = await response.json();

        // W zasadzie powinna być tutaj sanityzacja ALE nie bede tego robił bo przy zmianie na reacta się to ogarnie ~ Jakub
        document.getElementById("articleTitle").innerHTML = `<b>${article.title}</b>`;
        document.getElementById("articleDescription").innerHTML = `${article.description}`;
    } catch (err) {
        console.error('Error: ', error);
    }
}
function start() {
    fetchArticle(id);
}
window.onload = start;