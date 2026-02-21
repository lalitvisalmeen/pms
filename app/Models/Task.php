<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = ['name', 
                            'description', 
                            'image_path', 
                            'status', 
                            'priority', 
                            'due_date', 
                            'assigned_user_id', 
                            'created_by', 
                            'updated_by', 
                            'project_id'];
    /**
    * Undocumented function
    *
    * @return BelongsTo
    */
    public function createdBy() : BelongsTo{
        return $this->belongsTo(User::class, 'created_by');
    }

   /**
    * Undocumented function
    *
    * @return BelongsTo
    */
    public function updatedBy() :BelongsTo{
     return $this->belongsTo(User::class, 'updated_by');
   }

   public function project() :BelongsTo{
    return $this->belongsTo(Project::class, 'project_id');
   }

   public function assignedUser() :BelongsTo{
    return $this->belongsTo(User::class, 'assigned_user_id');
   }
}
