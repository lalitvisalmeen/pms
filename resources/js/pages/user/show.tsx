import { BreadcrumbItem, ShowProps } from "@/types";
import { index as userIndex, show as showUser} from '@/routes/user/index';
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "@/hooks/use-translation";
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/constants';
import TasksTable from "../task/TasksTable";



export default function show({user, tasks, queryParams}: ShowProps){

    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `User ${user.name}`,
        href: userIndex().url,
    },
    ];
    const trans = useTranslation();
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User ${user.name}`} />
            <div className="py-12">
                <div className="p-10 m-4 outline-black-900 rounded-lg bg-gray-300/50 ">
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                            <div>
                                <label className="font-bold"> {trans('user')} {trans("id")}</label>
                                <p className="mt-1">{user.id}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold"> {trans('user')} {trans("name")}</label>
                                <p className="mt-1">{user.name}</p>
                            </div>
                        </div>
                        <div className="">
                            
                             <div className="mt-4">
                                <label className="font-bold"> {trans('user')} {trans("created_at")}</label>
                                <p className="mt-1">{user.created_at}</p>
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className="p-10 m-4 outline-black-900 rounded-lg bg-gray-300/50 ">
                
                {(tasks.data && tasks.data.length > 0) ? 
                <TasksTable tasks = {tasks} queryParams={queryParams} hideColumn = {true} url= {showUser.url(user.id)} ></TasksTable>
                 : <p> {trans('no_task_message')}</p>}
                 </div>
            </div>
           {/* <pre> {JSON.stringify(tasks,null,2)}</pre> */}
        </AppLayout>    
    );
}