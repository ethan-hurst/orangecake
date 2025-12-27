import styles from './Hero.module.css';

export default function Hero({ title, description }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.actions}>
          <button className="button">Get Started</button>
          <button className="button button-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}
