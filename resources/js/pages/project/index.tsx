import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { IndexProps, Projects, type BreadcrumbItem } from '@/types';
import { index as projectIndex , edit as projectEdit, show as showProject,destroy as delProject, create as createProject} from '@/routes/project/index';
import { useTranslation } from '@/hooks/use-translation';
import Pagination from '@/components/pagination';
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from '@/constants';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TableHeading from '@/components/TableHeading';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/confirm-dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects Information',
        href: projectIndex().url,
    },
];

export default function Index({projects, queryParams = null, success}: IndexProps){

    queryParams = queryParams || {};
    const searchFieldChanged = (name: string, value: string | number | boolean | undefined) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        
        // reload the page with updated queryparams
        router.get(projectIndex.url(), queryParams);
    }

    const onKeyPress = (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.currentTarget.value);
    }

    const sortChanged = (name : string) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            }else{
                queryParams.sort_direction = "asc";
            }
        } else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        // reload the page with updated queryparams
        router.get(projectIndex.url(), queryParams);
    };
    const trans = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [projectId, setProjectId] = useState(0);

    const deleteProject = (projectId: number) => {
       setOpenDialog(true);
       setProjectId(projectId);
    }
    
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Information" />
           {success && <div className='border bg-muted px-3 py-2 m-3 rounded shadow'>
              {success}
            </div>}
            <div className= "my-6 px-10 flex justify-between items-center">
                <Link href={createProject.url()} className="bg-black py-1 px-3 text-white font-bold rounded shadow transition-all">
                    {trans("add_project_btn")}
                </Link> 
            </div>
            <div className='overflow-auto'> 
                <table className= "w-full text-sm text-left rtl:text-right">
                    <thead className = "text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className = "text-nowrap">
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="id" sortChanged = {sortChanged} >
                                                {trans("id")}
                            </TableHeading>
                            <th className = "px-3 py-2">{trans("image_path")}</th>
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="name" sortChanged = {sortChanged} >
                                    {trans("name")}
                            </TableHeading>
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="status" sortChanged = {sortChanged} >
                                    {trans("status")}
                                    </TableHeading>
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="created_at" sortChanged = {sortChanged} >
                                    {trans("created_at")}
                            </TableHeading>
                           <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="due_date" sortChanged = {sortChanged} >
                                    {trans("due_date")}
                            </TableHeading>
                            <th className = "px-3 py-2">{trans("created_by")}</th>
                            <th className = "px-3 py-2">{trans("actions")}</th>

                        </tr>
                    </thead>
                    <thead className = "text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className = "text-nowrap">
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2">
                                <Input className ="w-full"
                                       placeholder='Project Name'
                                       defaultValue={queryParams.name?.toString()}
                                       onBlur = {(e) => searchFieldChanged('name', e.target.value)}
                                       onKeyDown = {(e) => onKeyPress('name', e) }
                                        />
                            </th>
                            <th className = "px-3 py-2">
                                <Select onValueChange={(value) => searchFieldChanged('status', value)} defaultValue={queryParams.status?.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder = "Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value ="pending"> {trans("pending")} </SelectItem>
                                        <SelectItem value="in_progress" > {trans("in_progress")}</SelectItem>
                                        <SelectItem value = "completed"> {trans("completed")} </SelectItem>
                                    </SelectContent>
                                </Select>
                            </th>
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project : Projects) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                <td className="px-3 py-2">{project.id}</td>
                                <td className="px-3 py-2">
                                    <img src={project.image_path} alt=" - " />
                                </td>
                                <th className="px-3 py-2 hover:underline text- text-nowrap">
                                    <Link href={showProject.url(project.id)}> {project.name}</Link>
                                    </th>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-2 py-1 rounded text-white font-bold " + STATUS_CLASS_MAP[project.status]
                                    }>
                                    {STATUS_TEXT_MAP[project.status]} </span> </td>
                                <td className="px-3 py-2">{project.created_at}</td>
                                <td className="px-3 py-2">{project.due_date}</td>
                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href= {projectEdit(project.id).url} 
                                    className="font-medium text-blue-600 hover:underline mx-1">
                                        {trans("actions_btn.edit")}</Link>
                                        <Button onClick = {() => deleteProject(project.id)}
                                        className="font-medium text-red-600 bg-transparent border-0 p-0 outline-none ring-0 ring-offset-0 shadow-none hover:underline hover:bg-transparent mx-1 focus:outline-none">
                                           {trans("actions_btn.delete")} 
                                        </Button>
                                     {/*   <Link href= {deleteProject(project.id).url} 
                                    className="font-medium text-red-600 hover:underline mx-1">
                                        {trans("actions_btn.delete")}</Link> */}
                                </td>
                            </tr>
                            ))}
                        
                    </tbody>
                </table>
                {openDialog && <ConfirmDialog message={trans('confirm_delete_msg')}
                    onCancel={() => setOpenDialog(false)}
                    onConfirm={() => {
                        setOpenDialog(false);
                        router.delete(delProject.url(projectId));
                    }}>

                </ConfirmDialog>}
                <Pagination links={projects.meta.links} />
           {/*  <pre> {JSON.stringify(projects,null,2)}</pre>  */}
            </div>
            </AppLayout>
    );
}