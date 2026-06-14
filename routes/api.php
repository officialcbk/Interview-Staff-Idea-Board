<?php

use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IdeaController;
use App\Http\Controllers\Api\UserController;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('ideas', IdeaController::class);
Route::get('/users', [UserController::class, 'index']);