import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertStringHourToSeconds } from "./utils/convert-hour-string-to-seconds";
import { convertSecondsToHour } from "./utils/convert-secinds-to-hour";

const app = express();
const prisma = new PrismaClient();

const PORT = 3333;

app.use(express.json());
app.use(cors());

app.get("/games", async (_req, res) => {
  const allGame = await prisma.game.findMany({
    include: { _count: { select: { ads: true } } },
  });

  res.json(allGame);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id as string;

  const allAdsOfGame = await prisma.ad.findMany({
    where: { gameId },
    select: {
      hourEnd: true,
      hourStart: true,
      name: true,
      id: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlaying: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const allAdsOfGameFormatted = allAdsOfGame.map((game) => {
    return {
      ...game,
      weekDays: game.weekDays.split(","),
      hourStart: convertSecondsToHour(game.hourStart),
      hourEnd: convertSecondsToHour(game.hourEnd),
    };
  });

  res.json(allAdsOfGameFormatted);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id as string;

  const discord = await prisma.ad.findUniqueOrThrow({
    where: { id: adId },
    select: {
      discord: true,
    },
  });

  res.json(discord);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = req.body;

  if (
    !name ||
    !yearsPlaying ||
    !discord ||
    !weekDays ||
    !hourStart ||
    !hourEnd
  ) {
    return res.status(400).json({ error: { message: "Body is invalid!" } });
  }

  await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourStart: convertStringHourToSeconds(hourStart),
      hourEnd: convertStringHourToSeconds(hourEnd),
      useVoiceChannel: !!useVoiceChannel,
    },
  });

  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Server os running: http://localhost:${PORT}`);
});
