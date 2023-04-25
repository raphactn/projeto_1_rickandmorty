import Image from "next/image"

export const Card = ({personagem}) => {
    return (
        <div>
            <Image src={personagem.image} width={'300'} height={'300'}/>
            <h1>{personagem.name}</h1>
        </div>
    )
}