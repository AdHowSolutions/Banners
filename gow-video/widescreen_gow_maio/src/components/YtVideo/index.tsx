import YouTube from 'react-youtube'
import styles from './styles.module.css'
import { MutableRefObject } from 'react';
import { useTimelinesStore } from '../../stores/timelinesStore';
import { CollapseBannerBtn } from '../CollapseBannerBtn';

interface IYtVideoProps {
  videoId: string;
  divId: string
  playerRef: MutableRefObject<any>;
}

export function YtVideo({videoId, divId, playerRef}: IYtVideoProps) {

  const { state: { timelines: { top } } } = useTimelinesStore()

  return (
    <div id='adh-v-container' className={styles['adh-v-container']} >
      <CollapseBannerBtn playerRef={playerRef}/>
      <div id={divId}>
        <YouTube
          ref={playerRef}
          videoId={videoId}
          iframeClassName='adh-t-video'
          onStateChange={e => {
            if (e.data === 0 || e.data === 2) {
              top.play()
            }
          }}
          opts={{
            playerVars: {
              controls: 0,
              disablekb: 1,
              fs: 0,
              loop: 1,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              iv_load_policy: 3,
              color: 'white',
            }
          }}
        />
      </div>
    </div>
  );
}