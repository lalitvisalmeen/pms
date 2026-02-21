import Pagination from "@/components/pagination";
import TableHeading from "@/components/TableHeading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import { TaskResponse, Tasks } from "@/types";
import { Link, router } from "@inertiajs/react";
import { index as taskIndex, edit as taskEdit, destroy as delTask, show as showTask} from '@/routes/task/index';
import { STATUS_CLASS_MAP, STATUS_TEXT_MAP } from "@/constants";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmDialog from "@/components/confirm-dialog";

type TasksTableProps = {
    tasks : TaskResponse,
    queryParams : Record<string, string | number | boolean | undefined> | null,
    hideColumn ?: boolean,
    url : string

}

export default function TasksTable({tasks, queryParams,  hideColumn = false, url} : TasksTableProps){
    queryParams = queryParams || {};

    const searchFieldChanged = (name: string, value: string | number | boolean | undefined) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        
        // reload the page with updated queryparams
        router.get(url, queryParams, {preserveScroll : true});
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
        router.get(url, queryParams, {preserveScroll : true});
        
    };
    const trans = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const deleteTask = (taskId: number) => {
       setOpenDialog(true);
       setTaskId(taskId);
    }
    return (
        <>
              <div className='overflow-auto'> 
                <table className= "w-full text-sm text-left rtl:text-right">
                    <thead className = "text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className = "text-nowrap">
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="id" sortChanged = {sortChanged} >
                                                {trans("id")}
                            </TableHeading>
                            <th className = "px-3 py-2">{trans("image_path")}</th>
                           {!hideColumn &&  <th className = "px-3 py-2">{trans("project")} {trans("name")}</th> }
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
                           { !hideColumn && <th className = "px-3 py-2"></th> }
                            <th className = "px-3 py-2">
                                <Input className ="w-full"
                                       placeholder='Task Name'
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
                        {tasks.data.map((task : Tasks) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img src={task.image_path} alt=" - " />
                                </td>
                               {!hideColumn &&  <td className="px-3 py-2">{task.project.name}</td> }
                               <th className="px-3 py-2 hover:underline text- text-nowrap">
                                                                   <Link href={showTask.url(task.id)}> {task.name}</Link>
                                                                   </th>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-2 py-1 rounded text-white font-bold " + STATUS_CLASS_MAP[task.status]
                                    }>
                                    {STATUS_TEXT_MAP[task.status]} </span> </td>
                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">{task.due_date}</td>
                                <td className="px-3 py-2">{task.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href= {taskEdit(task.id).url} 
                                    className="font-medium text-blue-600 hover:underline mx-1">
                                        {trans("actions_btn.edit")}</Link>
                                        <Button onClick = {() => deleteTask(task.id)}
                                        className="font-medium text-red-600 bg-transparent border-0 p-0 outline-none ring-0 ring-offset-0 shadow-none hover:underline hover:bg-transparent mx-1 focus:outline-none">
                                           {trans("actions_btn.delete")} 
                                        </Button>
                                </td>
                            </tr>
                            ))}
                        
                    </tbody>
                </table>
            {/*} <pre> {JSON.stringify(tasks,null,2)}</pre> */}
            </div>
            {openDialog && <ConfirmDialog message={trans('confirm_delete_msg')}
                                onCancel={() => setOpenDialog(false)}
                                onConfirm={() => {
                                    setOpenDialog(false);
                                    router.delete(delTask.url(taskId));
                                }}>
            
                            </ConfirmDialog>}
            <Pagination links={tasks.meta.links} />
        </>
    );
}