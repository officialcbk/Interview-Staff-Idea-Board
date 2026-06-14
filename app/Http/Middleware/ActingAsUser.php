<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class ActingAsUser
{
    public function handle(Request $request, Closure $next)
    {
        $userId = $request->header('X-User-Id');

        if ($userId) {
            $user = User::find($userId);
            if ($user) {
                auth()->setUser($user);
            }
        }

        return $next($request);
    }
}