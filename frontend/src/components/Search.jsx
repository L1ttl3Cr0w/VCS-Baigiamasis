import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchText,
      category: selectedCategory
    });
  };

  return (
    <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center flex items-center justify-center min-h-[60vh]">
      <div className="seacrh-container text-center flex flex-col md:w-[90%] lg:w-full max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-white [text-shadow:0px_0px_2px_black]">
          Discover Your <span className="header-red text-red-500">Perfect Tool</span>
        </h1>
        <h3 className="text-2xl sm:text-3xl text-black">Rent Equipment in Just a Few Clicks</h3>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center lg:w-[894px]">
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
            <select value={selectedCategory} onChange={handleCategoryChange} className="border-none rounded-full md:rounded-none md:h-[96px] text-[20px] leading-[30px] w-full py-2.5 px-[40px] pl-[50px] text-gray-400">
              <option value="">Select Category</option>
              <option value="Generatoriai">Generators</option>
              <option value="Perforatoriai">Rotary Hammers</option>
              <option value="Elektrinė freza">Electric Router</option>
              <option value="Freza">Router</option>
              <option value="Plytelių pjovimo staklės">Tile Cutting Machine</option>
              <option value="Diskinis pjūklas">Circular Saw</option>
              <option value="Pjovimo staklės">Cutting Machine</option>
              <option value="Atskėlimo plaktukai">Demolition Hammers</option>
              <option value="Grandininiai pjūklai">Chain Saws</option>
              <option value="Statybinis dulkių siurblys">Construction Vacuum</option>
            </select>
            <i className="bi bi-tools absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400"></i>
          </div>

          <div className={`border-none md:h-[96px] text-[20px] leading-[30px] md:bg-white md:rounded-r-[50px] transition-all duration-300 overflow-hidden ${searchText || selectedCategory ? 'md:w-[22%]' : 'md:w-[11%]'}`}>
            <button type="submit" className="border-0 rounded-full text-white bg-red-500 md:relative md:w-[55px] h-[55px] text-[20px] md:top-[21px] flex items-center md:inline-block">
              <i className="bi bi-search pr-2 pl-5 md:pr-0 md:pl-0"></i>
              <span className="md:hidden pr-5">Search</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchText('');
                setSelectedCategory('');
                onSearch({ searchText: '', category: '' });
              }}
              className={`border-0 rounded-full text-white bg-gray-500 md:relative md:w-[55px] h-[55px] text-[20px] md:top-[21px] ml-2 transition-all duration-300 transform ${
                searchText || selectedCategory ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
              }`}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
