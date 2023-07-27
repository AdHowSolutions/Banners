import gsap from 'gsap';
import styles from './styles.module.css';
import { useLayoutEffect } from 'react';
import { useTimelinesStore } from '../../../stores/timelinesStore';

interface ILowImagesProps {
  lowImagesIds: string[];
  isDev: boolean;
  sas_creativeClickUrl: string
  sas_creativeClickTarget: string
}

export function LowContainer({lowImagesIds, isDev, sas_creativeClickUrl, sas_creativeClickTarget}: ILowImagesProps) {

  const { state: { timelines: { top }} } = useTimelinesStore()
  const expandBannerTl = gsap.timeline({defaults: {duration: 0.7}, paused: true})

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      expandBannerTl
        .to("#adh-b-h1", {x: 620, onComplete: () => {
          parent.postMessage(JSON.stringify({
            type: 'adh-action',
            action: 'expandBanner',
            format: 'wide'
          }), '*')
          top.play(0)
          gsap.to("#adh-b-h1", {duration: 1, x: 0})
          gsap.to("#adh-overlay, #adh-collapse-btn", {opacity: 1, pointerEvents: 'all'})
          gsap.fromTo(
            "#adh-t", 
            {display: 'none', y: 1000, ease: "power3.out"},
            {display: 'block', y: 0, ease: "power3.out"}
          )
        }})
    })
    return () => ctx.revert()
  }, [])

  return (
    <div 
      id="adh-b"
      className={styles['adh-b']}
      onMouseEnter={() => {expandBannerTl.play(0)}}
      onMouseLeave={() => {expandBannerTl.reverse()}}
    >
      {
        lowImagesIds.map((id) => (
          <a key={id} href={sas_creativeClickUrl} target={sas_creativeClickTarget} id={`adh-b-${id}`}>
            <img
              src={isDev ? `/images/low/adh-b-${id}.png` : `./images/low/adh-b-${id}.png`}
            />
          </a>
        ))
      }
      <div id="adh-expand-progress" className={styles['adh-expand-progress']}></div>
    </div>
  );
}