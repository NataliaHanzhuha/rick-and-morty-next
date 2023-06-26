'use client';

import Pagination from "@/components/Pagination";
import {  LOCATIONS_QUERY, getFilteredItems } from "@/graphql/RickAndMortyApi";
import { ILocation } from "@/models/Location";
import Link from "next/link";
import { FC, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

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
    const [loading, updateLoading] = useState<boolean>(true);


    const { register, watch, handleSubmit, formState: { errors } } = useForm<FilterLocation>(
        {
            defaultValues: {
                name: '',
                type: ''
            }
        }
    );

    const onSubmit: SubmitHandler<FilterLocation> = () => {
        updatePage(1)
    };


    const filterName = watch('name');
    const filterType = watch('type');

    const fetchItems = async (page: number = 1, filter: FilterLocation = { name: '', type: ''}) => {
        try {
            const data: any = await getFilteredItems(page, filter, LOCATIONS_QUERY);
            setLocations(data.locations.results);
            updatePages(data?.locations?.info?.pages)
            updateNext(!!data?.locations?.info?.next)
            updateLoading(false)
        } catch (error) {
            setLocations([]);
            updatePages(1)
            updateNext(false)
            updateLoading(false)
        }
    };

    useEffect(() => {
        fetchItems( page, { name: filterName, type: filterType })
    }, [page, filterName, filterType]);

    useEffect(() => {
        updatePage(1);
    }, [filterName, filterType])

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
            name:
            <input type="text" {...register("name")} />
            type:
            <input type="text" {...register("type")} />

        </form>

        <Pagination page={page} next={next} loading={loading} pages={pages} updatePage={(page) => updatePage(page)} />

        <ul className='flex gap-3 flex-wrap justify-center'>
            {locations.map((location: ILocation) => {
                return (<li className='list-none flex bg-cover  bg-no-repeat w-[250px] h-[150px]'
                    key={location.id}>
                    <Link href={'/locations/' + location.id}
                        className='text-white font-bold backdrop-brightness-75 hover:backdrop-brightness-50 cursor-pointer flex justify-center w-full flex-col'>
                        <h2>{location.name}</h2>
                        <p>Dimention: {location.dimension}</p>
                        <p>Residents: {location.residents.length}</p>
                    </Link>
                </li>)
            })}
        </ul>
    </>)
}

export default LocationsList;