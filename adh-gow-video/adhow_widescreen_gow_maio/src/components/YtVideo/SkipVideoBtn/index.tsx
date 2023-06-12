import { MutableRefObject } from 'react';
import { useTimelinesStore } from '../../../stores/timelinesStore';
import gsap from 'gsap'
import styles from './styles.module.css'

interface SkipVideoBtnP {
  playerRef: MutableRefObject<any>;
}

export function SkipVideoBtn({playerRef}: SkipVideoBtnP) {

  const { state: { timelines: { top } } } = useTimelinesStore()
  
  return (
    <button 
      id={styles['adh-v-skip-btn']}
      onClick={() => {
        playerRef.current.internalPlayer.stopVideo()
        top.play()
      }}
      onMouseEnter={(event) => {
        gsap.to(event.target, {scale: 1.2, duration: .2})
      }}
      onMouseLeave={(event) => {
        gsap.to(event.target, {scale: 1, duration: .2})
      }}
    >
      Pular Video
    </button>
  );
}