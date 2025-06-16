<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::OrderBy('name', 'desc')->get(['id', 'name', 'role', 'email', 'avatar', 'last_login']);

            if($users->count() == 0) {
                return response()->json([
                'message' => 'succes',
                'status' => 204,
                'total' => $users->count(),
                'data' => $users
            ], 200);
            }
            return response()->json([
                'message' => 'succes',
                'status' => 200,
                'total' => $users->count(),
                'data' => $users
            ], 200);
        } catch (Exception $e) {
            Log::error('Task index error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'role' => 'required|string',
                'avatar' => 'nullable|image|max:4096',
            ]);
            $data['password'] = Hash::make($data['password']);

            // handle avatar jika ada
            if ($request->hasFile('avatar')) {
                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $data['avatar'] = $avatarPath;
            }

            $user = User::create($data);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user
            ], 201);

        } catch (\Throwable $e) {
            Log::error('User store Error : '.$e->getMessage());
            return response()->json([
                'status' => 502,
                'message' => 'Failed Create User.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    
    public function update(Request $request, User $user)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:6',
                'role' => 'required|string',
                'avatar' => 'nullable|image|max:4096',
            ]);

            if (!empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }

            if ($request->hasFile('avatar')) {
                if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                    Storage::disk('public')->delete($user->avatar);
                }

                $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            $user->update($data);

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 422,
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error('User update Error: ' . $e->getMessage());
            return response()->json([
                'status' => 502,
                'message' => 'Failed to update user.'
            ], 502);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
