import { useEffect, useState } from "react";
import { Banner } from "./components/Banner";
import { useBannerConfig } from "./stores/bannerConfig";

export function App() {

  const isLocalHost = window.location.hostname.includes('localhost') || window.location.hostname.includes('adhowsolutions') || window.location.hostname.includes('127.0.0.1')

  const [hasBannerConfig, setHasBannerConfig] = useState(false)
  const { actions: {setBannerConfig} } = useBannerConfig()

  useEffect(() => {

    if(isLocalHost) {
      setHasBannerConfig(true)
      return
    }

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
    <>
      {
        hasBannerConfig 
        ? <Banner /> 
        : <div></div>
      }
    </>
  );
}