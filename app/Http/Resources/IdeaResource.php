<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class IdeaResource extends JsonResource
{
     
    public static $wrap = null;
    
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'vote_count' => 0,
            'comment_count' => 0,
            'author' => $this->user->name,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
