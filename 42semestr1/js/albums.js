document.addEventListener('DOMContentLoaded', function() {
    const favoritesGrid = document.getElementById('favorites-grid');

    // Функция для отображения избранных карточек
    function renderFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites'));

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '<p>There are no favorite albums.</p>';
        } else {
            favoritesGrid.innerHTML = '';

            favorites.forEach((album, index) => {
                const card = document.createElement('div');
                card.classList.add('favorites-card');

                card.innerHTML = `
                    <img src="${album.image}" alt="${album.title}">
                    <div class="albums-card-description">
                        <h3>${album.title}</h3>
                        <h6>${album.artist}</h6>
                    </div>
                    <span class="heart-icon" data-index="${index}">&#10084;</span>
                `;

                favoritesGrid.appendChild(card);
            });

            const heartIcons = document.querySelectorAll('.favorites-card .heart-icon');
            heartIcons.forEach(heart => {
                heart.addEventListener('click', function() {
                    const index = heart.getAttribute('data-index');
                    removeFromFavorites(index);
                    renderFavorites();
                });
            });
        }
    }

    // Функция для удаления альбома из избранного
    function removeFromFavorites(index) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    renderFavorites();
});