interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ adsCount, bannerUrl, title }: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden max-w-[180px] max-h-[240px] w-full"
    >
      <img src={bannerUrl} alt="" />

      <div className="absolute left-0 bottom-0 right-0 bg-game-gradient pb-4 pl-4 pt-16">
        <strong className="text-white font-bold">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} {adsCount <= 1 ? "anúncio" : "anúncios"}
        </span>
      </div>
    </a>
  );
}
