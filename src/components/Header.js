import Link from 'next/link';
import { getSettings } from '@/lib/api';
import styles from './Header.module.css';

export default function Header() {
  const settings = getSettings();
  const navItems = settings.nav_items || [];
  const siteTitle = settings.site_title || 'Orangecake';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          {siteTitle}
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item, index) => (
            <Link key={index} href={item.path} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
