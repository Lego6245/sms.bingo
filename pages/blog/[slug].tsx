import { getPostBySlug, getAllPosts } from '../../scripts/loadMarkdown';
import markdownToHtml from '../../scripts/markdownToHtml';
import React from 'react';
import Header from '../../components/Header';

export default function Post({ post }) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header title={'Super Mario Sunshine Bingo League - Match Info'} />
            <main className="text-white flex flex-col">
                <div className="flex mx-auto mb-5 flex-row items-baseline text-3xl">
                    {post.title}
                </div>
                <div className="flex mx-auto flex-row items-baseline text-xl mb-5">{`By: ${post.author.name}`}</div>
                <article className="w-3/4 mx-auto max-w-none prose lg:prose-xl bg-gray-900 bg-opacity-50 p-5 rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </main>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content'], 'blog');
    const content = await markdownToHtml(post.content || '');

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug']);
    return {
        paths: posts.map(post => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
