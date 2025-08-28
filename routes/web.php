<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FeedbackController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
// Route::post('/feedback', [FeedbackController::class, 'store']);
// Route::get('/feedback', [FeedbackController::class, 'index']);
Route::get('/', function () {
    return redirect()->route('login');
});
// Halaman utama
Route::get('/', function () {
    return Inertia::render('Welcome', 
    [
        // 'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]
);
});

// Dashboard (hanya untuk user login & verified)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Group route dengan middleware auth
Route::middleware(['auth', 'verified'])->group(function () {
    // CRUD Post
    Route::resource('posts', PostController::class);
});

Route::middleware(['auth'])->group(function () {
    // Menampilkan daftar posts
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

    // Form tambah post
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

    // Simpan post baru
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    // Form edit
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');

    // Update data
    Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');

    // Hapus data
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
});

    Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
