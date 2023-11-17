'use client';

import { Layout } from '@/components/layouts';
import { SearchBar, TodoList } from '@/components/organisms';

const Home = () => {
  return (
    <Layout>
      <SearchBar />
      <TodoList />
    </Layout>
  );
};

export default Home;
