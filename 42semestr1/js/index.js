function createCarousel({
                            carouselSelector,
                            slideSelector,
                            prevButtonSelector,
                            nextButtonSelector,
                            visibleSlidesCount
                        }) {
    const carousel = document.querySelector(carouselSelector);
    const slides = document.querySelectorAll(slideSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 20;

    function updateCarousel() {
        const offset = currentIndex * slideWidth;
        carousel.style.transform = `translateX(-${offset}px)`;

        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display =
            currentIndex + visibleSlidesCount >= slides.length ? 'none' : 'block';
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex + visibleSlidesCount < slides.length) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    // Карусель для альбомов
    createCarousel({
        carouselSelector: '.albums-cont-grid',
        slideSelector: '.albums-card',
        prevButtonSelector: '.prev-btn',
        nextButtonSelector: '.next-btn',
        visibleSlidesCount: 4
    });

    // Карусель для артистов
    createCarousel({
        carouselSelector: '.artists-grid',
        slideSelector: '.artist-card',
        prevButtonSelector: '.prev-btn-art',
        nextButtonSelector: '.next-btn-art',
        visibleSlidesCount: 5
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const heartIcons = document.querySelectorAll('.heart-icon');

    heartIcons.forEach(heart => {
        heart.addEventListener('click', function(event) {
            event.preventDefault();

            // Получаем данные карточки
            const card = heart.closest('.albums-card');
            const albumTitle = card.querySelector('h3').innerText;
            const artistName = card.querySelector('h6').innerText;
            const imageSrc = card.querySelector('img').src;

            // Создаем объект для хранения данных карточки
            const albumData = {
                title: albumTitle,
                artist: artistName,
                image: imageSrc
            };

            // Получаем текущий список избранного из localStorage
            let favorites = JSON.parse(localStorage.getItem('favorites'));

            // Проверяем, добавлен ли альбом уже в избранное
            const isAlreadyFavorited = favorites.some(item => item.title === albumTitle);

            if (!isAlreadyFavorited) {
                favorites.push(albumData);
                heart.classList.add('favorited');
                console.log(`Альбом "${albumTitle}" добавлен в избранное`);
            } else {
                favorites = favorites.filter(item => item.title !== albumTitle);
                heart.classList.remove('favorited');
                console.log(`Альбом "${albumTitle}" удален из избранного`);
            }
            // Сохраняем обновленный список в localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });

        // При загрузке страницы проверяем, добавлен ли альбом уже в избранное
        const card = heart.closest('.albums-card');
        const albumTitle = card.querySelector('h3').innerText;
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorited = favorites.some(item => item.title === albumTitle);

        if (isAlreadyFavorited) {
            heart.classList.add('favorited');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const heartIcons = document.querySelectorAll('.heart-icon-art');

    heartIcons.forEach(heart => {
        heart.addEventListener('click', function (event) {
            event.preventDefault();

            // Получаем данные карточки артиста
            const card = heart.closest('.artist-card');
            const artistName = card.querySelector('h3').innerText;
            const imageSrc = card.querySelector('img').src;

            // Создаем объект с данными артиста
            const artistData = {
                name: artistName,
                image: imageSrc
            };

            let favorites = JSON.parse(localStorage.getItem('favoriteArtists'));

            const isAlreadyFavorited = favorites.some(item => item.name === artistName);

            if (!isAlreadyFavorited) {
                favorites.push(artistData);
                heart.classList.add('favorited');
                console.log(`Артист "${artistName}" добавлен в избранное`);
            } else {
                favorites = favorites.filter(item => item.name !== artistName);
                heart.classList.remove('favorited');
                console.log(`Артист "${artistName}" удален из избранного`);
            }
            localStorage.setItem('favoriteArtists', JSON.stringify(favorites));
        });

        const card = heart.closest('.artist-card');
        const artistName = card.querySelector('h3').innerText;
        const favorites = JSON.parse(localStorage.getItem('favoriteArtists')) || [];
        const isAlreadyFavorited = favorites.some(item => item.name === artistName);

        if (isAlreadyFavorited) {
            heart.classList.add('favorited');
        }
    });
});

async function saveToFavorites(albumData) {
    // Асинхронная функция
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            // Отправляем POST-запрос
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumData),
        });

        if (!response.ok) {
            throw new Error('Failed to save album to favorites');
        }

        // Преобразуем ответ сервера из JSON-строки в объект
        const responseData = await response.json();
        console.log('Saved to favorites:', responseData);

    } catch (error) {
        console.error('Error saving to favorites:', error);
    }
}

// Устанавливаем обработчики событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const heartIcons = document.querySelectorAll('.heart-icon');

    heartIcons.forEach(heart => {
        heart.addEventListener('click', function(event) {
            event.preventDefault();

            const card = heart.closest('.albums-card');
            const albumTitle = card.querySelector('h3').innerText;
            const artistName = card.querySelector('h6').innerText;
            const imageSrc = card.querySelector('img').src;

            const albumData = {
                title: albumTitle,
                artist: artistName,
                image: imageSrc
            };

            saveToFavorites(albumData);
        });
    });
});








