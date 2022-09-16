import Logo from "./assets/logo.svg";
import { MagnifyingGlassPlus } from "phosphor-react";

export function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col mt-20">
      <img src={Logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a
          href=""
          className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
        >
          <img src="/game_1.png" alt="" />

          <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
            <strong className="text-white font-bold">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
        <div className="w-full bg-[#2a2634] px-8 py-6 flex items-center justify-between">
          <div>
            <strong className="text-2xl font-black text-white">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className="px-4 py-3 rounded-md text-white font-medium flex gap-3 bg-violet-500 hover:bg-violet-600 cursor-poiter">
            <MagnifyingGlassPlus size={24} /> Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  );
}
