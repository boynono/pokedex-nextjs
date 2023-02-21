import Layout from "components/Layout";

export default function Pokemon({ pokemon }) {
  return (
    <Layout title="detail Pokemon">
      <h1 className="text-4xl mb-2 text-center capitalize">
        {pokemon.id}. {pokemon.name}
      </h1>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const baseUrl = "https://pokeapi.co";
  const assetsUrl = "https://assets.pokemon.com";
  const { id } = ctx.query;
  const res = await fetch(baseUrl + `/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  const paddedId = ("00" + id).slice(-3);
  const image = assetsUrl + `/assets/cms2/img/pokedex/detail/${paddedId}.png`;

  return {
    props: {
      pokemon,
    },
  };
}
