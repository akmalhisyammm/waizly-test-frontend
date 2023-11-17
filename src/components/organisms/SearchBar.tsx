'use client';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('search') || '';

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value ? `?search=${e.target.value}` : '';

    router.push(pathname + query);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaSearch />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search todo"
        paddingLeft={10}
        value={keyword}
        onChange={handleKeywordChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
