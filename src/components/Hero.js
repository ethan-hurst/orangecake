import styles from './Hero.module.css';

export default function Hero({ title, description, objectId, fieldPath, titleField = '.title', descriptionField = '.description' }) {
  return (
    <section
      className={styles.hero}
      data-sb-object-id={objectId}
      data-sb-field-path={fieldPath}
    >
      <div className="container">
        <h1 className={styles.title} data-sb-field-path={titleField}>{title}</h1>
        <div className={styles.description} data-sb-field-path={descriptionField}>
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
