import Image from 'next/image'
import styles from '../../styles/Details.module.css'
import { GetServerSideProps } from 'next'

interface Pokemon {
  pokemon: {
    name: string
    type: string[]
    stats: { name: string; value: number }[]
    image: string
  }
}

export default function Details({ pokemon }: Pokemon) {
  console.log(pokemon)
  return (
    <>
      {pokemon && (
        <div className={styles.card}>
          <div>
            <Image
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              height={300}
              width={300}
              alt={pokemon.name}
            />
          </div>

          <div>
            <h2>{pokemon.name}</h2>
            <span className={styles.type}>Type: {pokemon.type.join(', ')}</span>

            <>
              <tbody>
                {pokemon.stats.map(({ name, value }) => {
                  return (
                    <tr key={name}>
                      <td className={styles.td}>{name}</td>
                      <td>{value}</td>
                    </tr>
                  )
                })}
              </tbody>
            </>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params?.id)
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`,
  )

  return {
    props: {
      pokemon: await resp.json(),
    },
  }
}
