<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/register', function () {
    return view('register');
});
Route::get('/', function () {
    return view('login');
});
Route::post('/login', [AuthController::class, 'login']);

Route::get('/login', [AuthController::class, 'index'])->name("login");

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name("dashboard");
    Route::get('/logout', [AuthController::class, 'logout'])->name("logout");
});
