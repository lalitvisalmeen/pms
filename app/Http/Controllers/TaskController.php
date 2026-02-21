<?php

namespace App\Http\Controllers;

use App\Helpers\CommonTasksHelper;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the sorting fields and direction
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Task::query();
        // Filter the records based on the name 
        if(request('name')){
            $query->where('name','like', '%'. request('name'). '%');
        }
        // Filter the records based on the status
        if(request('status')){
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        $locale = app()->getLocale(); // get current locale
        $path = resource_path("lang/{$locale}/task.json");
        //get the translations from the json file.
        $translations = Arr::dot(json_decode(file_get_contents($path), true));
       // dd($projects->toArray());
        return inertia("task/index", [
            'tasks' => TaskResource::collection($tasks),
            'translations' => $translations,
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::query()->orderBy('name', 'asc')->get();
        $projects = Project::query()->orderBy('name', 'asc')->get();
        return inertia("task/create", [
            "translations" => CommonTasksHelper::getTranslations('task'),
            "users" => UserResource::collection($users),
            "projects" => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
       /** @var  \Illuminate\Http\UploadedFile|null $image */
       $image = $data['image'] ?? null;
       $data['created_by'] = Auth::id();
       $data['updated_by'] = Auth::id();
       if($image){
        $data['image_path'] = $image->store('task/'.Str::random(), 'public');
       }

       Task::create($data);
       return to_route('task.index') ->with(['success' => "New task created successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
      return inertia('task/show', [
            'task' => new TaskResource($task),
            "translations" => CommonTasksHelper::getTranslations('task')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
    $users = User::query()->orderBy('name', 'asc')->get();
        $projects = Project::query()->orderBy('name', 'asc')->get();
    
    return inertia('task/edit', ['task' => new TaskResource($task),
        "projects" => ProjectResource::collection($projects),
        "users" => UserResource::collection($users),
        'translations' => CommonTasksHelper::getTranslations('task')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
       $image = $data['image'] ?? null;
       
       $data['updated_by'] = Auth::id();
       if($image){
            if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/'.Str::random(),'public');
       }
       
       $task->update($data);
       return to_route('task.index')->with(['success' => "Task \"$task->name\" has been updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
       
        if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
        $task->delete();
        return to_route('task.index')->with(['success' => "Task has been deleted successfully"]);
    }

    public function myTasks(){
        $user = Auth::user();
        // Get the sorting fields and direction
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Task::query()->where('assigned_user_id', $user->id);
        // Filter the records based on the name 
        if(request('name')){
            $query->where('name','like', '%'. request('name'). '%');
        }
        // Filter the records based on the status
        if(request('status')){
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
       // dd($projects->toArray());
        return inertia("task/index", [
            'tasks' => TaskResource::collection($tasks),
            'translations' => CommonTasksHelper::getTranslations('task'),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
