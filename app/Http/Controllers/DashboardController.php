<?php

namespace App\Http\Controllers;

use App\Helpers\CommonTasksHelper;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){

        $user = Auth::user();
        // get pending tasks
        $totalPendingTasks = Task::where('status', 'pending')->count();
        $myPendingTasks = Task::where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        // get in progress tasks
        $totalProgressTasks = Task::where('status', 'in_progress')->count();
        $myProgressTasks = Task::where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();

        // get completed tasks
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $myCompletedTasks = Task::where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        // get the active tasks
        $activeTasks = Task::whereIn('status', ['pending', 'in_progress'])->where('assigned_user_id',$user->id)->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);
        // get the translations to be used in the dashboard page
        $translations = CommonTasksHelper::getTranslations('dashboard');

        return inertia('dashboard', compact('totalPendingTasks', 'myPendingTasks','totalProgressTasks','myProgressTasks', 'totalCompletedTasks','myCompletedTasks','translations','activeTasks'));
       
    }
}
