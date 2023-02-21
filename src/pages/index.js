import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "../../components/Layout";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ pokemons }) {
  return (
    <Layout title="PokeDex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
      {console.log("pokemon>", pokemons, typeof pokemons)}
      <ul>
        {pokemons.map((item, index) => (
          <div key={index}>
            <Link href={`pokemon/${index + 1}`}>
              <div className="bordered p-4 my-4 hover:shadow-lg flex items-center text-lg text-center bg-white rounded-lg">
                <img src={item.image} width="100" height="100"></img>
                <div>{item.name.toUpperCase()}</div>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const baseUrl = "https://pokeapi.co";
  const assetsUrl = "https://assets.pokemon.com";
  const res = await fetch(baseUrl + "/api/v2/pokemon?limit=10");
  const { results } = await res.json();
  const pokemons = results.map((pokemon, index) => {
    const paddedId = ("00" + (index + 1)).slice(-3);
    const image = assetsUrl + `/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokemon, image };
  });

  // const has = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  // const {hasil} = await has.json();

  return {
    props: {
      pokemons,
      // results,
      // hasil
    },
  };
}
