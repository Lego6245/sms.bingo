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
                <article className="w-3/4 mx-auto max-w-none prose lg:prose-xl bg-gray-900 bg-opacity-50 p-5 rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </main>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const post = await getPostBySlug(params.slug, ['title', 'content'], 'resources');

    return {
        props: {
            post: {
                ...post,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts(['slug'], 'resources');
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
