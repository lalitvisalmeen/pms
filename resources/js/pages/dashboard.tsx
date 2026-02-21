import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/constants';
import { useTranslation } from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { TaskResponse, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {show as showTask} from '@/routes/task/index';
import {show as showProject} from '@/routes/project/index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },

];

interface dashboardProps{
    myPendingTasks : number,
    totalPendingTasks : number,
    myProgressTasks : number,
    totalProgressTasks : number,
    myCompletedTasks : number,
    totalCompletedTasks : number,
    activeTasks : TaskResponse

}

export default function Dashboard({myPendingTasks, totalPendingTasks, myProgressTasks, totalProgressTasks, myCompletedTasks, totalCompletedTasks,activeTasks}:dashboardProps) {
    const trans = useTranslation();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border-3 border-sidebar-border/70 dark:border-sidebar-border items-center justify-center h-full flex flex-col">
                      <h3 className="text-amber-600 font-semibold  text-2xl">{trans('pending_tasks')}</h3>
                       {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                       <p className='text-xl mt-2 font-bold'>{myPendingTasks} / {totalPendingTasks}</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border-3 border-sidebar-border/70 dark:border-sidebar-border items-center justify-center h-full flex flex-col">
                     <h3 className="text-blue-600 font-semibold  text-2xl">{trans('in_progress_tasks')}</h3>
                     <p className='text-xl mt-2 font-bold'>{myProgressTasks} / {totalProgressTasks}</p>
                       {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}

                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border-3 border-sidebar-border/70 dark:border-sidebar-border items-center justify-center h-full flex flex-col">
                    <h3 className="text-green-600 font-semibold  text-2xl">{trans('completed_tasks')}</h3>
                     <p className='text-xl mt-2 font-bold'>{myCompletedTasks} / {totalCompletedTasks}</p>
                      {/*  <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border-3 border-color-black border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <h3 className="text-grey-600 font-semibold  text-2xl">{trans('my_active_tasks')}</h3>
                    <table className= "w-full text-sm text-left rtl:text-right mt-4">
                        <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                            <tr>
                                <th className = "px-3 py-2">ID</th>
                                <th className = "px-3 py-2">Project Name</th>
                                <th className = "px-3 py-2">Name</th>
                                <th className = "px-3 py-2">Status</th>
                                <th className = "px-3 py-2">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeTasks.data.map(task => (
                                <tr key={task.id}>
                                    <td className='px-3 py-2'>{task.id}</td>
                                   <td className='px-3 py-2'>
                                        <Link href={showProject(task.project.id)} className="hover:underline">{task.project.name}</Link>
                                    </td>
                                    <td className='px-3 py-2'>
                                        <Link href={showTask(task.id)} className="hover:underline">{task.name}</Link>
                                    </td>
                                    <td className='px-3 py-2'>
                                        <span className={"px-2 py-1 rounded text-white font-bold " + STATUS_CLASS_MAP[task.status] }>
                                                                            {STATUS_TEXT_MAP[task.status]} </span>
                                    </td>
                                    <td className='px-3 py-2'>{task.due_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </AppLayout>
    );
}
