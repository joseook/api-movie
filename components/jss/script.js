const API_KEY = '7320c455';
let allMovies = []; 

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const trailers = await fetchTrailers(API_KEY);
        const awards = await fetchAwards(API_KEY);

        loadingList(trailers, 'container-trailer');
        loadingList(awards, 'container-awards');

        allMovies = trailers.concat(awards);
    } catch (error) {
        console.error(error);
    }

    const containerTrailer = document.getElementById('container-trailer');
    containerTrailer.addEventListener('mouseover', handleMouseOver);
    containerTrailer.addEventListener('mouseout', handleMouseOut);
    containerTrailer.addEventListener('click', handlePosterClick);

    const containerAwards = document.getElementById('container-awards');
    containerAwards.addEventListener('mouseover', handleMouseOver);
    containerAwards.addEventListener('mouseout', handleMouseOut);
    containerAwards.addEventListener('click', handlePosterClick);

    document.getElementById('submit-movies').addEventListener('click', handleSearch);

    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', handleDropdownClick);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleInput);
});

async function fetchTrailers(API_KEY) {
    const response = await fetch(`https://www.omdbapi.com/?s=trailer&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
}

async function fetchAwards(API_KEY) {
    const response = await fetch(`https://www.omdbapi.com/?s=movie&type=movie&apikey=${API_KEY}&s=awards`);
    const data = await response.json();
    return data.Search || [];
}

async function searchMovie(httpsAPI) {
    const response = await fetch(httpsAPI);
    const data = await response.json();
    return data.Search || [];
}

function loadingList(listing, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    listing.forEach(element => {
        const item = createListItem(element);
        container.appendChild(item);
    });
}

function createListItem(element) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <img src="${element.Poster}" 
             data-title="${element.Title}" 
             data-year="${element.Year}" 
             data-type="${element.Type}" 
             data-awards="${element.Awards}" 
             data-genre="${element.Genre}" /> 
        <h2>Titulo: ${element.Title}</h2>
        <p>Ano: ${element.Year}</p>
        <p>Tipo: ${element.Type}</p>
    `;
    return item;
}

function handleMouseOver(event) {
    const item = event.target.closest('.item');
    if (item && !event.target.classList.contains('details-button')) {
        addDetailsButton(item);
    }
}

function handleMouseOut(event) {
    const item = event.target.closest('.item');
    if (item) {
        removeDetailsButton(item);
    }
}

function addDetailsButton(item) {
    const existingButton = item.querySelector('.details-button');
    if (!existingButton) {
        const button = document.createElement('button');
        button.classList.add('details-button');
        button.textContent = 'Mais Detalhes';
        item.appendChild(button);
    }
}

function removeDetailsButton(item) {
    const button = item.querySelector('.details-button');
    if (button) {
        button.remove();
    }
}

async function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value.trim();

    const httpsAPI = `https://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`;

    if (!searchInput) { 
        alert("Por favor, preencha o campo de pesquisa");
        return;
    }

    const moviesFound = await searchMovie(httpsAPI);

    if (moviesFound.length === 0) {
        alert("Nenhum filme encontrado!");
        return;
    }
    displayMovies(moviesFound);

    document.getElementById('trailers').style.display = 'none';
    document.getElementById('awards').style.display = 'none';
}

function displayMovies(movies) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    movies.forEach(movie => {
        const item = createListItem(movie);
        container.appendChild(item);
    });
}

function handlePosterClick(event) {
    const details_trailer = document.getElementById('details-trailer');
    const img = event.target.closest('img');
    if (img) {
        const title = img.dataset.title;
        const year = img.dataset.year;
        const type = img.dataset.type;
        const country = img.dataset.country;
        const genre = img.dataset.genre;
        const awards = img.dataset.awards;

        const details = document.createElement('div');
        details.innerHTML = `
            <div id='details-container'>
                <h2>${title}</h2>
                <p>Ano: ${year}</p>
                <p>Tipo: ${type}</p>
                <p>País: ${country || 'Não especificado'}</p>
                <p>Genêro: ${genre || 'Não especificado'}</p>
                <p>Awards: ${awards || 'Não possui'}</p>
            </div>
        `;

        details_trailer.innerHTML = '';
        details_trailer.appendChild(details);
        details_trailer.classList.remove('hidden');
    }
}

function handleDropdownClick(event) {
    const genre = event.target.textContent;
    const filteredMovies = allMovies.filter(movie => movie.Genre && movie.Genre.includes(genre));
    displayMovies(filteredMovies);
    
    document.getElementById('trailers').style.display = 'none';
    document.getElementById('awards').style.display = 'none';
}

