import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="mx-6 mb-6 pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
      <div className="w-full bg-[#2a2634] px-8 py-6 flex items-center justify-between">
        <div>
          <strong className="text-2xl font-black text-white">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="px-4 py-3 rounded-md text-white font-medium flex gap-3 bg-violet-500 hover:bg-violet-600 cursor-poiter">
          <MagnifyingGlassPlus size={24} /> Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
