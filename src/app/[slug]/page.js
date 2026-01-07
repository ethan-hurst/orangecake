import { getPageContent } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import FieldTypesDemo from '@/components/FieldTypesDemo';

export default async function Page({ params }) {
  const { slug } = await params;
  const content = getPageContent(slug);

  if (!content) {
    return notFound();
  }

  const { title, body, sections } = content;

  return (
    <div className={`container ${styles.pageContent}`}>
      {!sections && <h1 className={styles.pageTitle}>{title}</h1>}
      {body && (
        <div className={styles.prose}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      )}
      {sections?.map((section, index) => {
        if (section.type === 'hero') {
          return (
            <Hero
              key={index}
              title={section.title}
              description={section.description}
              fieldPath={`sections.${index}`}
            />
          );
        }
        if (section.type === 'features_grid') {
          return (
            <FeaturesGrid
              key={index}
              title={section.title}
              features={section.features}
              fieldPath={`sections.${index}`}
            />
          );
        }
        if (section.type === 'field_types_demo') {
          return (
            <FieldTypesDemo
              key={index}
              {...section}
              fieldPath={`sections.${index}`}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const pagesDirectory = path.join(process.cwd(), 'content/pages');
  const filenames = fs.readdirSync(pagesDirectory);

  return filenames
    .filter((filename) => filename.endsWith('.json') && filename !== 'home.json')
    .map((filename) => ({
      slug: filename.replace(/\.json$/, ''),
    }));
}
