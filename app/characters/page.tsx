"use client";

import React, { useEffect, useState, FC } from 'react';
import { CHARACTERS_QUERY, getFilteredItems } from '@/graphql/RickAndMortyApi';
import { ICharacter } from '@/models/Character';
import Pagination from '@/components/Pagination';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import SmallCharacterCardList from '@/components/SmallCharacterCardList';
import { useDebounce } from 'react-use';

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
    const [pages, updatePages] = useState<number>(1);

    const { register, handleSubmit, watch, getValues } = useForm<Inputs>(
        {
            defaultValues: {
                name: '',
                status: ''
            }
        }
    );
    const onSubmit: SubmitHandler<Inputs> = () => {
        // updatePage(1)
    };

    const filter = watch();
    const [, cancel] = useDebounce(
        () => {
            refetch({page: page, filter: getValues()});
        },
        500,
        [filter, page]
      );

    const { data, loading, refetch } = useQuery(CHARACTERS_QUERY, {
        variables: {
            page: page,
            filter: getValues()
        }
    });

    useEffect(() => {
        if (!loading) {
            setCharacters(data?.characters?.results ?? []);
            updatePages(data?.characters?.info?.pages ?? 1)
            updateNext(!!data?.characters?.info?.next ?? false);
        }
    }, [data, loading])

    useEffect(() => {
        updatePage(1);
    }, [filter])

    return (<>

        <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper' >
            <label className='form-label' htmlFor='inputName' >Name:</label>
            <input type="text" className='input-text' {...register("name")} id="inputName" />

            <label className='form-label' htmlFor='selectStatus'>Status:</label>
            <select {...register("status")} id='selectStatus'>
                <option value="">Not selected</option>
                <option value="alive">alive</option>
                <option value="dead">dead</option>
                <option value="unknown">unknown</option>
            </select>
            <Pagination page={page} next={next} loading={loading} pages={pages} updatePage={(page) => updatePage(page)} />
        </form>

        {loading
            ? <p>Loading...</p>
            : <SmallCharacterCardList characters={characters} size={200} styles="owerflow-auto max-h-[90vh]" />
        }

    </>)
}

export default Characters;