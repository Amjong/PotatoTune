'use client';

import { useCallback, useState } from 'react';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <main>
      <section className='flex flex-col min-h-screen justify-center items-center'>
        유투브 영상 링크
        <br />
        <SearchBar onSubmit={() => setSearchInput}></SearchBar>
      </section>
    </main>
  );
}
