<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Middleware
use App\Http\Middleware\GuestMiddleware;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;

// Controllers
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\UserSettingsController;

/*
|--------------------------------------------------------------------------
| Throttled Routes (20 requests per minute per IP)
|--------------------------------------------------------------------------
*/

Route::middleware('throttle:20,1')->group(function () {

  /*
    |------------------------------------------
    | Public Pages
    |------------------------------------------
    */
  Route::get('/', [HomeController::class, 'index'])->name('home');
  Route::get('/download-resume', [HomeController::class, 'downloadResume'])->name('download.resume');

  /*
    |------------------------------------------
    | Authentication - Login/Logout
    |------------------------------------------
    */
  Route::get('/login', [LoginController::class, 'showLoginForm'])->name('auth.login');
  Route::get('/logout', [LoginController::class, 'logout'])->name('auth.logout');

  /*
    |------------------------------------------
    | Google OAuth
    |------------------------------------------
    */
  Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
  Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

  /*
    |------------------------------------------
    | Registration
    |------------------------------------------
    */
  Route::get('/register', [RegisterController::class, 'index'])
    ->middleware(GuestMiddleware::class)
    ->name('auth.register');

  /*
    |------------------------------------------
    | Admin Routes
    |------------------------------------------
    */
  Route::middleware([AdminMiddleware::class])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::put('/admin/settings/profile', [SettingsController::class, 'updateProfile'])->name('admin.settings.updateProfile');
    Route::put('/admin/settings/password', [SettingsController::class, 'updatePassword'])->name('admin.settings.updatePassword');
  });

  /*
    |------------------------------------------
    | User Routes
    |------------------------------------------
    */
  Route::middleware([UserMiddleware::class])->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::post('/dashboard/generate-resume', [UserDashboardController::class, 'generateResume'])->name('generate.resume');
    Route::post('/dashboard/download-resume', [UserDashboardController::class, 'downloadOptimizedResume'])->name('download.resume');

    Route::get('/user/settings', [UserSettingsController::class, 'index'])->name('user.settings');
    Route::put('/user/settings/profile', [UserSettingsController::class, 'updateProfile'])->name('user.settings.updateProfile');
    Route::put('/user/settings/password', [UserSettingsController::class, 'updatePassword'])->name('user.settings.updatePassword');
  });

  // Add this line in the public pages section
  Route::get('/api/visitor-stats', [HomeController::class, 'getVisitorStats'])->name('visitor.stats');
});
