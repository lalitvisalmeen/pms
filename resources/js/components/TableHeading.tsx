import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react';

type TableHeadingProps = {
    sort_field ?: string,
    sort_direction ?: string ,
    name : string,
    sortChanged ?: (field : string) => void,
    children : ReactNode,
    sortable ?: boolean
}

export default function TableHeading({sort_field , sort_direction , sortable = true, children, name, sortChanged = () => {}} : TableHeadingProps) {
    return (
         <th onClick = {(e) => sortChanged(name)} >
                                <div className = "px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
                                   {children}
                                   {sortable &&  <div>
                                        <ChevronUpIcon className={`w-4  ${((sort_field === name && sort_direction === "asc") ? "stroke-black" : "text-gray-400")}`} />
                                        <ChevronDownIcon className={`w-4 -mt-2  ${((sort_field === name && sort_direction === "desc") ? "stroke-black" : "text-gray-400")}`}/>
                                    </div>
                                    }
                                </div>
                                </th>
    );
}