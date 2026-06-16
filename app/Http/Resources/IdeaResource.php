<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IdeaResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $userId = $request->header('X-User-Id');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'vote_count' => $this->votes_count ?? $this->votes()->count(),
            'has_voted' => $userId
                ? $this->votes->contains('user_id', (int) $userId)
                : false,
            'comment_count' => $this->comments_count ?? $this->comments()->count(),
            'author' => $this->user->name,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}