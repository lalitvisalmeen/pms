import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { IndexProps, type BreadcrumbItem } from '@/types';
import { index as taskIndex} from '@/routes/task/index';
import TasksTable from './TasksTable';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks Information',
        href: taskIndex().url,
    },
];

export default function Index({tasks, queryParams = null}: IndexProps){

    queryParams = queryParams || {};
    

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Information" />
            <TasksTable tasks = {tasks} queryParams= {queryParams} url = {taskIndex.url()} />
            </AppLayout>
    );
}