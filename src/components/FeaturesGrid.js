import styles from './FeaturesGrid.module.css';

export default function FeaturesGrid({ title, features, fieldPath }) {
  return (
    <section className={styles.features} data-sb-field-path={fieldPath}>
      <div className="container">
        <h2 className={styles.sectionTitle} data-sb-field-path=".title">{title}</h2>
        <div className={styles.grid} data-sb-field-path=".features">
          {features.map((feature, index) => (
            <div key={index} className={styles.card} data-sb-field-path={`.${index}`}>
              <h3 className={styles.cardTitle} data-sb-field-path=".title">{feature.title}</h3>
              <p className={styles.cardDesc} data-sb-field-path=".description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
