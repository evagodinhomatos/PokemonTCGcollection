export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  images: {
    small: string;
    large: string;
  };
  rarity?: string;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
      standard?: string;
      expanded?: string;
    };
    ptcgoCode?: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number: string;
  artist?: string;
  nationalPokedexNumbers?: number[];
}

export interface SearchResponse {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface PokedexEntry {
  id: number;
  name: string;
  sprite: string;
}

export interface SetInfo {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  releaseDate: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface SetsResponse {
  data: SetInfo[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

interface PokeApiPokemon {
  name: string;
  url: string;
}

interface PokeApiResponse {
  results: PokeApiPokemon[];
}

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const API_URL = 'https://api.pokemontcg.io/v2';
const POKEAPI_URL = 'https://pokeapi.co/api/v2';

// Simple in-memory cache for API responses
const apiCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(url: string, options?: RequestInit): Promise<Response> {
  const cacheKey = url;
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cached.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const response = await fetch(url, options);
  
  if (response.ok) {
    const data = await response.json();
    apiCache.set(cacheKey, { data, timestamp: Date.now() });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return response;
}

export async function searchCards(query: string = '', page: number = 1, setId?: string): Promise<SearchResponse> {
  let q = query ? `name:"*${query}*"` : 'supertype:Pokémon';
  
  if (setId) {
    q += ` set.id:${setId}`;
  }
  
  const response = await cachedFetch(`${API_URL}/cards?q=${q}&page=${page}&pageSize=20&orderBy=-set.releaseDate`, {
    headers: {
      // It's best practice to use an API key, but for a demo, the free tier without key works with rate limits.
      // 'X-Api-Key': 'YOUR_API_KEY' 
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }

  return response.json();
}

export async function getCard(id: string): Promise<{ data: PokemonCard }> {
  const response = await cachedFetch(`${API_URL}/cards/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch card');
  }
  return response.json();
}

export async function getPokedex(limit: number = 1025): Promise<PokedexEntry[]> {
  const response = await cachedFetch(`${POKEAPI_URL}/pokemon?limit=${limit}&offset=0`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokédex');
  }
  
  const data: PokeApiResponse = await response.json();
  
  return data.results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }));
}

export async function getCardsByPokemon(pokemonName: string, page: number = 1, setId?: string): Promise<SearchResponse> {
  let q = `name:"${pokemonName}"`;
  
  if (setId) {
    q += ` set.id:${setId}`;
  }
  
  const response = await cachedFetch(`${API_URL}/cards?q=${q}&page=${page}&pageSize=50&orderBy=-set.releaseDate`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cards for Pokémon');
  }

  return response.json();
}

export async function getSets(page: number = 1): Promise<SetsResponse> {
  const response = await cachedFetch(`${API_URL}/sets?page=${page}&pageSize=250&orderBy=-releaseDate`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch sets');
  }

  return response.json();
}