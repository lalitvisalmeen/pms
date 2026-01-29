import { PaginationLinks } from "@/types";
import { Link } from "@inertiajs/react";

export default function Pagination({links}: {links:PaginationLinks[]}){
    return(
        <nav className = "text-center mt-4">
            {links.map((link) => link.url ?(
                <Link preserveScroll
                href={link.url || ""}
                key = {link.label}
                className= {"inline=block py-2 px-3 rounded-lg  text-xs mx-0.5 "+
                    (link.active ? "bg-gray-950 text-white font-bold " : " ") +
                    (!link.url ? "!text-gray-700 cursor-not-allowed " : "hover:bg-gray-950 hover:text-white hover:font-bold")
                } dangerouslySetInnerHTML={{ __html: link.label }}></Link>
            ) :
            ( <span
            key={link.label}
            className="inline-block py-2 px-3 rounded-lg text-xs mx-0.5 text-gray-700 cursor-not-allowed"
            dangerouslySetInnerHTML={{ __html: link.label }}
          />))}
        </nav>
    );
}