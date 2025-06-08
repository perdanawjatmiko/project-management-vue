<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //Dashboard
    Route::get('/dashboard/projects', [DashboardController::class, 'projectCount']);
    Route::get('/dashboard/tasks', [DashboardController::class, 'taskCount']);

    //Project Resources
    Route::apiResource('/projects', ProjectController::class);
    Route::get('/select/projects', [ProjectController::class, 'select']);

    //Task Resource
    Route::apiResource('/tasks', TaskController::class);

    //Comment Resource
    Route::get('/tasks/{task}/comments', [CommentController::class, 'index']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

    //Users Resource
    Route::apiResource('/users', UserController::class);
});