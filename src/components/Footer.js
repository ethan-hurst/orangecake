import { getSettings } from '@/lib/api';
import styles from './Footer.module.css';

export default function Footer() {
  const settings = getSettings();
  const footerText = settings.footer_text || '© 2025 Orangecake';

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>{footerText}</p>
      </div>
    </footer>
  );
}
