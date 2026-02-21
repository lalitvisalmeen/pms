import { BreadcrumbItem, ShowProps } from "@/types";
import { index as projectIndex, show as showProject, edit as editProject} from '@/routes/project/index';
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "@/hooks/use-translation";
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/constants';
import TasksTable from "../task/TasksTable";



export default function show({project, tasks, queryParams}: ShowProps){

    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Project ${project.name}`,
        href: projectIndex().url,
    },
    ];
    const trans = useTranslation();
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project ${project.name}`} />
            <div className= "my-6 px-10 flex justify-between items-center">
                <Link href={editProject.url(project.id)} className="bg-black py-1 px-3 text-white font-bold rounded shadow transition-all">
                    {trans("edit_project")}
                </Link> 
            </div>
            <div className="py-12">
                <div>
                    <img src={project.image_path} alt= {project.name} className="w-full h-64 object-cover" />
                </div>
                <div className="p-10 m-4 outline-black-900 rounded-lg bg-gray-300/50 ">
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                            <div>
                                <label className="font-bold"> {trans('project')} {trans("id")}</label>
                                <p className="mt-1">{project.id}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('project')} {trans("name")}</label>
                                <p className="mt-1">{project.name}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('project')} {trans("status")}</label>
                                <p>
                                    <span className={"px-2 py-1 rounded text-white font-bold " + STATUS_CLASS_MAP[project.status]
                                }>
                                    {STATUS_TEXT_MAP[project.status]} </span> </p>
                            </div>
                             <div className="mt-4">
                                <label className="font-bold"> {trans('project')} {trans("created_by")}</label>
                                <p className="mt-1" >
                                    {project.createdBy.name} </p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <label className="font-bold"> {trans('project')} {trans("due_date")}</label>
                                <p className="mt-1">{project.due_date}</p>
                            </div>
                             <div className="mt-4">
                                <label className="font-bold"> {trans('project')} {trans("created_at")}</label>
                                <p className="mt-1">{project.created_at}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('project')} {trans("updated_by")}</label>
                                <p className="mt-1">{project.updatedBy.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold"> {trans('project')} {trans("description")}</label>
                        <p className="mt-1">{project.description}</p>
                    </div>
                </div>
                <div className="p-10 m-4 outline-black-900 rounded-lg bg-gray-300/50 ">
                
                {(tasks.data && tasks.data.length > 0) ? 
                <TasksTable tasks = {tasks} queryParams={queryParams} hideColumn = {true} url= {showProject.url(project.id)} ></TasksTable>
                 : <p> {trans('no_task_message')}</p>}
                 </div>
            </div>
           {/* <pre> {JSON.stringify(tasks,null,2)}</pre> */}
        </AppLayout>    
    );
}