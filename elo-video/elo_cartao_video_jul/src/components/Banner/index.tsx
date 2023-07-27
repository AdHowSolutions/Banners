import styles from './styles.module.css'
import gsap from 'gsap'

import { useLayoutEffect, useRef } from 'react';
import { Images } from "../Images";
import { useTimelinesStore } from '../../stores/timelinesStore';
import { YtVideo } from '../YtVideo';

export function Banner() {

  const lowImages = ['bg','cta','e1','h1']
  const topImages = ['bg1','bg2','h1','t7','t6','t5','e2','e1','logo-e3','logo-e2','logo-e1','m1','logo','t4','t3','t2','t1','cta','cta2']
  const bannerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef(null)

  const { state: { timelines } } = useTimelinesStore()

  useLayoutEffect(() => {
    const { low, lowLoop, top, ctaPulse } = timelines

    const lowContext = gsap.context(() => {
      low.addLabel("start")
        .from(["#adh-b", "#adh-b-h1"], {autoAlpha: 0, y: 100, ease: "power3.out", stagger: .15})
        .from("#adh-b-e1", {autoAlpha: 0, x: 30, ease: "power3.out"}, "-=.2")
        .from("#adh-b-cta", {autoAlpha: 0, scale: 1.1, ease: "power3.out"})
        .add(() => { lowLoop.play(0) }, '+=.5')

      lowLoop.addLabel("start")
        .to('#adh-b-cta', {scale: 1.03})
        .to('#adh-b-cta', {scale: 1})
        .to('#adh-b-cta', {scale: 1.03})
        .to('#adh-b-cta', {scale: 1})
        .repeatDelay(3)
        .repeat(-1)
    }, bannerRef)

    const topContext = gsap.context(() => {
      top.addLabel("start")
        .from("#adh-t, #adh-v-container", {autoAlpha: 0, y: 600, ease: "power3.out"}, "start")
        .from(["#adh-t-bg1", "#adh-t-bg2"], {autoAlpha: 0, y: 600, ease: "power3.out", 
          onComplete: () => {
            //@ts-expect-error
            playerRef.current.internalPlayer.playVideo()
            top.pause()
          }
        })
        .addLabel("post-video")
        .to("#adh-v-container", {autoAlpha: 0, y: 600, ease: "power3.out"})
        .from(["#adh-t-e1", "#adh-t-e2"], {autoAlpha: 0, scale: 1.1, ease: "back.out", stagger: .15}, "-=.3")
        .from("#adh-t-h1", {autoAlpha: 0, scale: 1.1, ease: "power3.out"}, "-=.3")
        .from(["#adh-t-t5", "#adh-t-t6", "#adh-t-t7"], {autoAlpha: 0, x: -75, ease: "back.out", stagger: .15}, "-=.3")

        .from(["#adh-t-m1", "#adh-t-t1", "#adh-t-t2", "#adh-t-t3", "#adh-t-t4"], {autoAlpha: 0, y: 75, ease: "back.out", stagger: .15}, "-=.55")
        .from(["#adh-t-cta2", "#adh-t-cta"], {autoAlpha: 0, x: -75, ease: "back.out", stagger: .15}, "-=.3")

        .from("#adh-t-logo", {autoAlpha: 0, scale: 1.1, ease: "power3.out"}, "post-video+=.5")
        .from(["#adh-t-logo-e3", "#adh-t-logo-e2", "#adh-t-logo-e1"], {autoAlpha: 0, x: 75, ease: "back.out", stagger: .15}, "post-video+=.7")
        .add(() => { ctaPulse.play(0) }, '+=.5')

      ctaPulse.addLabel("start")
        .to(['#adh-t-cta', '#adh-t-cta2'], {scale: 1.05})
        .to(['#adh-t-cta', '#adh-t-cta2'], {scale: 1})
        .to(['#adh-t-cta', '#adh-t-cta2'], {scale: 1.05})
        .to(['#adh-t-cta', '#adh-t-cta2'], {scale: 1})
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
      <div ref={bannerRef} id="adh-widescreen" className={`${styles['adh-widescreen']} ${styles['adhow-bg']}`}>
        <Images
          lowImagesIds={lowImages}
          topImagesIds={topImages}
          playerRef={playerRef}
        />
        <YtVideo
          videoId="whWd8wo9dDM"
          divId="adh-t-video-mask"
          playerRef={playerRef}
        />
      </div>
    </>
  );
}