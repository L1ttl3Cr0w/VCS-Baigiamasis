import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center flex items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
      <div className="text-center flex flex-col md:w-[90%] lg:w-full max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-white [text-shadow:0px_0px_2px_black]">
          Discover Your <span className="header-red text-red-500">Perfect Tool</span>
        </h1>
        <h3 className="text-2xl sm:text-3xl text-black">Rent Equipment in Just a Few Clicks</h3>

        <div className="flex flex-col md:flex-row justify-center items-center lg:w-[894px]">
          <div className="w-[80%] sm:w-[60%] md:w-[45%] relative mb-2 md:mb-0">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for equipment"
              className="md:h-[96px] text-[20px] leading-[30px] w-full pl-[50px] pr-[40px] py-[10px] rounded-full md:rounded-[50px_0_0_50px] md:border-r-[1px] border-r-gray-200"
            />
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400"></i>
          </div>
          <div className="w-[80%] sm:w-[60%] md:w-[45%] relative mb-2 md:mb-0">
            <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}} className="border-none rounded-full md:rounded-none md:h-[96px] text-[20px] leading-[30px] w-full py-2.5 px-[40px] pl-[50px] text-gray-400">
              <option value="">Select Category</option>
              <option value="Generators">Generators</option>
              <option value="Rotary Hammers">Rotary Hammers</option>
              <option value="Electric Routers">Electric Routers</option>
              <option value="Routers">Routers</option>
              <option value="Tile Cutting Machines">Tile Cutting Machines</option>
              <option value="Circular Saws">Circular Saws</option>
              <option value="Cutting Machines">Cutting Machines</option>
              <option value="Demolition Hammers">Demolition Hammers</option>
              <option value="Chain Saws">Chain Saws</option>
              <option value="Vacuums">Construction Vacuums</option>
            </select>
            <i className="bi bi-tools absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400"></i>
          </div>

          <div className={`flex flex-col gap-2 md:inline-block mb-3 md:mb-0 border-none md:h-[96px] text-[20px] leading-[30px] md:bg-white md:rounded-r-[50px] transition-all duration-300 overflow-hidden ${searchText || selectedCategory ? 'md:w-[22%]' : 'md:w-[11%]'}`}>
            {/* Redirects to Tools page with selected Category and SearchText params */}
            <Link to={`/tools?category=${selectedCategory}&searchText=${searchText}`} type="submit" className="border-0 rounded-full text-white bg-red-500 md:relative md:w-[55px] h-[45px] md:h-[55px] text-[20px] md:top-[21px] flex items-center md:inline-block">
              <i className="bi bi-search md:absolute pr-2 pl-5 md:pr-0 md:pl-0 md:left-[18px] md:top-[11px]"></i>
              <span className="md:hidden pr-5">Search</span>
            </Link>
            {/* Clears SearchText and SelectedCategory states */}
            <button
              type="button"
              onClick={() => {
                setSearchText('');
                setSelectedCategory('');
              }}
              className={`border-0 rounded-full text-white bg-gray-500 md:relative md:w-[55px] h-[45px] md:h-[55px] text-[20px] md:ml-4 transition-all duration-300 transform flex items-center md:inline-block ${
                searchText || selectedCategory ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
              }`}
            >
              <i className="bi bi-x-lg pr-2 pl-5 md:pr-0 md:pl-0"></i>
              <span className="md:hidden pr-5">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
