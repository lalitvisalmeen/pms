import { BreadcrumbItem, Projects, ShowProps } from "@/types";
import { create as createProject, index as projectIndex, update as updateProject} from '@/routes/project/index';
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


export default function Edit({project}:ShowProps){
    const trans = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: trans('edit_project'),
            href: createProject().url,
        },
    ];

     const {data, setData, post, errors, reset} = useForm<{
        image : File | null,
        name: string,
        status : string,
        description: string,
        due_date: string,
        _method : string
     }>({
        image : null,
        name : project.name || '',
        status : project.status || '',
        description: project.description || '',
        due_date : project.due_date || '',
        _method : 'PUT'
     });

     const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(updateProject.url(project.id));
     };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = {trans("edit_project")} />
            <div className="my-5 mx-7">
                <HeadingSmall title = {`${trans('edit_project')} ${project.name}`}></HeadingSmall>
            </div>
            <div className="p-3">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 ">
                    {project.image_path && (
                        <div className="mt-4">
                            <img src={project.image_path} alt="" className ="w-64" />
                        </div>
                    )}
                    <div className="mt-4">
                        <RequiredLabel forLabel= "project_image_path" transMessage = {trans("project_image")} required = {false}></RequiredLabel>
                        <Input type="file" id="project_image_path" name="image" 
                         className="mt-1 block w-full" onChange={(e) => {if(!e.target.files) return;
                         setData('image',e.target.files[0] )}} />
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <RequiredLabel forLabel= "project_name" transMessage ={`${trans("project")} ${trans("name")}`} required = {true}></RequiredLabel>
                        <Input type="text" id="project_name" name="name" 
                        value={data.name} className="mt-1 block w-full" 
                        autoFocus onChange={(e) => setData('name',e.target.value)} />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "project_description" transMessage ={`${trans("project")} ${trans("description")}`} required = {false}></RequiredLabel>
                        <TextAreaInput  id="project_description" name="desription" 
                        value={data.description} className="mt-1 block w-full border rounded" 
                        onChange={(e) => setData('description',e.target.value)} />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "project_due_date" transMessage ={`${trans("project")} ${trans("due_date")}`} required = {false}></RequiredLabel>
                        <Input type="date" id="project_due_date" name="due_date" 
                        value={data.due_date} className="mt-1 block w-full" 
                        onChange={(e) => setData('due_date',e.target.value)} />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "project_status" transMessage ={`${trans("project")} ${trans("status")}`} required = {true}></RequiredLabel>
                         <Select  name="status" onValueChange={(value) => setData('status', value)} defaultValue={data.status}>
                            <SelectTrigger id="project_status">
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
                    <div className="mt-12 text-right">
                        <Link href={projectIndex.url()} 
                        className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-6"> 
                        {trans("cancel")}</Link>
                        <Button className= "bg-black py-1 px-3 text-white rounded shadow transition-all">{trans("submit")}</Button>

                    </div>
                </form>
            </div>
              <pre> {JSON.stringify(project,null,2)}</pre>
        </AppLayout>
    );
}