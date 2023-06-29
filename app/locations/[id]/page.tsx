'use client';

import SmallCharacterCardList from "@/components/SmallCharacterCardList";
import { LOCATION_QUERY } from "@/graphql/RickAndMortyApi";
import { ILocation } from "@/models/Location";
import { useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react"

interface locationProps {
    params: { id: number }
}

const Location: FC<locationProps> = ({ params }) => {
    const [location, setLocation] = useState<ILocation>();
    const { refetch, loading } = useQuery(LOCATION_QUERY, {
        variables: { id: params.id }
    })

    useEffect(() => {
        refetch().then((res: any) => setLocation(res.data.location))
    }, [params.id]);

    return <>{
        !!loading
            ? <div>Loading...</div>
            : <div className='flex flex-col gap-3 align-top m-5 w-full'>
                <h3 className="header active">{location?.name}</h3>

                <div className="flex flex-col items-center gap-3 align-top w-full max-h-[85vh] overflow-y-auto">
                    <h3 className="header">Characters</h3>
                    <SmallCharacterCardList characters={location?.residents ?? []}
                        styles="justify-start"
                        size={150}></SmallCharacterCardList>
                </div>
            </div>
    }</>
}

export default Location