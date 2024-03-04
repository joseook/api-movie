document.addEventListener('DOMContentLoaded', function() {
    const movieDetails = JSON.parse(sessionStorage.getItem('movieDetails'));
    displayMovieDetails(movieDetails);
});

function displayMovieDetails(movie) {
    const container = document.getElementById('movie-details');
    container.innerHTML = `
        <div class='flex justify-center flex-col'>
        
        <img src="${checkValue(movie.Poster)}" /> 
        <h2 class='text-red-500 text-center'>Titulo: <span class='text-white'>${checkValue(movie.Title)}</span></h2>
            <div class='container-p '> 
                <div class='flex gap-2 items-center'>
                    <i class="fa-solid fa-calendar-days text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Ano: <span class='text-red-500 text-md'>${checkValue(movie.Year)} </span></p>
                </div>
                
                <div class='flex gap-2 items-center'>
                    <i class="bi bi-camera-reels text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Tipo: <span class='capitalize'>${checkValue(movie.Type)} </span></p>
                </div>
                
                <div class='flex gap-2 items-center'>
                    <i class="bi bi-globe-americas text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> País: <span class='text-normal'>${checkValue(movie.Country)} </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="bi bi-person-bounding-box text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Atores: <span>${checkValue(movie.Actors)} </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="bi bi-translate text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Idioma: <span> ${checkValue(movie.Language)}</span></p>
                </div>
                
                <div class='flex gap-2 items-center '>
                    <i class="fa-solid fa-inbox text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2 '> Sinopse: <span '>${checkValue(movie.Plot)} </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="fa-solid fa-ticket text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Gênero: <span>${checkValue(movie.Genre)} </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="fa-solid fa-user-tie text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Diretor: <span>${checkValue(movie.Director)}  </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="bi bi-award text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Prêmios: <span>${checkValue(movie.Awards)} </span></p>
                </div>

                <div class='flex gap-2 items-center'>
                    <i class="bi bi-graph-up text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Classificação: <span>${checkValue(movie.Rated)} </span></p>
                </div>
                
                <div class='flex gap-2 items-center'>
                    <i class="bi bi-clock-fill text-2xl"></i>
                    <p class='xl:text-xl lg:text-xl flex items-center gap-2'> Duração: <span>${checkValue(movie.Runtime)} </span></p>
                </div>
            </div>
        </div>
    `;
}

function checkValue(value) {
    if (value === undefined || value === 'N/A' || value === null) {
        return 'Não encontrado';
    }
    return value;
}
