<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('project_id');
            $table->string('subject');
            $table->text('description')->nullable();
            $table->enum('status', ['backlog', 'todo', 'doing', 'done', 'tested', 'completed'])->default('backlog');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('low');
            $table->uuid('assigned_to')->nullable();
            $table->uuid('parent_id')->nullable(); // self-reference
            $table->integer('order')->default(0);
            $table->integer('percentage')->default(0);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('assigned_to')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
