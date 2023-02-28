import Layout from "components/Layout";
import Link from "next/link";

export default function Pokemon({ image, pokemonDetails, pokemonSpecies }) {
  console.log(pokemonDetails);
  console.log(image);
  console.log(pokemonSpecies);
  return (
    <Layout title='detail Pokemon'>
      <div>
        <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
          <div>
            <img src={image} width='100' height='100'></img>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {pokemonDetails.name.toUpperCase()}
            </h2>
            <p className='mt-4 text-gray-500'>
              {pokemonSpecies.flavor_text_entries[6].flavor_text}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const baseUrl = "https://pokeapi.co";
  const assetsUrl = "https://raw.githubusercontent.com";
  const { id } = ctx.query;

  try {
    const image =
      assetsUrl +
      `/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const [res1, res2] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const [pokemonDetails, pokemonSpecies] = await Promise.all([
      res1.json(),
      res2.json(),
    ]);

    return {
      props: {
        pokemonDetails,
        pokemonSpecies,
        image,
      },
    };
  } catch (error) {
    return { error };
  }
}
