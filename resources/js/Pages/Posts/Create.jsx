import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/posts');
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Tambah Post</h1>
            <form onSubmit={submit} className="mt-4">
                <div>
                    <label>Judul</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                </div>
                <div className="mt-4">
                    <label>Konten</label>
                    <textarea
                        value={data.content}
                        onChange={e => setData('content', e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.content && <div className="text-red-500">{errors.content}</div>}
                </div>
                <button type="submit" disabled={processing} className="mt-4 bg-blue-600 text-white px-4 py-2">
                    Simpan
                </button>
            </form>
            <Link href="/posts" className="text-gray-600">Kembali</Link>
        </div>
    );
}
