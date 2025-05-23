<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        try {
            $projects = $request->user()->projects()->with('owner')->get();

            return response()->json($projects);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load projects'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $project = $request->user()->projects()->create($data);

            return response()->json($project, 201);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Project Store Error: '.$e->getMessage());
            return response()->json(['message' => 'Failed to create project'], 500);
        }
    }

    public function show(Project $project)
    {
        try {
            $this->authorize('view', $project);
            return $project;
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Project Show Error: '.$e->getMessage());
            return response()->json(['message' => 'Failed to fetch project'], 500);
        }
    }

    public function update(Request $request, Project $project)
    {
        try {
            $this->authorize('update', $project);

            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $project->update($data);

            return $project;
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Project Update Error: '.$e->getMessage());
            return response()->json(['message' => 'Failed to update project : ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Project $project)
    {
        try {
            $this->authorize('delete', $project);
            $project->delete();

            return response()->json(['message' => 'Project deleted']);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Project Delete Error: '.$e->getMessage());
            return response()->json(['message' => 'Failed to delete project'], 500);
        }
    }
}

