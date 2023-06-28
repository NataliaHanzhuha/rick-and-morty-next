'use client';

import Pagination from "@/components/Pagination";
import { LOCATIONS_QUERY } from "@/graphql/RickAndMortyApi";
import { ILocation } from "@/models/Location";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FC, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { useDebounce } from "react-use";

interface characterListProps {

}

type FilterLocation = {
    name: string;
    type: string;
}

const LocationsList: FC<characterListProps> = () => {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [page, updatePage] = useState<number>(1);
    const [next, updateNext] = useState<boolean>(true);
    const [pages, updatePages] = useState<number>(1);
    const { register, watch, handleSubmit, getValues } = useForm<FilterLocation>(
        {
            defaultValues: {
                name: '',
                type: ''
            }
        }
    );

    const onSubmit: SubmitHandler<FilterLocation> = () => {
        // updatePage(1)
    };

    const filter = watch();
    const [, cancel] = useDebounce(
        () => {
            console.log(page, filter);
            
            refetch({page: page, filter: getValues()});
        },
        500,
        [filter.name,filter.type, page]
      );

    const { data, loading, refetch } = useQuery(LOCATIONS_QUERY, {
        variables: {
            page: page,
            filter: getValues()
        }
    });

    useEffect(() => {
        if (!loading) {
            setLocations(data?.locations?.results ?? []);
            updatePages(data?.locations?.info?.pages ?? 1)
            updateNext(!!data?.locations?.info?.next ?? false);
        }
    }, [data, loading])

    useEffect(() => {
        console.log('f ch', filter, page);
        
        updatePage(1);
    }, [filter.name, filter.type])

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
            <label className='form-label' htmlFor='inputName' >Name:</label>
            <input type="text" className='input-text' {...register("name")} id="inputName" />

            <label className='form-label' htmlFor='inputType' >Type:</label>
            <input type="text" className='input-text' {...register("type")} id="inputType" />

            <Pagination page={page} 
            next={next} 
            loading={loading} 
            pages={pages} 
            updatePage={(page) => updatePage(page)} />
        </form>

        <ul className='list-wrapper'>
            {locations.map((location: ILocation) => {
                return (<li className='list-none flex w-[220px] h-[150px]'
                    key={location.id}>
                    <Link href={'/locations/' + location.id}
                        className='list-link'>
                        <h2 className="text-accent font-bold">{location.name}</h2>
                        <p>Dimention: <span className="font-bold">{location.dimension}</span> </p>
                        <p>Residents: <span className="font-bold">{location.residents.length}</span></p>
                    </Link>
                </li>)
            })}
        </ul>
    </>)
}

export default LocationsList;