import Layout from "components/Layout";
import Link from "next/link";

const features = [
  { name: "Origin", description: "Designed by Good Goods, Inc." },
  {
    name: "Material",
    description:
      "Solid walnut base with rare earth magnets and powder coated steel card cover",
  },
  { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
  { name: "Finish", description: "Hand sanded and finished with natural oil" },
  { name: "Includes", description: "Wood card tray and 3 refill packs" },
  {
    name: "Considerations",
    description:
      "Made from natural materials. Grain and color vary with each item.",
  },
];

export default function Pokemon({ pokemon, image, flavor_text_entries }) {
  console.log(flavor_text_entries);
  return (
    <Layout title='detail Pokemon'>
      <Link href='/'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Home
        </button>
      </Link>
      <div className='bg-white'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
          <div>
            <img src={image} width='100' height='100'></img>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {pokemon.name.toUpperCase()}
            </h2>
            <p className='mt-4 text-gray-500'>
              {/* {pokemon.flavor_text_entries[6].flavor_text} */}
            </p>

            <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className='border-t border-gray-200 pt-4'
                >
                  <dt className='font-medium text-gray-900'>{feature.name}</dt>
                  <dd className='mt-2 text-sm text-gray-500'>
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8'>
            <img
              src='https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg'
              alt='Walnut card tray with white powder coated steel divider and 3 punchout holes.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg'
              alt='Top down view of walnut card tray with embedded magnets and card groove.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg'
              alt='Side of walnut card tray with card groove and recessed card area.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg'
              alt='Walnut card tray filled with cards and card angled in dedicated groove.'
              className='rounded-lg bg-gray-100'
            />
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
  const res = await fetch(baseUrl + `/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  const image =
    assetsUrl +
    `/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const desc = await fetch(baseUrl + `/api/v2/pokemon-species/${id}`);
  // const { results } = await res.json();
  const { flavor_text_entries } = await res.json();
  // const pokemon = results.map((pokemons, index) => {
  //   const des = pokemon.flavor_text_entries;
  //   return { ...pokemons, des };
  // });
  return {
    props: {
      pokemon,
      image,
      flavor_text_entries,
    },
  };
}
// https://pokeapi.co/api/v2/pokemon-species/1
