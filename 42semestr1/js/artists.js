document.addEventListener('DOMContentLoaded', function () {
    const favoritesGrid = document.getElementById('favorites-grid');

    // Функция для отображения избранных артистов
    function renderFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favoriteArtists'));

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '<p>No favorite artists yet.</p>';
        } else {
            favoritesGrid.innerHTML = '';

            favorites.forEach((artist, index) => {
                const card = document.createElement('div');
                card.classList.add('favorites-card');

                card.innerHTML = `
                    <img src="${artist.image}" alt="${artist.name}">
                    <h3>${artist.name}</h3>
                    <span class="heart-icon" data-index="${index}">&#10084;</span>
                `;

                favoritesGrid.appendChild(card);
            });

            const heartIcons = document.querySelectorAll('.favorites-card .heart-icon');
            heartIcons.forEach(heart => {
                heart.addEventListener('click', function () {
                    const index = heart.getAttribute('data-index');
                    removeFromFavorites(index);
                    renderFavorites();
                });
            });
        }
    }

    // Функция для удаления артиста из избранного
    function removeFromFavorites(index) {
        let favorites = JSON.parse(localStorage.getItem('favoriteArtists'));
        favorites.splice(index, 1);
        localStorage.setItem('favoriteArtists', JSON.stringify(favorites));
    }
    renderFavorites();
});
