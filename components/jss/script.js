// Chave de API para acesso aos dados da OMDb
const API_KEY = '7320c455';
// Array que armazena todos os filmes obtidos da API
let allMovies = [];

// Evento que é acionado quando o conteúdo do DOM é totalmente carregado
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Obtém os trailers e prêmios dos filmes da API
        const trailers = await fetchTrailers(API_KEY);
        const awards = await fetchAwards(API_KEY);

        // Carrega os trailers e prêmios em contêineres específicos no DOM
        loadingList(trailers, 'container-trailer');
        loadingList(awards, 'container-awards');

        // Combina os trailers e prêmios em um único array
        allMovies = trailers.concat(awards);
    } catch (error) {
        console.error(error);
    }

    // Adiciona event listeners para os contêineres dos trailers e prêmios
    const containerTrailer = document.getElementById('container-trailer');
    containerTrailer.addEventListener('mouseover', handleMouseOver);
    containerTrailer.addEventListener('mouseout', handleMouseOut);

    const containerAwards = document.getElementById('container-awards');
    containerAwards.addEventListener('mouseover', handleMouseOver);
    containerAwards.addEventListener('mouseout', handleMouseOut);

    // Adiciona event listener para o botão de pesquisa de filmes
    document.getElementById('submit-movies').addEventListener('click', handleSearch);

    // Adiciona event listeners para os itens do dropdown de gênero
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', handleDropdownClick);
    });
});

// Função para buscar trailers dos filmes da API
async function fetchTrailers(API_KEY) {
    const response = await fetch(`https://www.omdbapi.com/?s=trailer&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
}

// Função para buscar prêmios dos filmes da API
async function fetchAwards(API_KEY) {
    const response = await fetch(`https://www.omdbapi.com/?s=movie&type=movie&apikey=${API_KEY}&s=awards`);
    const data = await response.json();
    return data.Search || [];
}

// Função para buscar detalhes de um filme específico usando seu IMDb ID
async function fetchMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data && data.Response === "True") {
        return data;
    } else {
        throw new Error("Não foi possível obter os detalhes do filme");
    }
}

// Função para buscar filmes com base em um URL da API
async function searchMovie(httpsAPI) {
    const response = await fetch(httpsAPI);
    const data = await response.json();
    return data.Search || [];
}

// Função para carregar uma lista de filmes em um contêiner no DOM
async function loadingList(listing, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // Itera sobre a lista de filmes e carrega os detalhes de cada filme
    for (const movie of listing) {
        try {
            const details = await fetchMovieDetails(movie.imdbID);
            const item = createListItem(details);
            container.appendChild(item);
        } catch (error) {
            console.error("Erro ao carregar detalhes do filme:", error);
        }
    }
}

// Função para criar um item de lista para um filme
function createListItem(movie, i) {
    const item = document.createElement('div');
    item.classList.add('item');

    // Extrai informações do filme e as adiciona ao item de lista
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

    // Adiciona um event listener para redirecionar para a página de detalhes do filme quando o item é clicado
    item.addEventListener('click', () => {
        sessionStorage.setItem('movieDetails', JSON.stringify(movie));
        window.location.href = './movieDetails.html';
    });

    if (i !== undefined) {
        item.dataset.index = i;
    }

    return item;
}

// Função para lidar com o evento mouseover nos itens da lista de filmes
function handleMouseOver(event) {
    const item = event.target.closest('.item');
    if (item && !event.target.classList.contains('details-button')) {
        if (!item.querySelector('.details-button')) {
            addDetailsButton(item);
        }
    }
}

// Função para lidar com o evento mouseout nos itens da lista de filmes
function handleMouseOut(event) {
    const item = event.target.closest('.item');
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !item.contains(relatedTarget)) {
        removeDetailsButton(item);
    }
}

// Função para adicionar um botão de detalhes a um item da lista de filmes
function addDetailsButton(item) {
    const button = document.createElement('button');
    button.classList.add('details-button');
    button.textContent = 'Mais Detalhes';
    item.appendChild(button);
    button.addEventListener('click', () => {
        const movieDetails = item.dataset.index !== undefined ?
            allMovies[item.dataset.index] : JSON.parse(sessionStorage.getItem('movieDetails'));
        sessionStorage.setItem('movieDetails', JSON.stringify(movieDetails));
        window.location.href = './movieDetails.html';
    });
}

// Função para remover o botão de detalhes de um item da lista de filmes
function removeDetailsButton(item) {
    const button = item.querySelector('.details-button');
    if (button) {
        button.remove();
    }
}

// Função para lidar com o evento de pesquisa de filmes
async function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value.trim();

    const httpsAPI = `https://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`;

    if (!searchInput) {
        alert("Por favor, preencha o campo de pesquisa");
        return;
    }

    const moviesFound = await searchMovie(httpsAPI);

    if (!moviesFound || moviesFound.length === 0) {
        alert("Nenhum filme encontrado!");
        return;
    }

    // Exibe os filmes encontrados na página
    for (let i = 0; i < moviesFound.length; i++) {
        const details = await fetchMovieDetails(moviesFound[i].imdbID);
        displayMovies(details, i);
    }

    // Esconde os contêineres de trailers e prêmios
    document.getElementById('trailers').style.display = 'none';
    document.getElementById('awards').style.display = 'none';
}

// Função para exibir os filmes encontrados na página de pesquisa
function displayMovies(movie, i) {
    const container = document.getElementById('search-results');
    const item = createListItem(movie, i);
    container.appendChild(item);
    container.parentElement.classList.remove('hidden');
}

// Função para lidar com o evento de clique nos itens do dropdown de gênero
async function handleDropdownClick(event) {
    const genre = event.target.textContent;
    const filteredMovies = [];
    const promises = [];

    // Itera sobre todos os filmes para obter os detalhes de cada um
    for (const movie of allMovies) {
        promises.push(fetchMovieDetails(movie.imdbID));
    }

    // Aguarda a resolução de todas as promessas para filtrar os filmes pelo gênero selecionado
    const moviesDetails = await Promise.all(promises);

    // Filtra os filmes com base no gênero selecionado e exibe-os na página
    for (const details of moviesDetails) {
        const genresArray = details.Genre ? details.Genre.split(',').map(genre => genre.trim()) : [];
        if (genresArray.includes(genre)) {
            filteredMovies.push(details);
        }
    }

    displayMovies(filteredMovies);
    
    // Esconde os contêineres de trailers e prêmios
    document.getElementById('trailers').style.display = 'none';
    document.getElementById('awards').style.display = 'none';
}
