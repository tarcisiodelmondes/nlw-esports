import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Check, GameController } from "phosphor-react";
import { Input } from "../Form/Input";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

type Game = {
  id: string;
  title: string;
};

interface CreateAdModalProps {
  gameList: Game[];
}

const WEEK_DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

interface CreateAdProps {
  discord: string;
  game: string;
  hourEnd: string;
  hourStart: string;
  nickname: string;
  useVoiceChannel: string;
  yearsPlaying: string;
}

export function CreateAdModal({ gameList }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isErrorOnSelectWeekDays, setIsErrorOnSelectWeekDays] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData) as unknown as CreateAdProps;

    try {
      handleErrorInSelectWeekDays();

      await api.post(`/games/${data.game}/ads`, {
        name: data.nickname,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: !!data.useVoiceChannel ? true : false,
      });

      toast.success("Anúncio criado com sucesso!", {
        theme: "dark",
      });
    } catch (error) {
      toast.error("Error ao criar anúncio! Tente novamente mais tarde.", {
        theme: "dark",
      });
    }
  }

  function handleErrorInSelectWeekDays() {
    if (weekDays.length > 0) {
      setIsErrorOnSelectWeekDays(false);
      return;
    }

    setIsErrorOnSelectWeekDays(true);
    throw new Error("Error invalid input");
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2a2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 cursor-pointer"
              defaultValue=""
              required
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {gameList.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              placeholder="Como te chamam dentro do game?"
              id="name"
              name="nickname"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord</label>
              <Input
                id="discord"
                name="discord"
                placeholder="Usuario#0000"
                required
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays ">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                {WEEK_DAYS.map((day, index) => (
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded ${
                      weekDays.includes(String(index))
                        ? "bg-violet-500"
                        : "bg-zinc-900"
                    }`}
                    key={day}
                    value={String(index)}
                    title={day}
                  >
                    {day[0]}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>

              {isErrorOnSelectWeekDays ? (
                <span className="mt-1 p-2 bg-zinc-700 text-white text-sm relative rounded">
                  <div className="w-3 h-3 bg-zinc-700 absolute left-[1px] -top-[9px] translate-y-1 rotate-45 rounded"></div>
                  Escolha pelo menos <br /> 1 dia da semana!
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  style={{
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                  }}
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                  required
                />
                <Input
                  style={{
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                  }}
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="De"
                  required
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox.Root
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              name="useVoiceChannel"
            >
              <Checkbox.Indicator>
                <Check weight="bold" className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <div className="mt-4 flex justify-end items-center gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-600 px-5 h-12 font-semibold rounded-md hover:bg-zinc-700"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="flex justify-center items-center gap-3 bg-violet-500 hover:bg-violet-600 px-5 h-12 font-semibold rounded-md"
            >
              <GameController size={24} /> Encontrar duo
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
