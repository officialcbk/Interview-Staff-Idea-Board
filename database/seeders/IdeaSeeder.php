<?php

namespace Database\Seeders;

use App\Models\Idea;
use Illuminate\Database\Seeder;

class IdeaSeeder extends Seeder
{
    public function run(): void
    {
        Idea::create([
            'user_id' => 1,
            'title' => 'Improve member onboarding process',
            'body' => 'We should streamline the onboarding process by creating a digital checklist for new members so nothing gets missed during account setup.',
            'status' => 'under_review',
        ]);

        Idea::create([
            'user_id' => 2,
            'title' => 'Add a mobile app notification system',
            'body' => 'Members frequently miss important alerts. A push notification system in the mobile app would improve engagement and reduce missed payments.',
            'status' => 'planned',
        ]);

        Idea::create([
            'user_id' => 1,
            'title' => 'Saturday branch hours extension',
            'body' => 'Many members work weekdays and struggle to visit during regular hours. Extending Saturday hours to 4pm would significantly improve accessibility.',
            'status' => 'under_review',
        ]);
    }
}