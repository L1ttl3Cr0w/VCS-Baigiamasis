import { Link, useOutletContext } from "react-router-dom";

function AdminReservationsCard({ order}) {
  return (<>test</>
    // <Link to={`edit/${item.id}`}>
    //   <div
    //     className="flex flex-row align-middle border gap-4 p-2 h-22 border-gray-100 rounded-[10px]"
    //     onClick={() => {
    //       setProduct(item);
    //     }}
    //   >
    //     <img src={item.images[0]} alt={item.name} className="size-24" />
    //     <div className="">
    //       {" "}
    //       <p className="font-semibold text-[16px]">{order.name}</p>
    //       <p className="text-[12px] mt-[10px] tracking-[2px]">ID: {item._id}</p>
    //       <p className="text-[12px] mt-[10px] ">Base price: {item.price} Eur</p>
    //     </div>
    //   </div>
    // </Link>
  );
}

export default AdminReservationsCard;
