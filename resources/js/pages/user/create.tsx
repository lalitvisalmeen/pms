import { BreadcrumbItem } from "@/types";
import { create as createUser, store as storeUser} from '@/routes/user/index';
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


export default function Create({}){
    const trans = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: trans('create_user'),
            href: createUser().url,
        },
    ];

     const {data, setData, post, errors, reset} = useForm<{
        name: string,
        email : string,
        password: string,
        password_confirmation : string
     }>({
        name: '',
        email : '',
        password: '',
        password_confirmation : ''
     });

     const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(storeUser.url());
     };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = {trans("create_user")} />
            <div className="my-5 mx-7">
                <HeadingSmall title={trans("create_user")} />
            </div>
            <div className="p-6">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 ">
                    <div className="mt-4">
                        <RequiredLabel forLabel= "user_name" transMessage = {` ${trans('user')} ${trans('name')}`} required = {true}></RequiredLabel>
                        <Input type="text" id="user_name" name="name" 
                         className="mt-1 block w-full" onChange={(e) => 
                         setData('name',e.target.value )} />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "user_email" transMessage ={`${trans("user")} ${trans("email")}`} required = {true}></RequiredLabel>
                        <Input type="email" id="user_email" name="email" 
                        value={data.email} className="mt-1 block w-full" 
                        onChange={(e) => setData('email',e.target.value)} />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel= "user_password" transMessage = {trans('password')} required = {true}></RequiredLabel>
                        <Input type="password" id="user_pwd" name="password" 
                        value={data.password} className="mt-1 block w-full border rounded" 
                        onChange={(e) => setData('password',e.target.value)} />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "confirm_pwd" transMessage ={trans("confirm_pwd")} required = {true}></RequiredLabel>
                        <Input type="password" id="confirm_pwd" name="password_confirmation" 
                        value={data.password_confirmation} className="mt-1 block w-full" 
                        onChange={(e) => setData('password_confirmation',e.target.value)} />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    
                    <div className="mt-12 text-right">
                        <Link href={createUser.url()} 
                        className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-6"> 
                        {trans("cancel")}</Link>
                        <Button className= "bg-black py-1 px-3 text-white rounded shadow transition-all">{trans("submit")}</Button>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}