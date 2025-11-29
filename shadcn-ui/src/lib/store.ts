import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { PokemonCard } from './pokemon';
import { toast } from 'sonner';

// Shared store for wishlist state
const WISHLIST_KEY = 'pokemon-tcg-wishlist';
const COLLECTION_KEY = 'pokemon-tcg-collection';

// Create a simple store that all hook instances share
function createStore<T>(key: string) {
  let data: T[] = [];
  const listeners = new Set<() => void>();

  // Initialize from localStorage
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      data = JSON.parse(stored);
    } catch (e) {
      console.error(`Failed to parse ${key}`, e);
      data = [];
    }
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => data;

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const setData = (newData: T[]) => {
    data = newData;
    localStorage.setItem(key, JSON.stringify(data));
    notify();
  };

  return { subscribe, getSnapshot, setData };
}

// Create shared stores
const wishlistStore = createStore<PokemonCard>(WISHLIST_KEY);
const collectionStore = createStore<PokemonCard>(COLLECTION_KEY);

export function useWishlist() {
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot
  );

  const addToWishlist = useCallback((card: PokemonCard) => {
    const current = wishlistStore.getSnapshot();
    if (current.some((c) => c.id === card.id)) {
      toast.info('Card already in wishlist');
      return;
    }
    wishlistStore.setData([...current, card]);
    toast.success('Added to Chase List');
  }, []);

  const removeFromWishlist = useCallback((cardId: string) => {
    const current = wishlistStore.getSnapshot();
    wishlistStore.setData(current.filter((c) => c.id !== cardId));
    toast.success('Removed from Chase List');
  }, []);

  const isInWishlist = useCallback((cardId: string) => {
    return wishlist.some((c) => c.id === cardId);
  }, [wishlist]);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
}

export function useCollection() {
  const collection = useSyncExternalStore(
    collectionStore.subscribe,
    collectionStore.getSnapshot
  );

  const addToCollection = useCallback((card: PokemonCard) => {
    const current = collectionStore.getSnapshot();
    if (current.some((c) => c.id === card.id)) {
      toast.info('Card already in collection');
      return;
    }
    collectionStore.setData([...current, card]);
    toast.success('Added to Collection');
  }, []);

  const removeFromCollection = useCallback((cardId: string) => {
    const current = collectionStore.getSnapshot();
    collectionStore.setData(current.filter((c) => c.id !== cardId));
    toast.success('Removed from Collection');
  }, []);

  const isInCollection = useCallback((cardId: string) => {
    return collection.some((c) => c.id === cardId);
  }, [collection]);

  return { collection, addToCollection, removeFromCollection, isInCollection };
}