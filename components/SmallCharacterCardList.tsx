import Link from "next/link";
import { ICharacter } from "../models/Character";

function SmallCharacterCardList({characters}: {characters: ICharacter[]}) {
    return <>
        {!!characters?.length
            ? <ul className='flex flex-wrap gap-2'>
                {characters?.map((character: ICharacter) => {
                    return (
                        <li className='list-none flex bg-cover  bg-no-repeat w-[150px] h-[150px]'
                        key={character.id}
                        style={{ backgroundImage: `url(${character.image})` }}>
                        <Link href={'/characters/' + character.id} 
                        className='text-white font-bold backdrop-brightness-75 hover:backdrop-brightness-50 cursor-pointer flex justify-end w-full flex-col'>
                            <h4>{character.name}</h4>
                            <p>{character.species ?? '-'} - {character.status}</p>
                        </Link>
                    </li>
                    )
                }
                    
                )}
            </ul>
            : 'No characters here...'}
       
        </>
}

export default SmallCharacterCardList;