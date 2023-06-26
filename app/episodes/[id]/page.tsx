'use client';
import SmallCharacterCardList from "@/components/SmallCharacterCardList";
import { EPISODE_QUERY, getItemById } from "@/grophql/RickAndMortyApi";
import { IEpisode } from "@/models/Episode";
import { FC, useEffect, useState } from "react"

interface characterListProps {
params: {id: number}
}

const Character: FC<characterListProps> = ({params}) => {
    const [episode, setEpisode] = useState<IEpisode>();

    useEffect(() => {
       getItemById(params.id,  EPISODE_QUERY, 'episode')
       .then((data: IEpisode) => {
        setEpisode(data);
       });
    }, [params.id]);
    
    return <>

        <div className='flex flex-col gap-3 align-top m-5 w-full'>
            <div className='flex flex-col w-full gap-3'>
                <div className='flex gap-2 w-full max-w-lg'>
                    <span>Name:</span>
                    <h4 className='w-full border-b border-slate-700 '>{episode?.name}</h4>
                </div>
                <div className='flex gap-2 w-full max-w-lg'>
                    <span>Episode: </span>
                    <p className='w-full border-b border-slate-700 '>{episode?.episode}</p>
                </div>
                <div className='flex gap-2 w-full max-w-lg'>
                    <span>Air_Date: </span>
                    <p className='w-full border-b border-slate-700 '>{episode?.air_date}</p>
                </div>
            </div>

            <SmallCharacterCardList characters={episode?.characters ?? []}></SmallCharacterCardList>
        </div>

    </>
}

export default Character