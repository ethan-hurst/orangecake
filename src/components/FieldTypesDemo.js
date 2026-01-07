import ReactMarkdown from 'react-markdown';
import styles from './FieldTypesDemo.module.css';

export default function FieldTypesDemo(props) {
    const {
        title,
        short_text,
        long_text,
        markdown_content,
        number_count,
        is_active,
        theme_color,
        bg_color,
        event_date,
        event_time,
        main_image,
        tags,
        fieldPath
    } = props;

    return (
        <section className={styles.container} data-sb-field-path={fieldPath}>
            <h2 data-sb-field-path=".title">{title}</h2>

            <div className={styles.grid}>
                {/* Basic Types */}
                <div className={styles.card}>
                    <h3>Basic Text</h3>
                    <p><strong>Short Text:</strong> <span data-sb-field-path=".short_text">{short_text}</span></p>
                    <div className={styles.multiline}>
                        <strong>Long Text:</strong>
                        <p data-sb-field-path=".long_text">{long_text}</p>
                    </div>
                    <div className={styles.markdown} data-sb-field-path=".markdown_content">
                        <ReactMarkdown>{markdown_content}</ReactMarkdown>
                    </div>
                </div>

                {/* Numbers & Logic */}
                <div className={styles.card}>
                    <h3>Numbers & Logic</h3>
                    <p><strong>Count:</strong> <span data-sb-field-path=".number_count">{number_count}</span></p>
                    <p><strong>Active:</strong> <span data-sb-field-path=".is_active">{is_active ? 'Yes' : 'No'}</span></p>
                </div>

                {/* Selectors & Colors */}
                <div className={styles.card} style={{ backgroundColor: bg_color || 'transparent' }}>
                    <h3>Visuals</h3>
                    <p><strong>Theme:</strong> <span data-sb-field-path=".theme_color">{theme_color}</span></p>
                    <p><strong>Background color applied to this card.</strong></p>
                </div>

                {/* Dates */}
                <div className={styles.card}>
                    <h3>Dates</h3>
                    <p><strong>Date:</strong> <span data-sb-field-path=".event_date">{event_date}</span></p>
                    <p><strong>Time:</strong> <span data-sb-field-path=".event_time">{event_time}</span></p>
                </div>

                {/* Media */}
                {main_image && (
                    <div className={styles.card}>
                        <h3>Media</h3>
                        <img
                            src={main_image}
                            alt="Demo"
                            className={styles.image}
                            data-sb-field-path=".main_image"
                        />
                    </div>
                )}

                {/* Lists */}
                <div className={styles.card}>
                    <h3>Tags</h3>
                    {tags && tags.length > 0 ? (
                        <ul className={styles.tags} data-sb-field-path=".tags">
                            {tags.map((tag, index) => (
                                <li key={index} className={styles.tag} data-sb-field-path={`.${index}`}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tags</p>
                    )}
                </div>
            </div>
        </section>
    );
}
