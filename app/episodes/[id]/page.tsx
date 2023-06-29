'use client';
import SmallCharacterCardList from "@/components/SmallCharacterCardList";
import { EPISODE_QUERY } from "@/graphql/RickAndMortyApi";
import { IEpisode } from "@/models/Episode";
import { useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react"

interface characterListProps {
    params: { id: number }
}

const Character: FC<characterListProps> = ({ params }) => {
    const [episode, setEpisode] = useState<IEpisode>();
    const { refetch, loading } = useQuery(EPISODE_QUERY, {
        variables: { id: params.id }
    })

    useEffect(() => {
        refetch().then((res: any) => setEpisode(res.data.episode))
    }, [params.id]);

    return <>{
        !!loading
            ? <div>Loading...</div>
            : <div className='flex flex-col gap-3 align-top m-5 w-full'>

                <h4 className='description text-center text-2xl'>
                    {episode?.episode} {episode?.name} ({episode?.air_date})
                </h4>


                <div className="flex flex-col items-center gap-3 align-top w-full max-h-[85vh] overflow-y-auto">
                    <h3 className="header">Characters</h3>
                    <SmallCharacterCardList characters={episode?.characters ?? []}
                        styles="justify-start"
                        size={150}></SmallCharacterCardList>
                </div>

            </div>
    }</>
}

export default Character