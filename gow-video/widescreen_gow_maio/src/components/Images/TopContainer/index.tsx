import styles from './styles.module.css'
import { MutableRefObject } from 'react';
import { CollapseBannerBtn } from '../../CollapseBannerBtn';

interface ILowImagesProps {
  topImagesIds: string[];
  playerRef: MutableRefObject<any>;
  isDev: boolean;
  sas_creativeClickUrl: string
  sas_creativeClickTarget: string
}

export function TopContainer({topImagesIds, playerRef, isDev, sas_creativeClickUrl, sas_creativeClickTarget}: ILowImagesProps) {
  
  return (
    <div id="adh-t" className={styles['adh-t']}>
      <CollapseBannerBtn playerRef={playerRef}/>
      {
        topImagesIds.map((id) => (
          <a href={sas_creativeClickUrl} target={sas_creativeClickTarget} key={id} id={`adh-t-${id}`}>
            <img
              src={isDev ? `/images/top/adh-t-${id}.png` : `./images/top/adh-t-${id}.png`}
            />
          </a>
        ))
      }
    </div>
  );
}