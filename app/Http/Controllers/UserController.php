<?php

namespace App\Http\Controllers;

use App\Helpers\CommonTasksHelper;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         // Get the sorting fields and direction
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = User::query();
        // Filter the records based on the name 
        if(request('name')){
            $query->where('name','like', '%'. request('name'). '%');
        }
        // Filter the records based on the email
        if(request('email')){
            $query->where('email', 'like', '%'.request('email').'%');
        }
        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        $translations = CommonTasksHelper::getTranslations('user');
       // dd($projects->toArray());
        return inertia("user/index", [
            'users' => UserResource::collection($users),
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
        return inertia("user/create", ["translations" => CommonTasksHelper::getTranslations('user')]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
       $data = $request->validated();
       $data["password"] = bcrypt($data["password"]);
       User::create($data);
       return to_route("user.index")->with('success', "New User was created") ;

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("user/edit", [
            "translations" => CommonTasksHelper::getTranslations('user'),
            "user" => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data["password"] = bcrypt($data["password"]);
        }else{
            unset($data["password"]);
        }
       
       $user->update($data);
       return to_route('user.index')->with(['success' => "User \"$user->name\" has been updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        Task::whereIn(
            'project_id',
            $user->projects()->pluck('id')
        )->delete();

        $user->projects()->delete();
        $user->delete();
        return to_route('user.index')->with(['success' => "User has been deleted successfully"]);
    }
}
