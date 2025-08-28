import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
export default function Dashboard({ auth }) {
    const [form, setForm] = useState({ name: '', email: '', comments: '' });
    const [feedbacks, setFeedbacks] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('/api/feedback')
            .then(res => res.json())
            .then(data => setFeedbacks(data));
    }, []);

    // Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Validasi sederhana client side
    const validate = () => {
        let tempErrors = {};
        if (!form.name) tempErrors.name = "Nama wajib diisi";
        if (!form.email.includes('@')) tempErrors.email = "Email tidak valid";
        if (form.comments.length < 5) tempErrors.comments = "Komentar minimal 5 karakter";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                setForm({ name: '', email: '', comments: '' });
                // refresh feedback
                return fetch('/api/feedback')
                    .then(res => res.json())
                    .then(data => setFeedbacks(data));
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            placeholder="Nama" className="border rounded p-2 w-full" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                            placeholder="Email" className="border rounded p-2 w-full" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <textarea name="comments" value={form.comments} onChange={handleChange}
                            placeholder="Komentar" className="border rounded p-2 w-full"></textarea>
                        {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Kirim Feedback
                    </button>
                </form>

                <h2 className="text-xl font-bold mt-8">Daftar Feedback</h2>
                <ul className="mt-4 space-y-2">
                    {feedbacks.map(f => (
                        <li key={f.id} className="border p-3 rounded">
                            <p className="font-semibold">{f.name} ({f.email})</p>
                            <p>{f.comments}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}