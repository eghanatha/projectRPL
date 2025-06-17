<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function index(){
        if(Auth::check()){
            return redirect()->route("dashboard");
        }
        return view("login");
    }

    public function login(Request $request)
    {
        $data = [
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ];

        auth::attempt($data, true);

        if (!Auth::check()) 
        {
            return [
                'status' => 300,
                'massage' => 'Username atau password anda salah silakan coba lagi',
            ];
        }

        return redirect()->route("dashboard");
    }

    public function logout(){
        Auth::logout();
        return redirect()->route("login");
    }
}
