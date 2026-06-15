<?php

namespace App\Services;

use App\Models\Idea;
use App\Models\User;

class VoteService
{
    public function toggle(Idea $idea, User $user): array
    {
        $existingVote = $idea->votes()->where('user_id', $user->id)->first();

        if ($existingVote) {
            $existingVote->delete();
            $voted = false;
        } else {
            $idea->votes()->create(['user_id' => $user->id]);
            $voted = true;
        }

        return [
            'voted' => $voted,
            'vote_count' => $idea->votes()->count(),
        ];
    }
}