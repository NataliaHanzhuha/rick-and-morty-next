'use client';

import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { EPISODES_QUERY } from "@/graphql/RickAndMortyApi";
import { IEpisode } from "@/models/Episode";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "react-use";

interface characterListProps {

}

type FilterEpisode = {
    name: string,
    episode: string
}

const Episodes: FC<characterListProps> = () => {
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
    const [page, updatePage] = useState<number>(1);
    const [next, updateNext] = useState<boolean>(true);
    const [pages, updatePages] = useState<number>(1);

    const { register, watch, handleSubmit, getValues } = useForm<FilterEpisode>(
        {
            defaultValues: {
                name: '',
                episode: ''
            }
        }
    );

    const onSubmit: SubmitHandler<FilterEpisode> = () => {
        // updatePage(1)
    };


    const filter = watch();
    const [, cancel] = useDebounce(
        () => {
            refetch({ page: page, filter: getValues() });
        },
        500,
        [filter.name, filter.episode, page]
    );

    const { data, loading, refetch } = useQuery(EPISODES_QUERY, {
        variables: {
            page: page,
            filter: getValues()
        }
    });

    useEffect(() => {
        if (!loading) {
            setEpisodes(data?.episodes?.results ?? []);
            updatePages(data?.episodes?.info?.pages ?? 1)
            updateNext(!!data?.episodes?.info?.next ?? false);
        }
    }, [data, loading])

    useEffect(() => {
        updatePage(1);
    }, [filter.name, filter.episode])

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
            <label className='form-label' htmlFor='inputName' >Name:</label>
            <input type="text" className='input-text' {...register("name")} id="inputName" />

            <label className='form-label' htmlFor='inputEpisode' >Episode:</label>
            <input type="text" className='input-text' {...register("episode")} id="inputEpisode" />

            <Pagination page={page} next={next} loading={loading} pages={pages} updatePage={(page) => updatePage(page)} />

        </form>
        {
            loading
                ? <Loading />
                : <ul className='list-wrapper'>
                    {episodes.map((episode: IEpisode) => {
                        return (<li className='list-none flex w-[220px] h-[150px]'
                            key={episode.id}>
                            <Link href={'/episodes/' + episode.id}
                                className='list-link'>
                                <h2 className="font-bold text-accent">{episode.name}</h2>
                                <p className="text-biege">{episode.episode}</p>
                            </Link>
                        </li>)
                    })}
                </ul>
        }</>
}

export default Episodes;