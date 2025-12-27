import { getAllPosts } from '@/lib/api';
import Link from 'next/link';
import styles from './page.module.css';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className={`container ${styles.blogIndex}`}>
      <h1 className={styles.title}>Blog</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            {post.thumbnail && (
              <div className={styles.thumbnail} style={{ backgroundImage: `url(${post.thumbnail})` }}></div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDate}>{new Date(post.date).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
