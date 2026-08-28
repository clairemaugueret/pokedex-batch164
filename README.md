# Pokédex — Batch #164

Petit projet parallèle réalisé pendant ma formation à La Capsule : un Pokédex qui, au lieu de Pokémon, présente les **27 membres de mon batch** — élèves et équipe pédagogique — sous forme de cartes à collectionner, chacune associée à un « type » et à une couleur.

L'exercice initial de la formation consistait à consommer une API de Pokémon dans une application Next.js. J'ai détourné la consigne pour en faire un side-project plus court et plus personnel, avec un objectif technique précis : **travailler les animations et les effets CSS** — glassmorphism, halos lumineux animés au survol et variables CSS pilotées depuis React.

## Stack technique

| Rôle         | Techno                                                  |
| ------------ | ------------------------------------------------------- |
| Framework    | Next.js 12 (Pages Router)                               |
| UI           | React 18                                                |
| Styles       | CSS Modules, sans framework ni librairie d'animation    |
| Typographies | Nabla et Bebas Neue (Google Fonts)                      |
| Tests        | Jest + React Testing Library (configurés, non utilisés) |

Aucune dépendance de style : tous les effets sont écrits à la main en CSS.

## Installation

```bash
yarn install
yarn dev
```

L'application démarre sur `http://localhost:3001`.

| Commande     | Description                          |
| ------------ | ------------------------------------ |
| `yarn dev`   | Serveur de développement (port 3001) |
| `yarn build` | Build de production                  |
| `yarn start` | Sert le build de production          |
| `yarn lint`  | Linter Next.js                       |

Il n'y a ni backend, ni base de données, ni variable d'environnement : les données sont statiques et les images servies depuis [public/](public/).

## Architecture

```
pages/                 routes Next.js et configuration globale
components/            les 2 composants de l'application
styles/                CSS Modules et styles globaux
public/                les 27 portraits du batch
```

| Fichier                                        | Rôle                                               |
| ---------------------------------------------- | -------------------------------------------------- |
| [pages/\_app.js](pages/_app.js)                | Styles globaux et titre de la page                 |
| [pages/index.js](pages/index.js)               | Unique route, rend le composant `Home`             |
| [components/Home.js](components/Home.js)       | Jeu de cartes, mélange, affichage progressif       |
| [components/Pokemon.js](components/Pokemon.js) | Une carte : portrait, nom, type et couleur de halo |

## Données

Les 27 cartes sont définies en dur dans le tableau `baseDeck` de [Home.js](components/Home.js). Chaque entrée porte un `id`, un `name`, un `type`, le chemin de l'`image` et une clé de `style` :

```js
{ id: 7, name: "Claire M.", type: "ArtLinker", image: "/clairem.png", style: "style3" }
```

Le `type` est un clin d'œil aux types Pokémon : il reprend le nom du **projet de fin de formation** de chaque groupe. L'équipe pédagogique a droit à ses propres types : `Final Boss` pour la teacher, `Mini Boss` pour le teacher assistant.

La clé `style` détermine la couleur du halo de la carte : les membres d'un même projet partagent donc la même couleur, ce qui donne à chaque équipe son identité visuelle et rend les groupes lisibles d'un coup d'œil, même une fois le jeu mélangé.

| Type                                            | Couleur du halo        |
| ----------------------------------------------- | ---------------------- |
| `Final Boss` / `Mini Boss` — équipe pédagogique | `#DCDAD3` — gris clair |
| `Concert Pal`                                   | `#F376B5` — rose       |
| `ArtLinker`                                     | `#E7341B` — rouge      |
| `UniMap+`                                       | `#49D6F3` — cyan       |
| `Mouais.`                                       | `#9162F0` — violet     |
| `Ça veille!`                                    | `#F1C40F` — jaune      |
| `Troc'Food`                                     | `#97D345` — vert       |

## Fonctionnement

**Mélange du jeu au chargement** — un `useEffect` monté une seule fois passe `baseDeck` dans `shuffleDeck()`, qui en renvoie une copie mélangée (`[...deck].sort(() => Math.random() - 0.5)`). L'ordre des cartes change donc à chaque rechargement de la page. La copie évite de muter le tableau d'origine.

**Affichage progressif** — les cartes ne sont pas toutes affichées d'emblée : `fetchPokemons()` en ajoute 6 à chaque clic sur le bouton _Next_, en avançant un `startIndex`. Un second `useEffect`, déclenché quand le jeu mélangé est prêt, affiche la première fournée automatiquement.

