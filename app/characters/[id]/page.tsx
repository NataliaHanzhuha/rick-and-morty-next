'use client';

import Loading from "@/components/Loading";
import { CHARACTER_QUERY } from "@/graphql/RickAndMortyApi"
import { ICharacter } from "@/models/Character";
import { IDescription } from "@/models/Description";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FC, useEffect, useState } from "react"

interface characterListProps {
    params: { id: number }
}

const Character: FC<characterListProps> = ({ params }) => {
    const [character, setCharacter] = useState<ICharacter | null>(null);
    const { data, refetch, loading } = useQuery(CHARACTER_QUERY, {
        variables: { id: params.id }
    })

    useEffect(() => {
        refetch().then((res: any) => setCharacter(res.data.character))
    }, [params.id]);

    const locationLink = (description?: IDescription) => {
        const classes = 'w-full text-accent font-bold'
        return !!description?.id
            ? <Link className={classes} href={'/locations/' + description.id}>{description?.name}</Link>
            : <div className={classes + ' cursor-not-allowed'}>{description?.name}</div>
    }

    const statusColor = (status?: string) => {
        switch (status) {
            case 'Alive': return 'green';
            case 'Dead': return 'red';
            case 'unknown': return 'gray';
        }
    }

    return <>{loading
        ? <Loading />
        : <div className="flex flex-col w-full max-h-[95vh] overflow-y-auto">
            <div className='flex gap-3 w-full justify-center xs:items-center xs:flex-col sm:flex-col md:flex-row'>
                <img src={character?.image}
                    width="200px"
                    height="200px"
                    alt={character?.name + ' image'}
                    className='h-[200px] w-[200px] rounded-2xl' />

                <div className="flex flex-col gap-3 p-3 border rounded-xl border-biege w-full">
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span className="label">Name:</span>
                        <h4 className='description'>{character?.name}</h4>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span className="label" >Species: </span>
                        <p className='description'>{character?.species ?? '-'}</p>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span className="label">Status: </span>
                        <p className='description flex items-center gap-3'>
                            {character?.status}
                            <span className="rounded-full w-3 h-3 block"
                                style={{ backgroundColor: statusColor(character?.status) }}></span>
                        </p>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span className="label">Location: </span>
                        {locationLink(character?.location)}
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span className="label">Origin: </span>
                        {locationLink(character?.location)}
                    </div>
                </div>

            </div>


            <div className='flex flex-col justify-center items-center gap-2 p-3 w-full mt-4 border rounded-xl border-biege'>
                <h3 className="header">Episodes</h3>

                <ul className='flex flex-wrap gap-2'>
                    {character?.episode?.map((ep: any) => {
                        return (<Link key={ep.id}
                            className='border border-gray-500 p-[5px] rounded-md text-primary'
                            href={'/episodes/' + ep?.id}>E{ep?.id}:  {ep.name}</Link>)
                    })}
                </ul>
            </div>
        </div>
    }
    </>

}

export default Character