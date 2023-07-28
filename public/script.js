function addMovie() {
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;

    if (!name || !image || !description) {
        alert('Please fill in all fields.');
        return;
    } 

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('description', description);

    fetch('/api/movies', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Movie added successfully.');
            window.location.reload();
        } else {
            alert('Failed to add movie.');
        }
    })
    .catch(error => console.error('Error:', error));
}

fetch('/api/movies')
    .then(response => response.json())
    .then(data => {
        const movieList = document.querySelector('.movie-list');
        data.movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.name}">
                <h3>${movie.name}</h3>
                <p>${movie.description}</p>
            `;
            movieList.appendChild(movieCard);
        });
    })
    .catch(error => console.error('Error:', error));
