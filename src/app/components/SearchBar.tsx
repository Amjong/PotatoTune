'use client';

import { useState } from 'react';

type props = {
  onSubmit: (input: string) => void;
};

export default function SearchBar({ onSubmit }: props) {
  const [input, setInput] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setInput(value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const youtubeUrl = event.target[0].value;
    onSubmit(youtubeUrl);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className='text-black'
        type='text'
        placeholder='유투브 링크를 입력하세요.'
        name='searchBar'
        value={input}
        onChange={onChange}
      />
    </form>
  );
}
