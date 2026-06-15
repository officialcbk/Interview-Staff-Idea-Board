<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'alice@example.com'],
            [
                'name' => 'Alice Staff',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
        );

        User::updateOrCreate(
            ['email' => 'bob@example.com'],
            [
                'name' => 'Bob Staff',
                'password' => Hash::make('password'),
                'role' => 'staff',
            ],
        );

        User::updateOrCreate(
            ['email' => 'carol@example.com'],
            [
                'name' => 'Carol Leadership',
                'password' => Hash::make('password'),
                'role' => 'leadership',
            ],
        );
    }
}
