import useMovies, { IMG_PATH } from "./useMovies"
import Movie from "./movie"

function Main() {
  const { movies, isLoding, isError } = useMovies()

  console.log(`render movies`)

  return (
    <main>
      {isError && <div>Something went wrong ...</div>}
      {isLoding ? (
        <div className="loading">Loading...</div>
      ) : (
        movies.map((movie) => (
          <Movie
            imgPath={IMG_PATH + movie.poster_path}
            title={movie.title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
            key={movie.id}
          />
        ))
      )}
    </main>
  )
}

export default Main
