<?php

namespace Database\Seeders;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Seeder;

class IdeaSeeder extends Seeder
{
    public function run(): void
    {
        $alice = User::where('email', 'alice@example.com')->firstOrFail();
        $bob = User::where('email', 'bob@example.com')->firstOrFail();

        Idea::firstOrCreate(
            ['title' => 'Improve member onboarding process'],
            [
                'user_id' => $alice->id,
                'body' => 'We should streamline the onboarding process by creating a digital checklist for new members so nothing gets missed during account setup.',
                'status' => 'under_review',
            ],
        );

        Idea::firstOrCreate(
            ['title' => 'Add a mobile app notification system'],
            [
                'user_id' => $bob->id,
                'body' => 'Members frequently miss important alerts. A push notification system in the mobile app would improve engagement and reduce missed payments.',
                'status' => 'planned',
            ],
        );

        Idea::firstOrCreate(
            ['title' => 'Saturday branch hours extension'],
            [
                'user_id' => $alice->id,
                'body' => 'Many members work weekdays and struggle to visit during regular hours. Extending Saturday hours to 5pm would significantly improve accessibility.',
                'status' => 'under_review',
            ],
        );
    }
}
