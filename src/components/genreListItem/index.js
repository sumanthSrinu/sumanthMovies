import './index.css'

const GenreItem = props => {
  const {eachgenre} = props

  return (
    <>
      <p className="genreItemPara">{eachgenre.name}</p>
    </>
  )
}

export default GenreItem
