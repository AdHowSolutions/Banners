import styles from './styles.module.css'
import gsap from 'gsap'

import { useLayoutEffect, useRef } from 'react';
import { Images } from "../Images";
import { useTimelinesStore } from '../../stores/timelinesStore';
import { YtVideo } from '../YtVideo';

export function Banner() {

  const lowImages = ['bg','t1','controle']
  const topImages = ['BG','m2','m1','logo','cta','t-tag','b-tag','t-logo']
  const bannerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef(null)

  const { state: { timelines } } = useTimelinesStore()

  useLayoutEffect(() => {
    const { low, lowLoop, top, ctaPulse } = timelines

    const lowContext = gsap.context(() => {
      low.addLabel("start")
        .from("#adh-b, #adh-b-controle", {autoAlpha: 0, y: 100, ease: "power3.out"})
        .from("#adh-b-t1", {autoAlpha: 0, scale: 1.1, ease: "power3.out"})
        .add(() => { lowLoop.play(0) }, '+=.5')

      lowLoop.addLabel("start")
        .to('#adh-b-t1', {scale: 1.03})
        .to('#adh-b-t1', {scale: 1})
        .to('#adh-b-t1', {scale: 1.03})
        .to('#adh-b-t1', {scale: 1})
        .repeatDelay(3)
        .repeat(-1)
    }, bannerRef)

    const topContext = gsap.context(() => {
      top.addLabel("start")
        .from("#adh-t", {autoAlpha: 0, y: 600, ease: "power3.out"}, "start")
        .from(["#adh-t-BG", "#adh-v-container"], {autoAlpha: 0, y: 600, ease: "power3.out", stagger: 0, 
          onComplete: () => {
            //@ts-expect-error
            playerRef.current.internalPlayer.playVideo()
            top.pause()
          }
        }, "start")
        .to("#adh-v-container", {autoAlpha: 0, y: 600, ease: "power3.out"})
        .from("#adh-t-t-tag, #adh-t-t-logo", {autoAlpha: 0, y: -30, ease: "power3.out"}, "-=.3")
        .from("#adh-t-b-tag", {autoAlpha: 0, y: 30, ease: "power3.out"}, "<")

        .from("#adh-t-logo", {autoAlpha: 0, scale: 1.5, ease: "power3.in"}, "-=.8")

        .from("#adh-t-m1", {autoAlpha: 0, x: -35, ease: "power3.out"})
        .from("#adh-t-m2", {autoAlpha: 0, x: 35, ease: "power3.out"}, "<")
        
        .from("#adh-t-cta", {autoAlpha: 0, x: 35, ease: "power3.out"}, "<")
        .add(() => { ctaPulse.play(0) }, '+=.5')

      ctaPulse.addLabel("start")
        .to('#adh-t-cta', {scale: 1.05})
        .to('#adh-t-cta', {scale: 1})
        .to('#adh-t-cta', {scale: 1.05})
        .to('#adh-t-cta', {scale: 1})
        .repeatDelay(3)
        .repeat(-1)
    }, bannerRef)

    return () => (
      lowContext.revert(),
      topContext.revert()
    )
  }, [])

  return (
    <>
      <div ref={bannerRef} id="adh-widescreen" className={styles['adh-widescreen']}>
        <Images
          lowImagesIds={lowImages}
          topImagesIds={topImages}
          playerRef={playerRef}
        />
        <YtVideo
          videoId="WxEZTOc-6Ig"
          divId="adh-t-video-mask"
          playerRef={playerRef}
        />
      </div>
    </>
  );
}