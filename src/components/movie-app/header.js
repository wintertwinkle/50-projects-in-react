import useMovies from "./useMovies"

function Header() {
  const { keyword, setKeyword, setSearch } = useMovies()

  function handleSumbit(e) {
    e.preventDefault()
    setSearch(keyword)
  }

  return (
    <header>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </header>
  )
}

export default Header
