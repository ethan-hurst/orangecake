import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPageContent(pageName) {
  const relativePath = `content/pages/${pageName}.json`;
  const fullPath = path.join(contentDirectory, `pages/${pageName}.json`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const content = JSON.parse(fileContents);
  return { ...content, _id: relativePath };
}

export function getSettings() {
  const fullPath = path.join(contentDirectory, 'settings/global.json');
  if (!fs.existsSync(fullPath)) return {};
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllPosts() {
  const postsDirectory = path.join(contentDirectory, 'posts');
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      content,
      ...data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug) {
  // slug might contain date prefix from CMS, we need to find the file
  // or we assume the file name matches. 
  // Decap CMS slug config: "{{year}}-{{month}}-{{day}}-{{slug}}"
  const postsDirectory = path.join(contentDirectory, 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const matchedFile = fileNames.find(file => file.replace(/\.md$/, '') === slug);

  if (!matchedFile) return null;

  const fullPath = path.join(postsDirectory, matchedFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}
