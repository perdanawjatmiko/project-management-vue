<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Task;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CommentController extends Controller
{
    use AuthorizesRequests;

    public function index($taskId)
    {
        try {
            $task = Task::with('comments.user')->findOrFail($taskId);
            $this->authorize('view', $task);

            return response()->json($task->comments);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Comment index error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load comments'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'task_id' => 'required|exists:tasks,id',
                'body' => 'required|string',
            ]);

            $task = Task::findOrFail($data['task_id']);
            $this->authorize('view', $task);

            $comment = Comment::create([
                'task_id' => $data['task_id'],
                'user_id' => $request->user()->id,
                'body' => $data['body'],
            ]);

            return response()->json($comment, 201);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Comment store error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to post comment', 'debug' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Comment $comment)
    {
        try {
            if ($request->user()->id !== $comment->user_id) {
                throw new AuthorizationException();
            }

            $data = $request->validate([
                'body' => 'required|string',
            ]);

            $comment->update($data);
            return response()->json($comment);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Comment update error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update comment'], 500);
        }
    }

    public function destroy(Request $request, Comment $comment)
    {
        try {
            if ($request->user()->id !== $comment->user_id) {
                throw new AuthorizationException();
            }

            $comment->delete();
            return response()->json(['message' => 'Comment deleted']);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (\Throwable $e) {
            Log::error('Comment delete error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete comment'], 500);
        }
    }
}
