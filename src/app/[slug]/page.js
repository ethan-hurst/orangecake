import { getPageContent } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

export default async function Page({ params }) {
  const { slug } = await params;
  const content = getPageContent(slug);

  if (!content) {
    return notFound();
  }

  const { title, body } = content;

  return (
    <div className={`container ${styles.pageContent}`}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.prose}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'about' }];
}
