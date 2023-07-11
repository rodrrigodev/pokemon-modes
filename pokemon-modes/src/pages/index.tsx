import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export interface Pokemon {
  id: string
  name: string
  image: string
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  console.log(pokemon)

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json',
      )
      setPokemon(await resp.json())
    }

    getPokemon()
  }, [])

  return (
    <>
      <Head>
        <title>Pokemon List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.main}>
        {pokemon.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <Link className={styles.card} href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  height={300}
                  width={300}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
