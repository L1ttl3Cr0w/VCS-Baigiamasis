import ToolCard from './ToolCard';

function ToolGrid({ products, isSearchResult = false }) {
  return (
    <div className="most-popular-tools flex flex-col items-center mt-[30px]">
      <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] text-center p-[40px]">{isSearchResult ? `Found ${products.length} results` : 'Most popular tools'}</h2>
      <div className="tool-grid flex justify-center">
        <div className="tool-grid-inner flex flex-wrap justify-around w-[90%]">
          {products.map((item) => (
            <ToolCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolGrid;
