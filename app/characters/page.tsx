"use client";

import React, { useEffect, useState, FC  } from 'react';
import { CHARACTERS_QUERY, getFilteredItems } from '@/graphql/RickAndMortyApi';
import { ICharacter } from '@/models/Character';
import Pagination from '@/components/Pagination';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

interface characterListProps {

}

type Inputs = {
    name: string,
    status: string,
};

const Characters: FC<characterListProps> = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [page, updatePage] = useState<number>(1);
    const [next, updateNext] = useState<boolean>(true);
    const [loading, updateLoading] = useState<boolean>(true);
    const [pages, updatePages] = useState<number>(1);

    const fetchItems = async (page: number = 1, filter: Inputs = { name: '', status: ''}) => {
        try {
            const data: any = await getFilteredItems(page, filter, CHARACTERS_QUERY);
            setCharacters(data.characters.results);
            updatePages(data?.characters?.info?.pages)
            updateNext(!!data?.characters?.info?.next)
            updateLoading(false)
        } catch (error) {
            setCharacters([]);
            updatePages(1)
            updateNext(false)
            updateLoading(false)
        }
    };

    const { register, handleSubmit, watch } = useForm<Inputs>(
        {
            defaultValues: {
                name: '',
                status: ''
            }
        }
    );
    const onSubmit: SubmitHandler<Inputs> = () => {
        updatePage(1)
    };

    const filterName = watch('name');
    const filterStatus = watch('status');

    useEffect(() => {
        updateLoading(true)
        fetchItems( page, { name: filterName, status: filterStatus })
    }, [page, filterName, filterStatus]);

    useEffect(() => {
        updatePage(1);
    }, [filterName, filterStatus])

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center'>
            name:
            <input type="text" {...register("name")} />
            status:
            <select {...register("status")}>
                <option value="">Not selected</option>
                <option value="alive">alive</option>
                <option value="dead">dead</option>
                <option value="unknown">unknown</option>
            </select>

        </form>
        <Pagination page={page} next={next} loading={loading} pages={pages} updatePage={(page) => updatePage(page)} />

        {loading 
        ? <p>Loading...</p>
    :  <ul className='flex gap-3 flex-wrap justify-center'>
    {characters.map((character: ICharacter) => {
        return (<li className='list-none flex bg-cover bg-no-repeat w-[200px] h-[200px] sepia-[.5]'
            key={character.id + character.name}
            style={{ backgroundImage: `url(${character.image})`}}>
            <Link href={'characters/' + character.id} className='text-white font-bold backdrop-brightness-75 hover:backdrop-brightness-50 cursor-pointer flex justify-end w-full flex-col'>
            <h4>{character.name}</h4>
            <p>{character.species ?? '-'} - {character.status}</p>
            </Link>

        </li>)
    })}
</ul>}

       
    </>)
}

export default Characters;