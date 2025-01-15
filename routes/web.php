<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [Controller::class, 'home'])->name('home');

Route::get('/dashboard', [Controller::class, 'dashboard'])
        ->name('dashboard')
        ->middleware('auth');

Route::post('/signup', [UserController::class, 'signup'])->name('signup');

Route::post('/login', [UserController::class, 'login'])->name('login');

Route::get('/getUser', [UserController::class, 'getUserInfo'])->name('getUser');

Route::get('/templates', [TypeController::class, 'fetchTemplates'])->name('templates');

Route::resource('/editor', EditorController::class);

//
