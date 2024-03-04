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
    
    const containerAwards = document.getElementById('container-awards');
    containerAwards.addEventListener('mouseover', handleMouseOver);
    containerAwards.addEventListener('mouseout', handleMouseOut);

    document.getElementById('submit-movies').addEventListener('click', handleSearch);

    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', handleDropdownClick);
    });  
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

async function fetchMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data && data.Response === "True") {
        return data;
    } else {
        throw new Error("Não foi possível obter os detalhes do filme");
    }
}

async function searchMovie(httpsAPI) {
    const response = await fetch(httpsAPI);
    const data = await response.json();
    return data.Search || [];
}

async function loadingList(listing, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (const movie of listing) {
        try {
            const details = await fetchMovieDetailsByTitle(movie.Title);
            const item = createListItem(details);
            container.appendChild(item);
        } catch (error) {
            console.error("Erro ao carregar detalhes do filme:", error);
        }
    }
}


async function loadingList(listing, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (const movie of listing) {
        try {
            const details = await fetchMovieDetailsByTitle(movie.Title);
            const item = createListItem(details);
            container.appendChild(item);
        } catch (error) {
            console.error("Erro ao carregar detalhes do filme:", error);
        }
    }
}


async function fetchMovieDetailsByTitle(title) {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data && data.Response === "True") {
        return data;
    } else {
        throw new Error("Não foi possível obter os detalhes do filme");
    }
}


function createListItem(movie) {
    const item = document.createElement('div');
    item.classList.add('item');
    
    console.log("Dados do filme:", movie); 
    
    const title = movie.Title ? movie.Title : 'Não identificado';
    const year = movie.Year ? movie.Year : 'Não identificado';
    const type = movie.Type ? movie.Type : 'Não identificado';
    const country = movie.Country ? movie.Country : 'Não identificado';
    const actors = movie.Actors ? movie.Actors : 'Não identificado';
    
    item.innerHTML = `
        <img src="${movie.Poster}" /> 
        <h2>Titulo: ${title}</h2>
        <p>Ano: ${year}</p>
        <p class='capitalize'>Tipo: ${type}</p>
        <p>País: ${country}</p>
        <p>Atores: ${actors}</p>
    `;
    
    item.addEventListener('click', () => {
        sessionStorage.setItem('movieDetails', JSON.stringify(movie));
        window.location.href = './movieDetails.html';
    });
    
    return item;
}

function handleMouseOver(event) {
    const item = event.target.closest('.item');
    if (item && !event.target.classList.contains('details-button')) {
        if (!item.querySelector('.details-button')) {
            addDetailsButton(item);
        }
    }
}

function handleMouseOut(event) {
    const item = event.target.closest('.item');
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !item.contains(relatedTarget)) {
        removeDetailsButton(item);
    }
}

function addDetailsButton(item) {
    const button = document.createElement('button');
    button.classList.add('details-button');
    button.textContent = 'Mais Detalhes';
    item.appendChild(button);
    button.addEventListener('click', () => {
        const movieDetails = item.dataset;
        sessionStorage.setItem('movieDetails', JSON.stringify(movieDetails));
        window.location.href = './movieDetails.html';
    });
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

    if (moviesFound.length === 0 || moviesFound.length === null || moviesFound === undefined) {
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

    container.parentElement.classList.remove('hidden');
}


async function handleDropdownClick(event) {
    const genre = event.target.textContent;
    const filteredMovies = [];
    const promises = [];
    
    for (const movie of allMovies) {
        promises.push(fetchMovieDetails(movie.imdbID));
    }

    const moviesDetails = await Promise.all(promises);

    for (const details of moviesDetails) {
        console.log('Detalhes do filme:', details);
        const genresArray = details.Genre ? details.Genre.split(',').map(genre => genre.trim()) : [];
        console.log('Gêneros do filme:', genresArray);
        if (genresArray.includes(genre)) {
            filteredMovies.push(details);
        }
    }

    console.log('Filmes filtrados:', filteredMovies);
    displayMovies(filteredMovies);
    
    document.getElementById('trailers').style.display = 'none';
    document.getElementById('awards').style.display = 'none';
}