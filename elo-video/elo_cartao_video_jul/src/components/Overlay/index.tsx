import styles from './styles.module.css'
import { collapseBanner } from '../../helpers';
import { MutableRefObject } from 'react';

interface IOverlayProps {
  playerRef: MutableRefObject<any>;
}

export function Overlay({playerRef}: IOverlayProps) {

  return (
    <div 
      id="adh-overlay" 
      className={styles['adh-overlay']}
      onClick={() => {
        collapseBanner()
        playerRef.current?.internalPlayer.stopVideo()
      }}
    />
  );
}