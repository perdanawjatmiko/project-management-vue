<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Project;
use App\Models\Task;

class DashboardController extends Controller
{
    public function projectCount(Request $request) {
        try {
            $query = Project::where('owner_id', $request->user()->id)->get();

            $projects = $query->count();

            return response()->json([
                'message' => 'success',
                'status' => $query->isEmpty() ? 204 : 200,
                'total' => $projects,
            ], 200);
        } catch (AuthorizationException $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Unauthorized', 'status' => 403], 403);
        } catch (\Throwable $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load projects'], 500);
        }
    }

    public function taskCount(Request $request) {
        try {
            $query = Task::where('assigned_to', $request->user()->id)->get();

            $tasks = $query->count();

            return response()->json([
                'message' => 'success',
                'status' => $query->isEmpty() ? 204 : 200,
                'total' => $tasks,
            ], 200);
        } catch (AuthorizationException $e) {
            Log::error('Tasks Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Unauthorized', 'status' => 403], 403);
        } catch (\Throwable $e) {
            Log::error('Tasks Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load tasks'], 500);
        }
    }
}
