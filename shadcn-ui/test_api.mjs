async function testAPI() {
  try {
    console.log('Testing Pokémon TCG API...');
    const response = await fetch('https://api.pokemontcg.io/v2/cards?q=supertype:Pokémon&page=1&pageSize=20&orderBy=-set.releaseDate');
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const data = await response.json();
    console.log('Cards returned:', data.data?.length || 0);
    console.log('Total count:', data.totalCount);
    
    if (data.data && data.data.length > 0) {
      console.log('First card:', {
        id: data.data[0].id,
        name: data.data[0].name,
        set: data.data[0].set.name,
        image: data.data[0].images.small
      });
    }
  } catch (error) {
    console.error('API Error:', error.message);
  }
}

testAPI();
