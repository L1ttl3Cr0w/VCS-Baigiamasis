import { Link } from 'react-router-dom';

function ToolCard({ item }) {
  return (
    <div className="w-[30%] my-[30px]">
      <Link to={`/tools/${item._id}`}>
        <div className="tool-grid-item border border-gray-100 rounded-[10px] hover:shadow-lg transition-shadow">
          <img src={item.images[0]} alt={item.name} />
          <p id="tool-grid-item-name font-semibold text-[22px] mt-[10px] tracking-[2px]">{item.name}</p>
          <div id="tool-grid-item-description text-[18px] mb-[10px] tracking-[2px]">
            {Object.entries(item.description).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
          <p id="tool-grid-item-price text-red-500">{item.price} € / day</p>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;
