<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/', [CatalogController::class, 'create'])->name('catalog');
Route::get('api/catalog', [CatalogController::class, 'index']);

Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('/cars', action: [CarController::class, 'index'])->name('cars');
Route::resource('/api/cars', CarController::class);
});

Route::middleware('auth')->group(function () {

    Route::get('/my-orders', [OrderController::class, 'index'])->middleware('auth')->name('orders');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
