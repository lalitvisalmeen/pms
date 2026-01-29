import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export function useTranslation(){
    const {translations} = usePage<PageProps>().props;
    return (key:string) => translations[key] || key;
}