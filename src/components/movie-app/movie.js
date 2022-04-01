function movie({ imgPath, title, voteAverage, overview }) {
  const voteClass = getClassByRate(voteAverage)

  return (
    <div className="movie">
      <img src={imgPath} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={voteClass}>{voteAverage}</span>
      </div>
      <div className="overview">
        <h3>Overview</h3>
        {overview}
      </div>
    </div>
  )
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 5) {
    return "orange"
  } else {
    return "red"
  }
}

export default movie
