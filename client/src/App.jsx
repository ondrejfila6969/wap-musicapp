import "./App.css";
import Library from "./components/Library/Library";
import MainContent from "./components/MainContent/MainContent";
import Player from "./components/Player/Player";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  return (
    <>
      <div class="min-h-screen bg-black text-white p-4">
        <div class="flex justify-between items-center mb-4">
          <div class="text-2xl font-bold">SONUS</div>
          <div class="flex gap-4 items-center">
            <SearchBar />
            <div class="w-16 h-10 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div class="grid grid-cols-[60%_1fr] gap-4 h-[calc(100vh-6rem)]">
          <MainContent />
          <div class="flex flex-col gap-4">
            <Library />
            <Player
              albumArtUrl={"albumCoverExample.png"}
              artist={"Jablotron"}
              title={"Dreams"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
