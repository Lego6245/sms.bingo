import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs(): string[] {
    return fs.readdirSync(postsDirectory);
}

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: {
        name: string;
    };
    content: string;
}

type BlogPostKeys = keyof BlogPost;

export function getPostBySlug(slug: string, fields: BlogPostKeys[] = []): Partial<BlogPost> {
    const realSlug = slug.replace(/\.md$/, '');
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

export function getAllPosts(fields = []) {
    const slugs = getPostSlugs();
    const posts = slugs
        .map(slug => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1?.date > post2?.date ? -1 : 1));
    return posts;
}
