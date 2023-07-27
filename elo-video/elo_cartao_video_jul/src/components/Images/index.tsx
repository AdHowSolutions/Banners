import { MutableRefObject } from "react";
import { Overlay } from "../Overlay";
import { LowContainer } from "./LowContainer";
import { TopContainer } from "./TopContainer";
import { useBannerConfig } from "../../stores/bannerConfig";

interface IImagesProps {
  lowImagesIds: string[];
  topImagesIds: string[];
  playerRef: MutableRefObject<any>;
}

export function Images({ lowImagesIds, topImagesIds, playerRef }: IImagesProps) {

  const isDev = window.location.hostname === "localhost"

  const { state: {sas_creativeClickUrl, sas_creativeClickTarget} } = useBannerConfig()

  return (
    <>
      <LowContainer 
        lowImagesIds={lowImagesIds}
        isDev={isDev}
        sas_creativeClickUrl={sas_creativeClickUrl === "[sas_creativeClickUrl]" ? "https://www.elo.com.br" : sas_creativeClickUrl}
        sas_creativeClickTarget={sas_creativeClickTarget === "[sas_creativeClickTarget]" ? "_blank" : sas_creativeClickTarget}
      />
      <Overlay
        playerRef={playerRef}
      />
      <TopContainer 
        topImagesIds={topImagesIds}
        playerRef={playerRef}
        isDev={isDev}
        sas_creativeClickUrl={sas_creativeClickUrl === "[sas_creativeClickUrl]" ? "https://www.elo.com.br" : sas_creativeClickUrl}
        sas_creativeClickTarget={sas_creativeClickTarget === "[sas_creativeClickTarget]" ? "_blank" : sas_creativeClickTarget}
      />
    </>
  );
}