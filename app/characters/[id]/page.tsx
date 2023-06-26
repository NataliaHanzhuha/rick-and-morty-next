'use client';

import { CHARACTER_QUERY, getItemById } from "@/grophql/RickAndMortyApi"
import { ICharacter } from "@/models/Character"
import { IDescription } from "@/models/Description";
import Link from "next/link";
import { FC, useEffect, useState } from "react"

interface characterListProps {
params: {id: number}
}

const Character: FC<characterListProps> = ({params}) => {
    const [character, setCharacter] = useState<ICharacter>();

    useEffect(() => {
       getItemById(params.id,  CHARACTER_QUERY, 'character')
       .then((data: ICharacter) => {
        setCharacter(data);
       });
    }, [params.id]);

    const locationLink = (description: IDescription) => {
        const classes = 'w-full border-b border-slate-700 text-blue-500'
        return description.id 
        ? <Link className={classes} href={'/locations/' + description.id}>{description.name}</Link>
        : <div className={classes + ' cursor-not-allowed'}>{description.name}</div>
    }
  
    return !!character?.id
        ? (<div className='flex flex-col gap-3 align-top m-5 w-full'>
            <div className='flex gap-3 align-top w-full'>
                <img src={character?.image} 
                width="200px" 
                height="200px" 
                alt={character.name + ' image'}
                className='h-[200px] w-[200px]'  />

                <div className='flex flex-col w-full gap-3'>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span>Name:</span>
                        <h4 className='w-full border-b border-slate-700 '>{character?.name}</h4>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span>Species: </span>
                        <p className='w-full border-b border-slate-700 '>{character?.species ?? '-'}</p>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span>Status: </span>
                        <p className='w-full border-b border-slate-700 '>{character?.status}</p>
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span>Location: </span>
                        {locationLink(character.location)}
                    </div>
                    <div className='flex gap-2 w-full max-w-lg'>
                        <span>Origin: </span>
                        {locationLink(character.location)}
                    </div>

                    <div className='flex flex-col gap-2 w-full max-w-lg mt-5'>
                        <h3>Episodes</h3>

                        <ul className='flex flex-wrap gap-2'>
                            {character?.episode?.map((ep: any) => {
                                return (<Link key={ep.id}
                                    className='border border-gray-500 p-[5px] rounded-md text-blue-500' 
                                href={'/episodes/' + ep?.id}>Episode {ep?.id}:  {ep.name}</Link>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
        : <>No such character</>

}

export default Character