import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berhasil Login</h2>}
        >
            <Head title="Dashboard" />

            {/* <div className="py-12">
                <Link href="/posts" className="text-gray-600">Posts</Link>
            </div> */}
        </AuthenticatedLayout>
    );
}
