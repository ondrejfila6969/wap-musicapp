import Header from "../../components/Header/Header";
import Library from "../../components/Library/Library";
import MainContent from "../../components/MainContent/MainContent";
import Player from "../../components/Player/Player";

export default function Home() {
  return (
    <>
      <div className="min-h-screen text-white p-4">
        <Header />
        <div className="grid grid-cols-[60%_1fr] gap-4 h-[calc(100vh-6rem)]">
          <MainContent />
          <div className="flex flex-col gap-4">
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
