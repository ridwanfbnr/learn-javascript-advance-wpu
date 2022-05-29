
// Ketika tombol search di klik
$(".search-button").on("click", function () {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=2f21e25b&s=" + $(".input-keyword").val(),
        success: (result) => {
            const movies = result.Search;
            let cards = "";

            movies.forEach((movie) => {
                cards += showCards(movie);
            });

            $(".movie-container").html(cards);

            // Ketika tombol detail di klik
            $(".detail-button").on("click", function () {
                $.ajax({
                    url:
                        "http://www.omdbapi.com/?apikey=2f21e25b&i=" + $(this).data("imdbid"),
                    success: (movie) => {
                        const movieDetail = showMovieDetail(movie);

                        $(".modal-body").html(movieDetail);
                    },
                });
            });
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });
});


// Ketika tombol Home di klik
$(".home-button").on("click", function () {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=2f21e25b&s=avengers",
        success: (result) => {
            const movies = result.Search;
            let cards = "";

            movies.forEach((movie) => {
                cards += showCards(movie);
            });

            $(".movie-container").html(cards);

            // Ketika tombol detail di klik
            $(".detail-button").on("click", function () {
                $.ajax({
                    url:
                        "http://www.omdbapi.com/?apikey=2f21e25b&i=" +
                        $(this).data("imdbid"),
                    success: (movie) => {
                        const movieDetail = showMovieDetail(movie);

                        $(".modal-body").html(movieDetail);
                    },
                });
            });
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });
})


// Home
$.ajax({
    url: "http://www.omdbapi.com/?apikey=2f21e25b&s=avengers",
    success: (result) => {
        const movies = result.Search;
        let cards = "";

        movies.forEach((movie) => {
            cards += showCards(movie);
        });

        $(".movie-container").html(cards);

        // Ketika tombol detail di klik
        $(".detail-button").on("click", function () {
            $.ajax({
                url:
                    "http://www.omdbapi.com/?apikey=2f21e25b&i=" +
                    $(this).data("imdbid"),
                success: (movie) => {
                    const movieDetail = showMovieDetail(movie);

                    $(".modal-body").html(movieDetail);
                },
            });
        });
    },
    error: (error) => {
        console.log(error.responseText);
    }
});

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
