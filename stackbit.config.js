import { GitContentSource } from '@stackbit/cms-git';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    contentSources: [
        new GitContentSource({
            repoUrl: 'https://github.com/ethan-hurst/orangecake',
            branch: 'main',
            rootPath: __dirname,
            contentDirs: ['content'],
            models: [
                {
                    name: 'home',
                    type: 'page',
                    urlPath: '/',
                    filePath: 'content/pages/home.json',
                    fields: [
                        { name: 'title', type: 'string', label: 'Title', required: true },
                        { name: 'hero_title', type: 'string', label: 'Hero Title' },
                        { name: 'hero_description', type: 'markdown', label: 'Hero Description' },
                        {
                            name: 'sections',
                            type: 'list',
                            label: 'Sections',
                            items: { type: 'model', models: ['features_grid'] }
                        }
                    ]
                },
                {
                    name: 'about',
                    type: 'page',
                    urlPath: '/about',
                    filePath: 'content/pages/about.json',
                    fields: [
                        { name: 'title', type: 'string', label: 'Title', required: true },
                        { name: 'body', type: 'markdown', label: 'Body' }
                    ]
                },
                {
                    name: 'post',
                    type: 'page',
                    urlPath: '/blog/{slug}',
                    filePath: 'content/posts/{slug}.md',
                    fields: [
                        { name: 'title', type: 'string', label: 'Title', required: true },
                        { name: 'date', type: 'datetime', label: 'Publish Date' },
                        { name: 'body', type: 'markdown', label: 'Body' },
                        { name: 'thumbnail', type: 'image', label: 'Featured Image' }
                    ]
                },
                {
                    name: 'settings',
                    type: 'data',
                    filePath: 'content/settings/global.json',
                    fields: [
                        { name: 'site_title', type: 'string', label: 'Site Title' },
                        { name: 'footer_text', type: 'string', label: 'Footer Text' },
                        {
                            name: 'nav_items',
                            type: 'list',
                            label: 'Navigation Items',
                            items: {
                                type: 'object',
                                fields: [
                                    { name: 'label', type: 'string', label: 'Label' },
                                    { name: 'path', type: 'string', label: 'Path' }
                                ]
                            }
                        }
                    ]
                },
                {
                    name: 'features_grid',
                    type: 'object',
                    label: 'Features Grid',
                    fields: [
                        { name: 'title', type: 'string', label: 'Title' },
                        {
                            name: 'features',
                            type: 'list',
                            label: 'Features',
                            items: {
                                type: 'object',
                                fields: [
                                    { name: 'title', type: 'string', label: 'Title' },
                                    { name: 'description', type: 'string', label: 'Description' },
                                    { name: 'icon', type: 'image', label: 'Icon' }
                                ]
                            }
                        }
                    ]
                }
            ],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images/uploads',
                publicPath: '/'
            }
        })
    ],
    siteMap: ({ documents, models }) => {
        const pageModels = models.filter(m => m.type === 'page').map(m => m.name);
        return documents
            .filter(doc => pageModels.includes(doc.modelName))
            .map(doc => {
                switch (doc.modelName) {
                    case 'home':
                        return { urlPath: '/', document: doc, isHomePage: true };
                    case 'about':
                        return { urlPath: '/about', document: doc };
                    case 'post':
                        const slug = doc.id.replace('content/posts/', '').replace('.md', '');
                        return { urlPath: `/blog/${slug}`, document: doc };
                    default:
                        return null;
                }
            })
            .filter(Boolean);
    }
};
