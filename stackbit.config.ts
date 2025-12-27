import { defineStackbitConfig, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    nodeVersion: '18',

    // Content source configuration
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'],
            models: [
                // Page Models
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

                // Data Models
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

                // Object Models (for nested content)
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

    // Site map for Visual Editor navigation
    siteMap: ({ documents, models }): SiteMapEntry[] => {
        const pageModels = models.filter(m => m.type === 'page');

        return documents
            .filter(doc => pageModels.some(m => m.name === doc.modelName))
            .map(doc => {
                let urlPath = '/';

                if (doc.modelName === 'about') {
                    urlPath = '/about';
                } else if (doc.modelName === 'post') {
                    const slug = doc.id.replace('content/posts/', '').replace('.md', '');
                    urlPath = `/blog/${slug}`;
                }

                return {
                    stableId: doc.id,
                    urlPath,
                    document: doc,
                    isHomePage: doc.modelName === 'home'
                };
            });
    }
});
