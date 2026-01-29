import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

type Translations = Record<string, string>;

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface Projects{
     "id" : number,
    'name' : string,
    'description' : string,
    'created_at' : string,
    'due_date' : string,
    'status' : string,
    'image_path' : string,
    'createdBy' : User,
    'updatedBy' : User,
}

export interface Tasks{
     "id" : number,
    'name' : string,
    'description' : string,
    'image_path' : string,
    'status' : string,
   // 'priority' : string,
    'due_date' : string,
 //   'assigned_user_id' : number,
    'createdBy' : User,
    'updatedBy' : User,
   // 'project_id' : number
   'created_at' : string,
   "project" : Projects
}

export interface Users{
    "id" : number,
    "name" : string,
    "email": string,
    'created_at' : string
}

export interface PageProps extends InertiaPageProps{
 "translations" : Translations,
}

export interface ProjectResponse{
    "data" : Projects[],
    "meta" : {
        current_page: number;
        from : number;
        last_page: number;
        path : string;
        per_page: number;
        to : number;
        total: number;
        links: PaginationLinks[];
    };
}

export interface TaskResponse{
    "data" : Tasks[],
    "meta" : {
        current_page: number;
        from : number;
        last_page: number;
        path : string;
        per_page: number;
        to : number;
        total: number;
        links: PaginationLinks[];
    };
}

export interface UserResponse{
    "data" : Users[],
    "meta" : {
        current_page: number;
        from : number;
        last_page: number;
        path : string;
        per_page: number;
        to : number;
        total: number;
        links: PaginationLinks[];
    };
}

export interface PaginationLinks{
    "url"   : string | null,
    "label" : string,
    "page"  : number | null,
    "active": boolean
}

export interface IndexProps{
    "projects" : ProjectResponse,
    "tasks" : TaskResponse,
    "users" : UserResponse,
    "queryParams" : Record<string, string | number | boolean | undefined> | null,
    "success" : string
}

export interface ShowProps{
    "project" : Projects,
    "tasks" : TaskResponse,
    "user" : Users,
    "queryParams" : Record<string, string | number | boolean | undefined> | null;
}
