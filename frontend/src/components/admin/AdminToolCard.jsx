import { Link, useOutletContext } from "react-router-dom";

function AdminToolCard({ item, passItem }) {
  console.log(item)
  return (
    <Link to={`edit/${item._id}`}>
      <div
        className="flex flex-row align-middle border gap-4 p-2 h-22 border-gray-100 rounded-[10px]"
        onClick={() => {
          passItem(item);
        }}
      >
        <img src={item.images[0]} alt={item.name} className="size-24" />
        <div className="">
          {" "}
          <p className="font-semibold text-[16px]">{item.name}</p>
          <p className="text-[12px] mt-[10px] tracking-[2px]">ID: {item._id}</p>
          <p className="text-[12px] mt-[10px] ">Base price: {item.price} Eur</p>
        </div>
      </div>
    </Link>
  );
}

export default AdminToolCard;
