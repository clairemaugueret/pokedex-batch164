import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import styles from "../styles/Home.module.css";

const baseDeck = [
  { id: 1,
    name: "Carine",
    type: "Final Boss",
    image: "/carine.png",
    style: "style1",
  },
  {
    id: 2,
    name: "Clément T.",
    type: "Mini Boss",
    image: "/clementt.jpg",
    style: "style1",
  },
  {
    id: 3,
    name: "Delphine V.",
    type: "Concert Pal",
    image: "/delphinev.jpg",
    style: "style2",
  },
  {
    id: 4,
    name: "Benjamin P.",
    type: "Concert Pal",
    image: "/benjaminp.jpg",
    style: "style2",
  },
  {
    id: 5,
    name: "Clément M.",
    type: "Concert Pal",
    image: "/clementm.jpg",
    style: "style2",
  },
  {
    id: 6,
    name: "Quentin R.",
    type: "Concert Pal",
    image: "/quentinr.jpg",
    style: "style2",
  },
  {
    id: 7,
    name: "Claire M.",
    type: "ArtLinker",
    image: "/clairem.jpg",
    style: "style3",
  },
  {
    id: 8,
    name: "Thomas V.",
    type: "ArtLinker",
    image: "/thomasv.jpg",
    style: "style3",
  },
  {
    id: 9,
    name: "Raphaël B.",
    type: "ArtLinker",
    image: "/raphaelb.jpg",
    style: "style3",
  },
  {
    id: 10,
    name: "Fatoumata L.",
    type: "ArtLinker",
    image: "/fatoumatal.jpg",
    style: "style3",
  },
  {
    id: 11,
    name: "Mylène W.",
    type: "UniMap+",
    image: "/mylenew.jpg",
    style: "style4",
  },
  { id: 12,
    name: "Karel B.",
    type: "UniMap+",
    image: "/karelb.jpg",
    style: "style4",
  },
  {
    id: 13,
    name: "Matteo P.",
    type: "UniMap+",
    image: "/matteop.jpg",
    style: "style4",
  },
  { id: 14,
    name: "Salim B.",
    type: "UniMap+",
    image: "/salimb.jpg",
    style: "style4",
  },
  {
    id: 15,
    name: "Cécilia P.",
    type: "BGlicious",
    image: "/ceciliap.jpg",
    style: "style5",
  },
  {
    id: 16,
    name: "Anthony E.",
    type: "BGlicious",
    image: "/anthonye.jpg",
    style: "style5",
  },
  { id: 17,
    name: "Imad M.",
    type: "BGlicious",
    image: "/imadm.jpg",
    style: "style5",
  },
  {
    id: 18,
    name: "Lionel F.",
    type: "BGlicious",
    image: "/lionelf.jpg",
    style: "style5",
  },
  {
    id: 19,
    name: "Pierre C.",
    type: "Ça veille!",
    image: "/pierrec.jpg",
    style: "style6",
  },
  {
    id: 20,
    name: "Thomas M.",
    type: "Ça veille!",
    image: "/thomasm.jpg",
    style: "style6",
  },
  {
    id: 21,
    name: "Michaël M.",
    type: "Ça veille!",
    image: "/michaelm.jpg",
    style: "style6",
  },
  { id: 22,
    name: "Ewa L.",
    type: "Ça veille!",
    image: "/ewal.jpg",
    style: "style6",
  },
  {
    id: 23,
    name: "Manon D.",
    type: "Troc'Food",
    image: "/manond.jpg",
    style: "style7",
  },
  {
    id: 24,
    name: "Florian M.",
    type: "Troc'Food",
    image: "/florianm.jpg",
    style: "style7",
  },
  { id: 25,
    name: "Lisa L.",
    type: "Troc'Food",
    image: "/lisal.jpg",
    style: "style7",
  },
  {
    id: 26,
    name: "Margaux C.",
    type: "Troc'Food",
    image: "/margauxc.jpg",
    style: "style7",
  },
  { id: 27,
    name: "Omar D.",
    type: "Troc'Food",
    image: "/omard.jpg",
    style: "style7",
  },
];

function shuffleDeck(deck) {
  return [...deck].sort(() => Math.random() - 0.5);
}

function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [newDeck, setNewDeck] = useState([]);
  const pokemonsPerClick = 6;

  useEffect(() => {
    setNewDeck(shuffleDeck(baseDeck));
  }, []);
  
  useEffect(() => {
    if (newDeck.length > 0) {
      fetchPokemons();
    }
  }, [newDeck]);

  const fetchPokemons = () => {
    let newPokemons = [];
    for (let i = startIndex; i < startIndex + pokemonsPerClick; i++) {
      if (newDeck[i]) {
        newPokemons.push(newDeck[i]);
      }
    }
  
    setPokemonsData(prev => [...prev, ...newPokemons]);
    setStartIndex(prev => prev + pokemonsPerClick);
  };

  const pokemons = pokemonsData.map((data, i) => {
    return (
      <Pokemon
        key={i}
        {...data}
      />
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokedex - La Capsule </h1>
      <h2 className={styles.subtitle}>Batch #164</h2>


      <div className={styles.pokemonContainer}>{pokemons}</div>

      <button onClick={() => fetchPokemons()} className={styles.next}>
        Next
      </button>
    </div>
  );
}

export default Home;
