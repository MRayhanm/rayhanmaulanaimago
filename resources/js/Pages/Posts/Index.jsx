import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Index({ auth, posts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Posts" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Daftar Post</h1>
                <div className="py-12">
                    <Link href="/dashboard" className="text-gray-600">Dashboard</Link>
                </div>
                <Link href="/posts/create" className="text-blue-600">+ Tambah Post</Link>
                <ul className="mt-4">
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
