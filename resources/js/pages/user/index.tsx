import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { IndexProps, Users, type BreadcrumbItem } from '@/types';
import { index as userIndex , edit as userEdit, show as showUser,destroy as delUser, create as createUser} from '@/routes/user/index';
import { useTranslation } from '@/hooks/use-translation';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import TableHeading from '@/components/TableHeading';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/confirm-dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Information',
        href: userIndex().url,
    },
];

export default function Index({users, queryParams = null, success}: IndexProps){

    queryParams = queryParams || {};
    const searchFieldChanged = (name: string, value: string | number | boolean | undefined) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        
        // reload the page with updated queryparams
        router.get(userIndex.url(), queryParams);
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
        router.get(userIndex.url(), queryParams);
    };
    const trans = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState(0);

    const deleteUser = (userId: number) => {
       setOpenDialog(true);
       setUserId(userId);
    }
    
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Information" />
           {success && <div className='border-blue-700 bg-blue-400 px-3 py-2 m-3 rounded shadow text-white font-bold'>
              {success}
            </div>}
            <div className= "my-6 px-10 flex justify-between items-center">
                <Link href={createUser.url()} className="bg-black py-1 px-3 text-white font-bold rounded shadow transition-all">
                    {trans("add_user_btn")}
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
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="name" sortChanged = {sortChanged} >
                                    {trans("name")}
                            </TableHeading>
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="email" sortChanged = {sortChanged} >
                                    {trans("email")}
                                    </TableHeading>
                            <TableHeading sort_field = {queryParams.sort_field?.toString()} sort_direction = {queryParams.sort_direction?.toString()} 
                                             name="created_at" sortChanged = {sortChanged} >
                                    {trans("created_at")}
                            </TableHeading>
                            <th className = "px-3 py-2">{trans("actions")}</th>

                        </tr>
                    </thead>
                    <thead className = "text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className = "text-nowrap">
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2">
                                <Input className ="w-full"
                                       placeholder='User Name'
                                       defaultValue={queryParams.name?.toString()}
                                       onBlur = {(e) => searchFieldChanged('name', e.target.value)}
                                       onKeyDown = {(e) => onKeyPress('name', e) }
                                        />
                            </th>
                            <th className = "px-3 py-2">
                                <Input type="email" placeholder="User Email" defaultValue={queryParams.email?.toString()}
                                    onBlur={(e) => searchFieldChanged('email', e.target.value)}
                                    onKeyDown={(e) => onKeyPress('email', e)} />
                            </th>
                            <th className = "px-3 py-2"></th>
                            <th className = "px-3 py-2"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user : Users) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                <td className="px-3 py-2">{user.id}</td>
                                <th className="px-3 py-2 text- text-nowrap">
                                     {user.name}
                                    </th>
                                <td className="px-3 py-2">
                                    <span className="px-2 py-1" >
                                    {user.email} </span> </td>
                                <td className="px-3 py-2">{user.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href= {userEdit(user.id).url} 
                                    className="font-medium text-blue-600 hover:underline mx-1">
                                        {trans("actions_btn.edit")}</Link>
                                        <Button onClick = {() => deleteUser(user.id)}
                                        className="font-medium text-red-600 bg-transparent border-0 p-0 outline-none ring-0 ring-offset-0 shadow-none hover:underline hover:bg-transparent mx-1 focus:outline-none">
                                           {trans("actions_btn.delete")} 
                                        </Button>
                                     {/*   <Link href= {deleteUser(user.id).url} 
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
                        router.delete(delUser.url(userId));
                    }}>

                </ConfirmDialog>}
                <Pagination links={users.meta.links} />
            {/* <pre> {JSON.stringify(users,null,2)}</pre>   */}
            </div>
            </AppLayout>
    );
}