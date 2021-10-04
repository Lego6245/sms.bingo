import { getAllPosts, BlogPost } from '../../scripts/loadMarkdown';
import Header from '../../components/Header';
import React from 'react';
import Link from 'next/link';

export default function BlogIndex(props: { posts: Partial<BlogPost>[] }) {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto">
            <Header title={'Super Mario Sunshine Bingo League - Match Info'} />
            <main className="text-white flex flex-row">
                {props.posts.map(post => {
                    return (
                        <Link href={'/blog/' + post.slug}>
                            <div
                                className="flex flex-col justify-between cursor-pointer w-80 text-center m-10 p-4 hover:bg-gray-900 border-gray-900 border-solid border-4 rounded-md bg-gray-800 bg-opacity-75"
                                key={post.slug}>
                                <div className="text-2xl mb-4">{post.title}</div>
                                <div className="text-xl mb-4">{`By: ${post.author.name}`}</div>
                                <div className="text-l mb-4">{post.excerpt}</div>
                                <div className="text-xs">
                                    {new Date(post.date).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </main>
        </div>
    );
}

export async function getStaticProps() {
    const posts = await getAllPosts(['title', 'excerpt', 'date', 'slug', 'author'], 'blog');
    return {
        props: {
            posts,
        },
    };
}
