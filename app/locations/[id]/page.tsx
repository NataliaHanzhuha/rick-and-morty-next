'use client';

import SmallCharacterCardList from "@/components/SmallCharacterCardList";
import { LOCATION_QUERY, getItemById } from "@/grophql/RickAndMortyApi";
import { ILocation } from "@/models/Location";
import { FC, useEffect, useState } from "react"

interface locationProps {
params: {id: number}
}

const Location: FC<locationProps> = ({params}) => {
    const [location, setLocation] = useState<ILocation>();

    useEffect(() => {
       getItemById(params.id,  LOCATION_QUERY, 'location')
       .then((data: ILocation) => {
        setLocation(data);
       });
    }, [params.id]);
    
    return (<>
        <div>
            <h4>{location?.name}</h4>
        </div>

        <SmallCharacterCardList characters={location?.residents ?? []}></SmallCharacterCardList>

    </>)
}

export default Location