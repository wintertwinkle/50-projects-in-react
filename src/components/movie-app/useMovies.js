import { useEffect, useState } from "react"

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

export const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

export default function useMovies() {
  // movies state
  const [movies, setMovies] = useState([])
  const [keyword, setKeyword] = useState("")
  const [search, setSearch] = useState("")
  const [isLoding, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data.results
  }

  // fetch inital movies by `API_URL` or fetch movies by keyword
  // depend on `isSubmit` is true or false

  // we only want to fetch data when the component mounts
  // to do this, provide an emtpy array as second argument to the effetc hook
  // to aovid activating it on component updates but only for the mounting of the component.
  useEffect(() => {
    const fetchMovies = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        let movies
        if (search !== "") {
          const url = SEARCH_API + search + '"'
          console.log(`sumbit fetching...`)
          setKeyword("")
          movies = await getMovies(url)
          console.log(`finished summit`)
        } else {
          movies = await getMovies(API_URL)
        }
        console.log(`start to reset movies`)
        setMovies(movies)
        console.log(`reset movies success!`)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        console.log(`Something went wrong: ${error}`)
      }
    }
    fetchMovies()
  }, [search])

  return { movies, keyword, isLoding, isError, setKeyword, setSearch }
}
