
// Ketika tombol Search di klik
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
    const input = document.querySelector(".input-keyword");

    fetch("http://www.omdbapi.com/?apikey=2f21e25b&s=" + input.value)
        .then((response) => response.json())
        .then((response) => {
            const searchMovie = response.Search;
            let cards = "";

            searchMovie.forEach((movie) => {
                cards += showCards(movie);
            });

            const movieContainer = document.querySelector(".movie-container");
            movieContainer.innerHTML = cards;

            // Ketika tombol detail di klik
            const detailButton = document.querySelectorAll(".detail-button");
            detailButton.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const imdbid = btn.getAttribute("data-imdbid");
                    fetch("http://www.omdbapi.com/?apikey=2f21e25b&i=" + imdbid)
                        .then((response) => response.json())
                        .then((movie) => {
                            const movieDetail = showMovieDetail(movie);
                            const modalBody = document.querySelector(".modal-body");
                            modalBody.innerHTML = movieDetail;
                        });
                });
            });
        })
        .catch((error) => {
            const err = document.querySelector(".content");
            err.innerHTML = showError(error);
        });
});


// Ketika tombol Home diKlik
const homeButton = document.querySelector(".home-button");
homeButton.addEventListener("click", function () {
    fetch("http://www.omdbapi.com/?apikey=2f21e25b&s=avengers")
        .then((response) => response.json())
        .then((response) => {
            const searchMovie = response.Search;
            let cards = "";

            searchMovie.forEach((movie) => {
                cards += showCards(movie);
            });

            const movieContainer = document.querySelector(".movie-container");
            movieContainer.innerHTML = cards;

            // Ketika tombol detail di klik
            const detailButton = document.querySelectorAll(".detail-button");
            detailButton.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const imdbid = btn.getAttribute("data-imdbid");
                    fetch("http://www.omdbapi.com/?apikey=2f21e25b&i=" + imdbid)
                        .then((response) => response.json())
                        .then((movie) => {
                            const movieDetail = showMovieDetail(movie);
                            const modalBody = document.querySelector(".modal-body");
                            modalBody.innerHTML = movieDetail;
                        });
                });
            });
        });
});


// Home
fetch("http://www.omdbapi.com/?apikey=2f21e25b&s=avengers")
    .then((response) => response.json())
    .then((response) => {
        const searchMovie = response.Search;
        let cards = "";

        searchMovie.forEach((movie) => {
            cards += showCards(movie);
        });

        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = cards;

        // Ketika tombol detail di klik
        const detailButton = document.querySelectorAll(".detail-button");
        detailButton.forEach((btn) => {
            btn.addEventListener("click", function () {
                const imdbid = btn.getAttribute("data-imdbid");
                fetch("http://www.omdbapi.com/?apikey=2f21e25b&i=" + imdbid)
                    .then((response) => response.json())
                    .then((movie) => {
                        const movieDetail = showMovieDetail(movie);
                        const modalBody = document.querySelector(".modal-body");
                        modalBody.innerHTML = movieDetail;
                    });
            });
        })
    });
        

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
};

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
};
