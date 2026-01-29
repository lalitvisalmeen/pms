import { BreadcrumbItem, Users, ShowProps } from "@/types";
import { create as createUser, update as updateUser} from '@/routes/user/index';
import AppLayout from "@/layouts/app-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import RequiredLabel from "@/components/required-label";
import HeadingSmall from "@/components/heading-small";


export default function Edit({user}:ShowProps){
    const trans = useTranslation();
    console.log(trans);
    console.log(user);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: trans('edit_user'),
            href: createUser().url,
        },
    ];

     const {data, setData, post, errors, reset} = useForm<{
        name: string,
        email : string,
        password: string,
        password_confirmation : string
     }>({
        name: user.name,
        email : user.email,
        password: "",
        password_confirmation : ''
     });

     const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(updateUser.url(user.id));
     };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = {trans("edit_user")} />
            <div className="my-5 mx-7">
                <HeadingSmall title = {`${trans('edit_user')} ${data.name}`}></HeadingSmall>
            </div>
            <div className="p-3">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 ">
                    <div className="mb-4">
                        <RequiredLabel forLabel= "user_name" transMessage ={`${trans("user")} ${trans("name")}`} required = {true}></RequiredLabel>
                        <Input type="text" id="user_name" name="name" 
                        value={data.name} className="mt-1 block w-full" 
                        autoFocus onChange={(e) => setData('name',e.target.value)} />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                     <div className="mt-4">
                        <RequiredLabel forLabel= "user_email" transMessage ={`${trans("user")} ${trans("email")}`} required = {false}></RequiredLabel>
                        <Input type="email" id="user_due_date" name="email" 
                        value={data.email} className="mt-1 block w-full" 
                        onChange={(e) => setData('email',e.target.value)} />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel="user_password" transMessage={trans('password')} required={true}></RequiredLabel>
                        <Input type="password" id="user_pwd" name="password"
                            value={data.password} className="mt-1 block w-full border rounded"
                            onChange={(e) => setData('password', e.target.value)} />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <RequiredLabel forLabel="confirm_pwd" transMessage={trans("confirm_pwd")} required={true}></RequiredLabel>
                        <Input type="password" id="confirm_pwd" name="password_confirmation"
                            value={data.password_confirmation} className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)} />
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
            {/* <pre> {JSON.stringify(user,null,2)}</pre> */}
        </AppLayout>
    );
}