**Fin du jeu** — la boucle vérifie l'existence de `newDeck[i]` avant d'empiler une carte : passé la 27ᵉ, le bouton n'ajoute plus rien plutôt que de produire des cartes vides.

## Effets CSS

C'est le cœur du projet — l'essentiel du travail se trouve dans [styles/Pokemon.module.css](styles/Pokemon.module.css).

**Variables CSS pilotées depuis React** — plutôt que d'écrire sept classes de couleur, [Pokemon.js](components/Pokemon.js) associe la clé `style` de la carte à une couleur, puis l'injecte comme variable CSS personnalisée dans l'attribut `style` de l'élément :

```js
const cssVars = { "--glow-color": glowColor };
```

Le CSS consomme ensuite `var(--glow-color)` sans jamais connaître les couleurs. Une seule règle sert les sept variantes, et ajouter un type revient à ajouter une ligne dans l'objet `styleColors`.

**Glassmorphism** — les cartes et le bouton combinent un fond blanc très transparent (`rgba(255, 255, 255, 0.05)`), un `backdrop-filter: blur(15px)`, des bordures claires en haut et en bas, et une ombre portée. Sur le fond dégradé violet du `body`, l'ensemble donne l'impression d'un verre dépoli.

**Halos animés au survol** — chaque carte porte deux pseudo-éléments `::before` et `::after`, positionnés comme deux petites barres lumineuses qui dépassent en haut et en bas de la carte. Leur lueur vient d'un empilement de quatre `box-shadow` de rayons croissants (5px, 15px, 30px, 60px) dans la couleur du type.

Au survol, ces deux barres s'étendent jusqu'à occuper toute la carte (`height: 100%`, `width: 100%`), adoptent son arrondi et redescendent à `opacity: 0.25`. Le résultat : la carte s'illumine intégralement de sa couleur. La transition de `0.3s` porte sur l'ensemble, et le `z-index: -1` maintient les halos derrière le contenu.

**Typographie** — le titre utilise **Nabla**, une police OpenType en couleur qui s'affiche en dégradé sans aucun style supplémentaire, tandis que le reste de l'interface est en **Bebas Neue**.

## Déploiement

Application statique déployable sur Vercel sans configuration : `yarn build` suffit, aucune variable d'environnement n'étant nécessaire.

## Points à traiter avant une mise en production

Ce projet a été écrit vite, pour le plaisir — voici ce qui mériterait d'être repris :

- [components/Home.js](components/Home.js) — les cartes sont indexées par leur position (`key={i}`) plutôt que par leur `id`, alors que celui-ci est disponible dans les données.
- [components/Home.js](components/Home.js) — le bouton _Next_ reste affiché une fois les 27 cartes révélées, sans effet ; il pourrait être masqué ou proposer de rejouer.
- [styles/Pokemon.module.css](styles/Pokemon.module.css) — les pseudo-éléments sont en `position: absolute` sans `position: relative` sur `.pokemon`, et se positionnent donc par rapport à un ancêtre plus lointain. Le rendu obtenu est celui recherché, mais il tient à la mise en page environnante.
- [styles/Home.module.css](styles/Home.module.css) — `background-color: "#fceaff"` est entouré de guillemets, ce qui rend la déclaration invalide et sans effet ; la règle peut être supprimée.
- Les blocs `::before` et `::after` sont dupliqués à l'identique à quelques propriétés près et pourraient être factorisés.
- Le rendu n'est pas optimisé pour mobile : les cartes se répartissent en `flex-wrap` mais rien n'a été ajusté pour les petits écrans.
- Les images sont servies par des balises `<img>` classiques plutôt que par `next/image`, donc sans optimisation automatique.
- Jest et React Testing Library sont configurés ([jest.config.js](jest.config.js)) mais aucun test n'a été écrit.

## Ce que ce projet m'a appris

- Piloter du CSS depuis React grâce aux variables CSS personnalisées, pour éviter de multiplier les classes de variantes.
- Construire des effets lumineux à partir de pseudo-éléments et d'empilements de `box-shadow`.
- Obtenir un effet de verre dépoli en combinant transparence, `backdrop-filter` et bordures partielles.
- Animer une transformation de forme au survol (une barre qui devient une carte entière) avec une seule transition.
- Gérer un affichage progressif à partir d'un index et d'un jeu de données mélangé.
- Détourner un exercice imposé pour en faire un terrain d'expérimentation personnel.

## Auteur

Projet individuel réalisé pendant la formation développeur web full-stack de La Capsule — Claire Mauguéret, 2025.
