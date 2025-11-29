const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing Pokémon TCG API...');
    const response = await fetch('https://api.pokemontcg.io/v2/cards?q=supertype:Pokémon&page=1&pageSize=20&orderBy=-set.releaseDate');
    const data = await response.json();
    console.log('API Response Status:', response.status);
    console.log('Cards returned:', data.data?.length || 0);
    console.log('First card:', data.data?.[0]?.name || 'None');
    console.log('First set:', data.data?.[0]?.set?.name || 'None');
  } catch (error) {
    console.error('API Error:', error.message);
  }
}

testAPI();
