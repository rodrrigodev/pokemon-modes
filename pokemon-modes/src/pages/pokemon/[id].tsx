import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

interface Pokemon {
  name: string
  type: string[]
  stats: { name: string; value: number }[]
  image: string
}

export default function Details() {
  const {
    query: { id },
  } = useRouter()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`,
      )
      setPokemon(await resp.json())
    }

    if (id) {
      getPokemon()
    }
  }, [id])

  return (
    <>
      {pokemon && (
        <div className={styles.card}>
          <Image
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            height={300}
            width={300}
            alt={pokemon.name}
          />
          <h3>{pokemon.name}</h3>
          <span>{pokemon.type.join(', ')}</span>
          <tbody>
            {pokemon.stats.map(({ name, value }) => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{value}</td>
                </tr>
              )
            })}
          </tbody>
        </div>
      )}
    </>
  )
}
