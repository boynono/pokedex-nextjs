import Layout from "components/Layout";
import Link from "next/link";

export default function Pokemon({ image, pokemonDetails, pokemonSpecies }) {
  // console.log(pokemonDetails);
  // console.log(image);
  console.log(pokemonSpecies.color.name);
  // var color = pokemonSpecies?.color?.name
  //   ? "bg-" + pokemonSpecies.color.name + "-900"
  //   : "bg-gray-900";
  let color = { backgroundColor: `bg-${pokemonSpecies.color.name}-500` };
  // var color = "bg-yellow-900";
  console.log(color);
  return (
    <Layout title='detail Pokemon'>
      {/* <div style={color}> */}
      {/* <div style={{ backgroundColor: `${pokemonSpecies.color.name}` }}> */}
      {/* <div style={{ backgroundColor: `bg-${pokemonSpecies.color.name}-900` }}> */}
      <div className={`bg-${pokemonSpecies.color.name}-500`}>
        <div className='flex flex-col'>
          <div className='hero container max-w-screen-lg mx-auto pb-10 justify-center'>
            <div>
              <img src={image} className='mx-auto'></img>
            </div>
            <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {pokemonDetails.name.toUpperCase()}
            </h2>
          </div>
          <p className='mt-4 text-gray-500 text-justify'>
            {pokemonSpecies.flavor_text_entries[6].flavor_text}
          </p>
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
