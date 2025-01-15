<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email', 'unique:users,email'],
            'password' => ['required','min:8', 'confirmed'],
        ]);

        User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return Inertia::render('loginSinginPage');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([
                'success' => true,
                'redirect' => route('dashboard')
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Login failed. Please try again.'
        ], 401);
    }

    public function getUserInfo(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user
        return response()->json([
            'full_name' => $user->full_name,
        ]);
    }



}
