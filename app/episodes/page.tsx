'use client';

import Pagination from "@/components/Pagination";
import { EPISODES_QUERY, getFilteredItems } from "@/graphql/RickAndMortyApi";
import { IEpisode } from "@/models/Episode";
import Link from "next/link";
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

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
    const [loading, updateLoading] = useState<boolean>(true);

    const { register, watch, handleSubmit } = useForm<FilterEpisode>(
        {
            defaultValues: {
                name: '',
                episode: ''
            }
        }
    );

    const onSubmit: SubmitHandler<FilterEpisode> = () => {
        updatePage(1)
    };

    const filterName = watch('name');
    const filterEpisode = watch('episode');

    const fetchItems = async (page: number = 1, filter: FilterEpisode = { name: '', episode: ''}) => {
        try {
            const data: any = await getFilteredItems(page, filter, EPISODES_QUERY);
            setEpisodes(data.episodes.results);
            updatePages(data?.episodes?.info?.pages)
            updateNext(!!data?.episodes?.info?.next)
            updateLoading(false)
        } catch (error) {
            setEpisodes([]);
            updatePages(1)
            updateNext(false)
            updateLoading(false)
        }
    };

    useEffect(() => {
        fetchItems(page, { name: filterName, episode: filterEpisode })
    }, [page, filterName, filterEpisode]);

    useEffect(() => {
        updatePage(1);
    }, [filterName, filterEpisode])

    return (<>

        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
            name:
            <input type="text" {...register("name")} />
            episode:
            <input type="text" {...register("episode")} />

        </form>

        <Pagination page={page} next={next} loading={loading} pages={pages} updatePage={(page) => updatePage(page)} />

        <ul className='flex gap-3 flex-wrap justify-center'>
            {episodes.map((episode: IEpisode) => {
                return (<li className='list-none flex bg-cover  bg-no-repeat w-[250px] h-[150px]'
                    key={episode.id}>
                    <Link href={'/episodes/' + episode.id}
                        className='text-white font-bold backdrop-brightness-75 hover:backdrop-brightness-50 cursor-pointer flex justify-center w-full flex-col'>
                        <h2>{episode.name}</h2>
                        <p>{episode.episode}</p>
                    </Link>
                </li>)
            })}
        </ul>
    </>)
}

export default Episodes;