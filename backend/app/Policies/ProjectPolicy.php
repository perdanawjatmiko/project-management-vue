<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function view(User $user, Project $project)
    {
        // return $user->id === $project->owner_id;
        return true;
        // return $user->role === 'staff';
    }

    public function update(User $user, Project $project)
    {
        // return $user->id === $project->owner_id;
        return true;
    }

    public function delete(User $user, Project $project)
    {
        return $user->id === $project->owner_id;
    }
}
