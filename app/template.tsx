'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface temlateProps {
    children: ReactNode
  }
const Template: FC<temlateProps> = ({children}) => {
    const currentRoute = usePathname();
    const routerLinks = ['characters', 'locations', 'episodes'];

    const styledLink = (path: string) => <Link 
        href={'/' + path} 
        key={path}
        className={currentRoute.includes(path) ? "active" : ""}
        >{path}
    </Link>

    return <>
        <nav className="flex justify-center gap-5 uppercase mt-2 mb-2">
            {routerLinks.map(styledLink)}
        </nav>
        <div>{children}</div>
    </>
}

export default Template