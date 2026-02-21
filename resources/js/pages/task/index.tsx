import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { IndexProps, type BreadcrumbItem } from '@/types';
import { index as taskIndex, create as createTask} from '@/routes/task/index';
import TasksTable from './TasksTable';
import { useTranslation } from '@/hooks/use-translation';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks Information',
        href: taskIndex().url,
    },
];

export default function Index({tasks, queryParams = null, success}: IndexProps){

    queryParams = queryParams || {};
    const trans = useTranslation();
    

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Information" />
            {success && <div className='border-blue-700 bg-blue-400 px-3 py-2 m-3 rounded shadow text-white font-bold'>
              {success}
            </div>}
            <div className= "my-6 px-10 flex justify-between items-center">
                <Link href={createTask.url()} className="bg-black py-1 px-3 text-white font-bold rounded shadow transition-all">
                    {trans("add_task_btn")}
                </Link> 
            </div>
            <TasksTable tasks = {tasks} queryParams= {queryParams} url = {taskIndex.url()} />
          <pre> {JSON.stringify(tasks,null,2)}</pre> 
            </AppLayout>
    );
}