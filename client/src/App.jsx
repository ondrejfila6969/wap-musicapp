import './App.css'
import Player from './components/Player/Player'
import SearchBar from './components/SearchBar/SearchBar'

export default function App() {
  return (
    <>
        <SearchBar />
        <Player
        albumArtUrl={"albumCoverExample.png"}
        artist={"Jablotron"}
        title={"Dreams"}
        />
    </>
  )
}
