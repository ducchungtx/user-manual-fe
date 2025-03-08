'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BrandSearch } from '@/components/brands/BrandSearch';
import { AlphabetFilter } from '@/components/brands/AlphabetFilter';
import { Brand } from '@/types';

type BrandListClientProps = {
  initialBrands: Brand[];
};

export default function BrandListClient({ initialBrands }: BrandListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filter brands based on both search query and selected letter
  const filteredBrands = initialBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by first letter if a letter is selected
    const matchesLetter = selectedLetter === null ||
      (selectedLetter === '#'
        ? /^[^a-zA-Z]/.test(brand.name.charAt(0))
        : brand.name.toUpperCase().startsWith(selectedLetter));

    return matchesSearch && matchesLetter;
  });

  // Handle search term changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle letter selection
  const handleLetterSelect = (letter: string | null) => {
    setSelectedLetter(letter);
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mb-6">
        <BrandSearch
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <AlphabetFilter
          selectedLetter={selectedLetter}
          onLetterSelect={handleLetterSelect}
        />
      </div>

      {/* Display active filters */}
      <div className="mb-4">
        {(searchQuery || selectedLetter) && (
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Search: {searchQuery}
                </span>
              )}
              {selectedLetter && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Letter: {selectedLetter}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter(null);
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm rounded-full dark:text-gray-200"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {filteredBrands.length} {filteredBrands.length === 1 ? 'brand' : 'brands'} found
        </p>
      </div>

      {/* Brands grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.documentId}`}
              className="flex flex-col items-center p-4 border dark:border-gray-700 rounded-lg hover:shadow-md dark:hover:shadow-gray-800 transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2 rounded-full">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-300">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <span className="text-center font-medium dark:text-gray-200">{brand.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No brands found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter(null);
            }}
            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}