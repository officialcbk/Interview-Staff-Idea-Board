<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Alice Staff',
            'email' => 'alice@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        User::create([
            'name' => 'Bob Staff',
            'email' => 'bob@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        User::create([
            'name' => 'Carol Leadership',
            'email' => 'carol@example.com',
            'password' => Hash::make('password'),
            'role' => 'leadership',
        ]);
    }
}