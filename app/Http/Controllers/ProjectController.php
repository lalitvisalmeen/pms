<?php

namespace App\Http\Controllers;

use App\Helpers\CommonTasksHelper;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the sorting fields and direction
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Project::query();
        // Filter the records based on the name 
        if(request('name')){
            $query->where('name','like', '%'. request('name'). '%');
        }
        // Filter the records based on the status
        if(request('status')){
            $query->where('status', request('status'));
        }
        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        $translations = CommonTasksHelper::getTranslations('project');
       // dd($projects->toArray());
        return inertia("project/index", [
            'projects' => ProjectResource::collection($projects),
            'translations' => $translations,
            'queryParams' => request()->query() ?: null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("project/create", ["translations" => CommonTasksHelper::getTranslations('project')]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
       $data = $request->validated();
       /** @var  \Illuminate\Http\UploadedFile|null $image */
       $image = $data['image'] ?? null;
       $data['created_by'] = Auth::id();
       $data['updated_by'] = Auth::id();
       if($image){
        $data['image_path'] = $image->store('project/'.Str::random(), 'public');
       }

       Project::create($data);
       return to_route('project.index') ->with(['success' => "New Project created successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        // Get the sorting fields and direction
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        // Filter the records based on the name 
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        // Filter the records based on the status
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
       // dd($tasks);

        return inertia('project/show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            "translations" => CommonTasksHelper::getTranslations('project')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('project/edit', ['project' => new ProjectResource($project), 'translations' => CommonTasksHelper::getTranslations('project')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
       $data = $request->validated();
       $image = $data['image'] ?? null;
       
       $data['updated_by'] = Auth::id();
       if($image){
            if($project->image_path){
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/'.Str::random(),'public');
       }
       
       $project->update($data);
       return to_route('project.index')->with(['success' => "Project \"$project->name\" has been updated successfully"]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // delete the project
        $project->tasks()->delete();
        if($project->image_path){
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
        $project->delete();
        return to_route('project.index')->with(['success' => "Project has been deleted successfully"]);
    }
}
