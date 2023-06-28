'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface temlateProps {
    children: ReactNode
  }

const Template: FC<temlateProps> = ({children}) => {
    const currentRoute = usePathname();
    const routerLinks = ['characters', 'locations', 'episodes'];
    const client = new ApolloClient({
        uri: 'https://rickandmortyapi.com/graphql',
        cache: new InMemoryCache(),
      });

    const styledLink = (path: string) => <Link 
        href={'/' + path} 
        key={path} 
        legacyBehavior>
        <a className={currentRoute.includes(path) ? "active" : "text-biege"}
        >{path}</a>
    </Link>

    return <section className="bg-dark-green max-h-[100vh] flex flex-col overflow-hidden">
        <nav className="flex justify-center gap-5 uppercase pt-2 pb-2 sticky top-0 left-0 z-10 bg-dark-green ">
            {routerLinks.map(styledLink)}
        </nav>
        <ApolloProvider client={client}>
        <div className="flex gap-4 min-h-[100vh] h-[100vh] pr-4 pl-4" >{children}</div>
        </ApolloProvider>
    </section>
}

export default Template