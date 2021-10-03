import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

type PostDirectory = 'blog' | 'resources';

export function getPostSlugs(type: PostDirectory): string[] {
    const postsDirectory = join(process.cwd(), '_posts/' + type);
    return fs.readdirSync(postsDirectory);
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: {
        name: string;
    };
    content: string;
    excerpt: string;
}

type BlogPostKeys = keyof BlogPost;

export function getPostBySlug(
    slug: string,
    fields: BlogPostKeys[] = [],
    type: PostDirectory
): Partial<BlogPost> {
    const realSlug = slug.replace(/\.md$/, '');
    const postsDirectory = join(process.cwd(), '_posts/' + type);
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const item: Partial<BlogPost> = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach(field => {
        if (field === 'slug') {
            item.slug = realSlug;
        }
        if (field === 'content') {
            item.content = content;
        }

        if (data[field]) {
            item[field] = data[field];
        }
    });

    return item;
}

export function getAllPosts(fields = [], type: PostDirectory = 'blog') {
    const slugs = getPostSlugs(type);
    const posts = slugs
        .map(slug => getPostBySlug(slug, fields, type))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1?.date > post2?.date ? -1 : 1));
    return posts;
}
