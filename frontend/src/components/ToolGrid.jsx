import { useEffect, useState } from 'react';
import ToolCard from './ToolCard';

function ToolGrid({ searchCriteria = { searchText: '', category: '' }, limit = '' }) {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toolsPerPage] = useState(12);

  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = (searchResults && isSearchActive ? searchResults : products).slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil((searchResults && isSearchActive ? searchResults : products).length / toolsPerPage);
  console.log(indexOfLastTool)

  useEffect(() => {
    fetch('http://localhost:3000/tools')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const tools = data.tools.map((item) => {
          if (item.name && item.description && item.price && item.images) {
            return item
          }
        }).filter(Boolean)

        if (limit) {
          setProducts(tools.slice(0, 8))
        } else {
          setProducts(tools)
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  useEffect(() => {
    handleSearch()
  }, [searchCriteria, products])

  const handleSearch = () => {
    if ((!searchCriteria.category && !searchCriteria.searchText) || products.length == 0) {
      setSearchResults(null);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true)

    const filteredProducts = products.filter((product) => {
      const matchesSearch = !searchCriteria.searchText || (product.name || '').toLowerCase().includes(searchCriteria.searchText.toLowerCase());

      const matchesCategory = !searchCriteria.category || (product.description['productType'] || '') === searchCriteria.category;

      return matchesSearch && matchesCategory;
    });

    setSearchResults(filteredProducts);
  };

  return (
    <div className="flex flex-col items-center mb-7 w-[90%] max-w-[1500px]">
      {isSearchActive ? <h2 className="text-[20px] text-center p-1 md:p-6">Found {searchResults.length} results</h2> : ''}
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center content-stretch gap-2">
          {
            currentTools.map((item) => (
              <ToolCard item={item} key={item._id} />
            ))
          }
        </div>
      </div>

      {!limit && <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div>}


    </div>
  );
}

export default ToolGrid;