<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        try {
            $query = Project::with('owner', 'tasks')->orderBy('created_at', 'desc');

            // Cek apakah ada query string user
            if ($request->has('user') && $request->user != '') {
                $query->where('owner_id', $request->user);
            }

            $projects = $query->paginate(10);

            return response()->json([
                'message' => 'success',
                'status' => $projects->isEmpty() ? 204 : 200,
                'total' => $projects->total(),
                'per_page' => $projects->perPage(),
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'data' => $projects->items()
            ], 200);
        } catch (AuthorizationException $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Unauthorized', 'status' => 403], 403);
        } catch (\Throwable $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load projects'], 500);
        }
    }

    public function select(Request $request)
    {
        try {
            if($request->user()->role !== 'admin') {
                $projects = Project::select('id', 'name')->where('owner_id', $request->user()->id)->orderBy('name')->get();
            } else {
                $projects = Project::select('id', 'name')->orderBy('name')->get();
            }

            return response()->json([
                'message' => 'success',
                'status' => 200,
                'data' => $projects
            ]);
        } catch (\Throwable $e) {
            Log::error('Project Select Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch project list'], 500);
        }
    }

    public function tasks(Project $project) {
        try {
            $query = Task::where('project_id', $project->id)->with(['assigned'])->orderBy('created_at', 'desc');

            $tasks = $query->paginate(5);

            return response()->json([
                'message' => 'success',
                'status' => $tasks->isEmpty() ? 204 : 200,
                'total' => $tasks->total(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'data' => $tasks->items()
            ], 200);
        } catch (AuthorizationException $e) {
            Log::error('Project Index Error: ' . $e->getMessage());
            return response()->json(['message' => 'Unauthorized', 'status' => 403], 403);
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
                'owner_id' => 'string',
                'difficulty' => 'integer|min:1|max:5',
                'start_date' => 'date|nullable',
                'end_date' => 'date|nullable'
            ]);

            if (!isset($data['owner_id'])) {
                $data['owner_id'] = $request->user()->id;
            }

            $project = Project::create($data);

            return response()->json([
                'message' => 'success',
                'status' => 201,
                'data' => $project
            ], 201);
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
            $data = Project::with(['owner', 'tasks'])->findOrFail($project->id);
            return response()->json([
                'message' => 'success',
                'status' => 200,
                'data' => $data
            ], 200);
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
                'owner_id' => 'string',
                'difficulty' => 'integer|min:1|max:5',
                'start_date' => 'date|nullable',
                'end_date' => 'date|nullable'
            ]);

            $project->update($data);

            return response()->json([
                'message' => 'success',
                'status' => 200,
                'data' => $project
            ], 200);
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

