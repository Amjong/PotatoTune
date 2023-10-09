'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import YoutubeDl from './components/YoutubeDl';

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  let isSearchInputEmpty = searchInput === '';
  return (
    <main>
      <section className='flex flex-col min-h-screen justify-center items-center'>
        유투브 영상 링크
        <br />
        <SearchBar onSubmit={setSearchInput}></SearchBar>
        {!isSearchInputEmpty && <YoutubeDl url={searchInput} />}
      </section>
    </main>
  );
}
