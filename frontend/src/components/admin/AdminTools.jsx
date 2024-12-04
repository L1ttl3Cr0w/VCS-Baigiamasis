import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminToolCard from "./AdminToolCard";

function AdminTools() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/tools")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.tools || []);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(products)
  return (
    <>
      <div className="sticky top-0">
        <Outlet context={[product]} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 space-y-4 bg-white p-6 rounded-lg shadow">
        <Link to="new">
          {" "}
          <div className="border  p-2 h-22 border-gray-100 rounded-[10px] h-22 mt-4 text-center">
            Įkelti naują
          </div>{" "}
        </Link>
        {products.map((item) => {
          return (
            <AdminToolCard item={item} passItem={setProduct} key={item._id} />
          );
        })}
      </div>
    </>
  );
}

export default AdminTools;
