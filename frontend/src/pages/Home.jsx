import HomeSearch from '../components/HomeSearch';
import ToolGrid from '../components/ToolGrid';
import TopCategories from '../components/TopCategories';

function Home() {

  return (
    <div>
      <HomeSearch />
      <TopCategories />
      <div className='flex flex-col items-center'>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Most popular tools</h2>
        {/* Limit prop only in Home page */}
        <ToolGrid limit={8} />
      </div>
    </div>
  );
}

export default Home;