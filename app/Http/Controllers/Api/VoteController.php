<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Services\VoteService;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function __construct(private VoteService $voteService) {}

    public function toggle(Request $request, Idea $idea)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'No active user selected.'], 401);
        }

        $result = $this->voteService->toggle($idea, $user);

        return response()->json($result);
    }
}