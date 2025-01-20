function articleReceive(group) {
    fetch('/api/loadArticles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const articlesPerGroup = 25;
            if (data.length > 0 && data[0].length > 0) {
                const startIndex = group * articlesPerGroup;
                const endIndex = startIndex + articlesPerGroup;
                const articlesToDisplay = data[0].slice(startIndex, endIndex);

                if (articlesToDisplay.length > 0) {
                    document.getElementById("articles").innerHTML = ''; // Clear the container before adding new articles
                    for (let i = 0; i < articlesToDisplay.length; i++) {
                        let article = document.createElement("div");
                        article.className = "article";

                        let link = document.createElement("a");
                        link.href = `/article?id=${articlesToDisplay[i]._id}`;
                        link.innerText = articlesToDisplay[i].title;

                        article.appendChild(link);

                        document.getElementById("articles").appendChild(article);
                    }
                } else {
                    document.getElementById("articles").innerText = `Brak artykułów!`;
                }
            } else {
                document.getElementById("articles").innerText = `Brak artykułów!`;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function startFunction() {
    articleReceive(0);  // Wyświetli pierwszą grupę (0)
}

window.onload = startFunction;
