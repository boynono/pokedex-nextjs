import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ pokemons }) {
  return (
    <Layout title="PokeDex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            {pokemons.map((item, index) => (
              <Link key={index} href={`pokemon/${index + 1}`} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {item.name.toUpperCase()}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900"></p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const baseUrl = "https://pokeapi.co";
  const assetsUrl = "https://raw.githubusercontent.com";

  try {
    const res = await axios.get(baseUrl + "/api/v2/pokemon?limit=10");
    const pokemons = res.data.results.map((pokemon, index) => {
      const image =
        assetsUrl +
        `/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          index + 1
        }.png`;
      return { ...pokemon, image };
    });
    // console.log(pokemons);
    return {
      props: {
        pokemons,
      },
    };
  } catch (error) {
    return { error };
  }
}
