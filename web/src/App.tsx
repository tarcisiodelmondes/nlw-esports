import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";
import Logo from "./assets/logo.svg";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { api } from "./services/api";

type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchGames() {
      const { data } = await api.get<Game[]>("/games");

      setGames(data);
    }

    fetchGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col mt-20">
      <ToastContainer />
      <img src={Logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdModal gameList={games} />

        <CreateAdBanner />
      </Dialog.Root>
    </div>
  );
}
