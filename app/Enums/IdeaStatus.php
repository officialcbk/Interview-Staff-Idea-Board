<?php

namespace App\Enums;

enum IdeaStatus: string
{
    case UnderReview = 'under_review';
    case Planned = 'planned';
    case Implemented = 'implemented';
    case Declined = 'declined';

    public function label(): string
    {
        return match($this) {
            IdeaStatus::UnderReview => 'Under Review',
            IdeaStatus::Planned => 'Planned',
            IdeaStatus::Implemented => 'Implemented',
            IdeaStatus::Declined => 'Declined',
        };
    }
}