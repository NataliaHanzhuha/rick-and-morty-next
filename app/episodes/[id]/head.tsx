'use client';

import { FC } from "react"

interface characterListProps {
params: {id: string[]}
}

const Head: FC<characterListProps> = ({params}) => {
  const [id] = params.id
  console.log(params, id)
    return (
        <>
            <title>{id}</title>
        </>
    )
}

export default Head