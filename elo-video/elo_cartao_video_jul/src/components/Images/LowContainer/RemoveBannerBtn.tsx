
import styles from './styles.module.css';

export function RemoveBannerBtn() {

  function removeBanner() {
    const banner = document.querySelector("#adh-widescreen")

    if (banner) {
      banner.remove()
    }

  }

  return (
    <div className={styles['adh-b']} style={{pointerEvents: 'none'}}>
      <div 
        id="adh-b-close" 
        className={styles['adh-b-close']}
        onClick={removeBanner}
        style={{pointerEvents: 'all'}}
      >
        <button>
          <span>X</span>
        </button>
      </div>
    </div>
  );
}