<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Idea;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Idea $idea)
    {
        return CommentResource::collection($idea->comments()->with('user')->latest()->get());
    }

    public function store(StoreCommentRequest $request, Idea $idea)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'No active user selected.'], 401);
        }

        $comment = $idea->comments()->create([
            'user_id' => $user->id,
            'body' => $request->validated()['body'],
        ]);

        return new CommentResource($comment->load('user'));
    }
}