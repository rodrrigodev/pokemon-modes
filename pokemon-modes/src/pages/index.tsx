import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

interface Pokemon {
  pokemon: {
    id: string
    name: string
    image: string
  }[]
}

export default function Home({ pokemon }: Pokemon) {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const resp = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json',
  )

  const x = await resp.json()
  console.log(x)
  return {
    props: {
      pokemon: x,
    },
  }
}
