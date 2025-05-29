<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'description', 'owner_id', 'difficulty', 'start_date', 'end_date'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');    
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
