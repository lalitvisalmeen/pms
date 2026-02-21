import { BreadcrumbItem, IndexProps } from "@/types";
import { create as createTask, store as storeTask} from '@/routes/task/index';
import AppLayout from "@/layouts/app-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { TextAreaInput } from "@/components/ui/text-area-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RequiredLabel from "@/components/required-label";
import HeadingSmall from "@/components/heading-small";


export default function Create({projects, users}:IndexProps){
    const trans = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: trans('create_task'),
            href: createTask().url,
        },
    ];

     const {data, setData, post, errors, reset} = useForm<{
        image : File | null,
        name: string,
        status : string,
        priority : string,
        description: string,
        due_date: string,
        assigned_user_id : string,
        project_id : string
     }>({
        image : null,
        name : '',
        status : '',
        priority : '',
        description: '',
        due_date : '',
        assigned_user_id : '',
        project_id : ''
     });

     const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(storeTask.url());
     };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = {trans("create_task")} />
            <div className="my-3 mx-7">
                <HeadingSmall title={trans("create_task")} />
            </div>
            <div className="p-6">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 ">
                    {/* Project Id */}
                    <div>
                        <RequiredLabel forLabel= "task_project_id" transMessage ={trans("project_id")} required = {true}></RequiredLabel>
                         <Select  name="project_id" onValueChange={(value) => setData('project_id', value)} defaultValue={data.project_id}>
                            <SelectTrigger id="task_project_id">
                                <SelectValue placeholder = "Select Project" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.data.map((project) => (
                                    <SelectItem value={project.id.toString()} key={project.id}>{project.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "task_image_path" transMessage = {trans("task_image")} required = {false}></RequiredLabel>
                        <Input type="file" id="task_image_path" name="image" 
                         className="mt-1 block w-full" onChange={(e) => {if(!e.target.files) return;
                         setData('image',e.target.files[0] )}} />
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "task_name" transMessage ={`${trans("task")} ${trans("name")}`} required = {true}></RequiredLabel>
                        <Input type="text" id="task_name" name="name" 
                        value={data.name} className="mt-1 block w-full" 
                        autoFocus onChange={(e) => setData('name',e.target.value)} />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "task_description" transMessage ={`${trans("task")} ${trans("description")}`} required = {false}></RequiredLabel>
                        <TextAreaInput  id="task_description" name="desription" 
                        value={data.description} className="mt-1 block w-full border rounded" 
                        onChange={(e) => setData('description',e.target.value)} />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "task_due_date" transMessage ={`${trans("task")} ${trans("due_date")}`} required = {false}></RequiredLabel>
                        <Input type="date" id="task_due_date" name="due_date" 
                        value={data.due_date} className="mt-1 block w-full" 
                        onChange={(e) => setData('due_date',e.target.value)} />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "task_status" transMessage ={`${trans("task")} ${trans("status")}`} required = {true}></RequiredLabel>
                         <Select  name="status" onValueChange={(value) => setData('status', value)} defaultValue={data.status}>
                            <SelectTrigger id="task_status">
                                <SelectValue placeholder = "Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value ="pending"> {trans("pending")} </SelectItem>
                                <SelectItem value="in_progress" > {trans("in_progress")}</SelectItem>
                                <SelectItem value = "completed"> {trans("completed")} </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "task_priority" transMessage ={`${trans("task")} ${trans("priority")}`} required = {true}></RequiredLabel>
                         <Select  name="priority" onValueChange={(value) => setData('priority', value)} defaultValue={data.priority}>
                            <SelectTrigger id="task_priority">
                                <SelectValue placeholder = "Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value ="low"> {trans("low")} </SelectItem>
                                <SelectItem value="medium" > {trans("medium")}</SelectItem>
                                <SelectItem value = "high"> {trans("high")} </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.priority} className="mt-2" />
                    </div>
                    {/* Assigned user id  */}
                    <div className="mt-4">
                        <RequiredLabel forLabel= "task_assigned_user_id" transMessage ={trans("assigned_user_id")} required = {true}></RequiredLabel>
                         <Select  name="assigned_user_id" onValueChange={(value) => setData('assigned_user_id', value)} defaultValue={data.assigned_user_id}>
                            <SelectTrigger id="task_assigned_user_id">
                                <SelectValue placeholder = "Select User" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.data.map((user) => (
                                    <SelectItem value={user.id.toString()} key={user.id}>{user.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.assigned_user_id} className="mt-2" />
                    </div>
                    
                    <div className="mt-12 text-right">
                        <Link href={createTask.url()} 
                        className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-6"> 
                        {trans("cancel")}</Link>
                        <Button className= "bg-black py-1 px-3 text-white rounded shadow transition-all">{trans("submit")}</Button>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}