import fs from 'fs';
import { readSync } from 'to-vfile';
import { join } from 'path';
import matter from 'gray-matter';
import markdownToHtml from './markdownToHtml';

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
    sort: string;
}

type BlogPostKeys = keyof BlogPost;

export async function getPostBySlug(
    slug: string,
    fields: BlogPostKeys[] = [],
    type: PostDirectory
): Promise<Partial<BlogPost>> {
    const realSlug = slug.replace(/\.md$/, '');
    const postsDirectory = join(process.cwd(), '_posts/' + type);
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = readSync(fullPath);
    const { data } = matter(fileContents.toString());

    const item: Partial<BlogPost> = {};

    // Ensure only the minimal needed data is exposed
    const properties = await Promise.all(
        fields.map(field => {
            if (field === 'slug') {
                return realSlug;
            } else if (field === 'content') {
                return markdownToHtml(fileContents);
            } else if (data[field]) {
                return data[field];
            } else {
                return null;
            }
        })
    );

    properties.forEach((val, index) => {
        item[fields[index]] = val;
    });

    return item;
}

export async function getAllPosts(fields = [], type: PostDirectory = 'blog') {
    const slugs = getPostSlugs(type);
    const posts = (await Promise.all(slugs.map(slug => getPostBySlug(slug, fields, type))))
        // sort posts by date in descending order
        // fallback to sorting by sort number in ascending order
        .sort((post1, post2) =>
            !!post1?.date && !!post2?.date
                ? post1.date > post2.date
                    ? -1
                    : 1
                : !!post1?.sort && post2?.sort
                ? parseInt(post1.sort) > parseInt(post2.sort)
                    ? 1
                    : -1
                : 0
        );
    return posts;
}
