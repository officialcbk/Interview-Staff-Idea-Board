<?php

use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IdeaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VoteController;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('ideas', IdeaController::class);
Route::apiResource('users', UserController::class);
Route::post('/ideas/{idea}/vote', [VoteController::class, 'toggle']);