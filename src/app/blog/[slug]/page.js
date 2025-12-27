import { getPostBySlug, getAllPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className={`container ${styles.postContainer}`}>
      <header className={styles.postHeader}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <time className={styles.postDate}>{new Date(post.date).toLocaleDateString()}</time>
      </header>
      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} className={styles.postImage} />
      )}
      <div className={styles.prose}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
