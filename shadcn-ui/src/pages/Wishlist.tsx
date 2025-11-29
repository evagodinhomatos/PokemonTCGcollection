import { useState, useMemo } from 'react';
import { useWishlist, useCollection } from '@/lib/store';
import { PokemonCard as PokemonCardType } from '@/lib/pokemon';
import { PokemonCard } from '@/components/PokemonCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Package, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { collection } = useCollection();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSet, setSelectedSet] = useState<string>('');

  // Get unique sets from both wishlist and collection
  const availableSets = useMemo(() => {
    const allCards = [...wishlist, ...collection];
    const setMap = new Map<string, { id: string; name: string; series: string }>();
    allCards.forEach((card) => {
      if (!setMap.has(card.set.id)) {
        setMap.set(card.set.id, {
          id: card.set.id,
          name: card.set.name,
          series: card.set.series,
        });
      }
    });
    return Array.from(setMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [wishlist, collection]);

  // Filter function for cards
  const filterCards = (cards: PokemonCardType[]) => {
    return cards.filter((card) => {
      const matchesSearch = searchQuery === '' ||
        card.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSet = selectedSet === '' || card.set.id === selectedSet;
      return matchesSearch && matchesSet;
    });
  };

  const filteredWishlist = useMemo(() => filterCards(wishlist), [wishlist, searchQuery, selectedSet]);
  const filteredCollection = useMemo(() => filterCards(collection), [collection, searchQuery, selectedSet]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedSet('');
  };

  const hasActiveFilters = searchQuery !== '' || selectedSet !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Subtle Background Elements */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-rose-200/10 rounded-full blur-3xl subtle-fade" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-pink-200/10 rounded-full blur-3xl subtle-fade" style={{ animationDelay: '2s' }} />

      <div className="container py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 mb-4">
            My Collection
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Track your owned cards and chase list
          </p>
        </div>

        {/* Subtle Filter Bar */}
        {(wishlist.length > 0 || collection.length > 0) && (
          <div className="mb-8 flex flex-wrap items-center gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white/80 border-rose-200/60 text-sm focus-visible:ring-rose-300 focus-visible:ring-1"
              />
            </div>
            {availableSets.length > 0 && (
              <Select value={selectedSet} onValueChange={setSelectedSet}>
                <SelectTrigger className="h-9 w-[180px] bg-white/80 border-rose-200/60 text-sm focus:ring-rose-300 focus:ring-1">
                  <SelectValue placeholder="Filter by set" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px]">
                  {availableSets.map((set) => (
                    <SelectItem key={set.id} value={set.id} className="text-sm">
                      {set.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-9 px-3 text-gray-500 hover:text-rose-600 hover:bg-rose-50"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        )}

        <Tabs defaultValue="wishlist" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white border border-rose-200 shadow-sm">
            <TabsTrigger 
              value="wishlist" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4 mr-2" />
              Chase List ({wishlist.length})
            </TabsTrigger>
            <TabsTrigger 
              value="collection"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              Owned ({collection.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishlist" className="mt-0">
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 mx-auto text-rose-300 mb-4" />
                <p className="text-xl text-gray-500 font-light">Your chase list is empty</p>
                <p className="text-sm text-gray-400 mt-2">Add cards you want to collect</p>
              </div>
            ) : filteredWishlist.length === 0 ? (
              <div className="text-center py-20">
                <Search className="h-16 w-16 mx-auto text-rose-300 mb-4" />
                <p className="text-xl text-gray-500 font-light">No cards match your filters</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your search or set filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredWishlist.map((card) => (
                  <div key={card.id} className="flex justify-center">
                    <div className="w-full max-w-[300px]">
                      <PokemonCard card={card} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="collection" className="mt-0">
            {collection.length === 0 ? (
              <div className="text-center py-20">
                <Package className="h-16 w-16 mx-auto text-emerald-300 mb-4" />
                <p className="text-xl text-gray-500 font-light">Your collection is empty</p>
                <p className="text-sm text-gray-400 mt-2">Mark cards you already own</p>
              </div>
            ) : filteredCollection.length === 0 ? (
              <div className="text-center py-20">
                <Search className="h-16 w-16 mx-auto text-emerald-300 mb-4" />
                <p className="text-xl text-gray-500 font-light">No cards match your filters</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your search or set filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredCollection.map((card) => (
                  <div key={card.id} className="flex justify-center">
                    <div className="w-full max-w-[300px]">
                      <PokemonCard card={card} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}