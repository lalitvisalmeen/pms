import { BreadcrumbItem, ShowProps } from "@/types";
import { index as taskIndex, edit as editTask} from '@/routes/task/index';
import { show as showProject} from '@/routes/project/index';
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "@/hooks/use-translation";
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP, PRIORITY_CLASS_MAP, PRIORITY_TEXT_MAP } from '@/constants';



export default function show({task}: ShowProps){

    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Task ${task.name}`,
        href: taskIndex().url,
    },
    ];
    const trans = useTranslation();
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Task ${task.name}`} />
             <div className= "my-6 px-10 flex justify-between items-center">
                            <Link href={editTask.url(task.id)} className="bg-black py-1 px-3 text-white font-bold rounded shadow transition-all">
                                {trans("edit_task")}
                            </Link> 
                        </div>
            <div className="py-12">
                <div>
                    <img src={task.image_path} alt= {task.name} className="w-full h-64 object-cover" />
                </div>
                <div className="p-10 m-4 outline-black-900 rounded-lg border-4 border-grey-600">
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                            <div>
                                <label className="font-bold"> {trans('task')} {trans("id")}</label>
                                <p className="mt-1">{task.id}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("name")}</label>
                                <p className="mt-1">{task.name}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("status")}</label>
                                <p>
                                    <span className={"px-2 py-1 rounded text-white font-bold " + STATUS_CLASS_MAP[task.status]
                                }>
                                    {STATUS_TEXT_MAP[task.status]} </span> </p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("priority")}</label>
                                <p>
                                    <span className={"px-2 py-1 rounded text-white font-bold " + PRIORITY_CLASS_MAP[task.priority]
                                }>
                                    {PRIORITY_TEXT_MAP[task.priority]} </span> </p>
                            </div>
                             <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("created_by")}</label>
                                <p className="mt-1" >
                                    {task.createdBy.name} </p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <label className="font-bold"> {trans('project')} {trans("name")}</label>
                                <p className="mt-1 hover:underline">
                                    <Link href={showProject(task.project.id)}>
                                    {task.project.name}</Link>
                                    </p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('assigned_user_id')}</label>
                                <p className="mt-1">{task.assignedUser.name}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("due_date")}</label>
                                <p className="mt-1">{task.due_date}</p>
                            </div>
                             <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("created_at")}</label>
                                <p className="mt-1">{task.created_at}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('task')} {trans("updated_by")}</label>
                                <p className="mt-1">{task.updatedBy.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold"> {trans('task')} {trans("description")}</label>
                        <p className="mt-1">{task.description}</p>
                    </div>
                </div>
            </div>
          {/*   <pre> {JSON.stringify(task,null,2)}</pre> */ }
        </AppLayout>    
    );
}