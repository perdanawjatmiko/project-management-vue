<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Task;

class TaskPolicy
{
    public function view(User $user, Task $task)
    {
        return $user->id === optional($task->project)->owner_id;
    }

    public function update(User $user, Task $task)
    {
        return $user->id === optional($task->project)->owner_id;
    }

    public function delete(User $user, Task $task)
    {
        return $user->id === optional($task->project)->owner_id;
    }

    public function create(User $user, string $projectId)
    {
        return $user->projects()->where('id', $projectId)->exists();
    }
}

