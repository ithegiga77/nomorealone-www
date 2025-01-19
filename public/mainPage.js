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
                    document.getElementById("articles").innerHTML += `
                    <div class="article">
                        <a href="/article?id=${articlesToDisplay[i]._id}">${articlesToDisplay[i].title}</a>
                    </div>`;
                }
            } else {
                document.getElementById("articles").innerHTML = `Brak artykułów!`;
            }
        } else {
            document.getElementById("articles").innerHTML = `Brak artykułów!`;
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
