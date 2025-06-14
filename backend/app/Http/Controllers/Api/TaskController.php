<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Exception;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        try {
            // $tasks = Task::whereHas('project', function ($query) use ($request) {
            //     $query->where('owner_id', $request->user()->id);
            // })->with(['project', 'parent', 'assigned'])->paginate(5);
            $tasks = Task::where('assigned_to', $request->user()->id)->with(['project', 'parent', 'assigned'])->paginate(5);

            if($tasks->count() == 0) {
                return response()->json([
                'message' => 'succes',
                'status' => 204,
                'total' => $tasks->total(),
                'data' => $tasks
            ], 200);
            }
            return response()->json([
                'message' => 'succes',
                'status' => 200,
                'total' => $tasks->count(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'data' => $tasks->items()
            ], 200);
        } catch (Exception $e) {
            Log::error('Task index error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'project_id' => 'required|exists:projects,id',
                'subject' => 'required|string',
                'description' => 'nullable|string',
                'status' => 'required',
                'priority' => 'in:low,medium,high,urgent',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date',
                'order' => 'nullable|integer|min:0|max:100',
                'assigned_to' => 'nullable|exists:users,id',
                'percentage' => 'integer'
            ]);

            $this->authorize('create', [Task::class, $data['project_id']]);
            if($data['percentage'] === 100) {
                $data['status'] = 'done';
            }

            $task = Task::create($data);

            return response()->json([
                'message' => 'success',
                'status' => 201,
                'data' => $task
            ], 201);
            
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'Unauthorized access',
                'error' => $e->getMessage()
            ], 403);
        } catch (Exception $e) {
            Log::error('Task store error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Task $task)
    {
        try {
            $this->authorize('view', $task);
            $task->load(['assigned', 'project']);
            return response()->json([
                'message' => 'success',
                'status' => 200,
                'data' => $task
            ], 200);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'Unauthorized access',
                'error' => $e->getMessage()
            ], 403);
        } catch (Exception $e) {
            Log::error('Task show error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Task $task)
    {
        try {
            $this->authorize('update', $task);

            $data = $request->validate([
                'project_id' => 'required|exists:projects,id',
                'subject' => 'required|string',
                'description' => 'nullable|string',
                'status' => 'required',
                'priority' => 'in:low,medium,high,urgent',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date',
                'order' => 'nullable|integer|min:0|max:100',
                'assigned_to' => 'nullable|exists:users,id',
                'percentage' => 'integer'
            ]);
            if($data['percentage'] === 100) {
                $data['status'] = 'done';
            }

            $task->update($data);

            return response()->json([
                'message' => 'success',
                'status' => 201,
                'data' => $task
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'Unauthorized access',
                'error' => $e->getMessage()
            ], 403);
        } catch (Exception $e) {
            Log::error('Task update error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Task $task)
    {
        try {
            $this->authorize('delete', $task);
            $task->delete();

            return response()->json([
                'message' => 'Task deleted'
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'Unauthorized access',
                'error' => $e->getMessage()
            ], 403);
        } catch (Exception $e) {
            Log::error('Task delete error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
 