import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {asyncPopulateThreads} from '../states/threads/action';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(asyncPopulateThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = new Set(threads.map((thread) => thread.category).filter(Boolean));
    return ['all', ...unique];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (activeCategory === 'all') return threads;
    return threads.filter((thread) => thread.category === activeCategory);
  }, [threads, activeCategory]);

  return (
    <div>
      <h2 className="mb-3">Daftar Thread</h2>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ThreadList threads={filteredThreads} authUser={authUser} />
    </div>
  );
}

export default HomePage;
