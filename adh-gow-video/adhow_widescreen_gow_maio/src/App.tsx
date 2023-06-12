import { useEffect, useState } from "react";
import { Banner } from "./components/Banner";
import { useBannerConfig } from "./stores/bannerConfig";

export function App() {

  const [hasBannerConfig, setHasBannerConfig] = useState(false)
  const { actions: {setBannerConfig} } = useBannerConfig()

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if(event.data.includes('adh-bannerConfig')) {
        const adhData = JSON.parse(event.data);
        setBannerConfig(adhData)
        setHasBannerConfig(true)
      }
    })
    return () => {
      window.removeEventListener('message', () => {})
    }
  }, [])

  return (
    hasBannerConfig 
      ? <Banner /> 
      : <div></div>
  );
}