<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\IdeaResource;
use App\Models\Idea;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function index()
    {
        $ideas = Idea::with('user', 'votes', 'comments')->withCount('votes')->orderByDesc('votes_count')->get();
        return IdeaResource::collection($ideas);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Idea $idea)
    {
        $idea->load('user', 'votes', 'comments');
        return new IdeaResource($idea);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
