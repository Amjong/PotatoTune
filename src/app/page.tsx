'use client';
import SearchBar from './components/SearchBar';

export default function Home() {
  const handleSubmit = (url: string) => {
    fetch(`/ytdl?url=${url}`);
  };
  return (
    <main>
      <section className='flex flex-col min-h-screen justify-center items-center'>
        유투브 영상 링크
        <br />
        <SearchBar onSubmit={handleSubmit}></SearchBar>
      </section>
    </main>
  );
}
