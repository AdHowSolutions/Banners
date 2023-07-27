import styles from './styles.module.css'

interface IRequestInteractionProps {
  setHasUserInteracted: (value: boolean) => void; 
}

export function RequestInteraction({setHasUserInteracted}: IRequestInteractionProps) {
  return (
  <div className={styles['adh-request-overlay']} onClick={() => setHasUserInteracted(true)}>
    <div className={styles['adh-request-btn']}>
      <p className={styles['adh-request-txt']}>Clique para visualizar o banner</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
    </div>
  </div>
  );
}