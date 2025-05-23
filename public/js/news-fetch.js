fetch('news.json')
.then(response => response.json())
.then(data => {
    const newsDiv = document.getElementById('news-container');

    // In our JSON the most recent articles should already be at the top.
    data.forEach(article => {
        // Create an entry wrapper.
        const entry = document.createElement('div');
        entry.classList.add('news-entry');
        entry.classList.add('rounded');
        entry.classList.add('m-5');
        entry.classList.add('p-3');

        // Create and append the article title.
        const title = document.createElement('div');
        title.classList.add('news-title');
        title.classList.add('text-danger');
        title.classList.add('h3');
        title.textContent = article.title;
        entry.appendChild(title);

        // Create and append the article date (formatted for the locale).
        const date = document.createElement('div'); 
        date.classList.add('news-date');
        date.classList.add('text-secondary');
        date.classList.add('h6');

        date.textContent = new Date(article.date).toLocaleString();
        entry.appendChild(date);

        if (article.image) {
            const img = document.createElement('img');
            img.classList.add('news-image');
            img.src = article.image;
            img.alt = article.title;
            entry.appendChild(img);
        }

        // Create and append the news body text.
        const body = document.createElement('div');
        body.classList.add('news-body');
        body.classList.add('text-light');
        body.textContent = article.body;
        entry.appendChild(body);

        // Append the news entry to the container.
        newsDiv.appendChild(entry);
    });
})
.catch(error => console.error('Error fetching news:', error));