import Link from "next/link";
import { ICharacter } from "../models/Character";

function SmallCharacterCardList({characters, size = 150, styles = ''}: {characters: ICharacter[], size?: number, styles?: string}) {
    const imgSize =` w-[${size}px] min-w-[${size}px] h-[${size}px]`;
    const statusColor = (status: string) => {
        switch(status) {
            case 'Alive': return 'green';
            case 'Dead': return 'red';
            case 'unknown': return 'gray';
        }
    }

    return <>
        {!!characters?.length
            ? <ul className={'flex flex-wrap justify-center content-start overflow-auto gap-2 ' + styles}>
                {characters?.map((character: ICharacter) => 
                        <li className={'list-none flex bg-cover bg-no-repeat rounded-lg' + imgSize}
                        key={character.id}
                        style={{ backgroundImage: `url(${character.image})`, width: `${size}px` }}>
                        <Link href={'/characters/' + character.id} 
                        className='card-text-bg text-biege p-2 backdrop-brightness-75 hover:backdrop-brightness-50 cursor-pointer flex justify-end w-full flex-col'>
                            <h4 className="font-bold ">{character.name}</h4>
                            <p className="inline-flex gap-2 items-baseline">{character.species ?? '-'}
                                <span className="rounded-full w-3 h-3" 
                                style={{backgroundColor: statusColor(character.status)}}></span>
                            </p>
                        </Link>
                    </li>
                )}
            </ul>
            : 'No characters here...'}
       
        </>
}

export default SmallCharacterCardList;