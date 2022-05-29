
// ketika tombol search diklik
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
})


function getMovies(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=2f21e25b&s=" + keyword)
        .then((response) => response.json())
        .then((response) => response.Search)
}

function updateUI(movies) {
    let cards = "";
    movies.forEach((movie) => cards += showCards(movie));
    const movieContainer = document.querySelector(".movie-container");
    movieContainer.innerHTML = cards;

}

// ketika tombol detail diklik
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("detail-button")) {
        const imdbid = e.target.getAttribute("data-imdbid");
        const movieDetail = await getMovieDetail(imdbid);
        detailUI(movieDetail);
    };
})

function getMovieDetail(imdbid) {
    return fetch("http://www.omdbapi.com/?apikey=2f21e25b&i=" + imdbid)
        .then((response) => response.json())
        .then((movie) => movie);
}

function detailUI(movie) {
    const movieDetail = showMovieDetail(movie);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = movieDetail;
}


// ketika tombol home di klik
const homeButton = document.querySelector(".home-button");
homeButton.addEventListener("click", async function () {
    const homeMovie = await getHome();
    updateUI(homeMovie);
})

function getHome() {
    return fetch("http://www.omdbapi.com/?apikey=2f21e25b&s=avengers")
        .then((response) => response.json())
        .then((response) => response.Search);
}


function showError(error) {
    return `
    <div class="content-container">
        <fieldset>
            <h2>${error.status} - File or directory not found.</h2>
            <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>
        </fieldset>
    </div>
    `;
}

function showCards(movie) {
    return `
    <div class="col-md-4 my-4">
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Details</a>
            </div>
        </div>
    </div>
    `;
}

function showMovieDetail(movie) {
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${movie.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
                    <li class="list-group-item"><strong>Country : </strong>${movie.Country}</li>
                    <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong> <br> ${movie.Plot}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}
