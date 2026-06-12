<?php

use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IdeaController;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('ideas', IdeaController::class);
