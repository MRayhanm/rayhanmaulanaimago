import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/react';

export default function Edit({ post }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/posts/${post.id}`, { title, content });
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                <button type="submit">Update</button>
            </form>
            <InertiaLink href="/posts">⬅ Kembali</InertiaLink>
        </div>
    );
}
