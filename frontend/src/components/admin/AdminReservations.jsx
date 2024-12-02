import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminReservationsCard from "./AdminReservationsCard";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({});
  const token = localStorage.token;

  useEffect(() => {
    fetch("http://localhost:3000/reservations",{          headers: {
      method: "GET",
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },})
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.reservations || []);
      })
      .catch((err) => console.error(err));
  }, []);




  return (

    <>
      <div className="sticky top-0">
        <Outlet context={[reservation]} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 space-y-4 bg-white p-6 rounded-lg shadow">
        <Link to="new">
          {" "}
          <div className="border  p-2 h-22 border-gray-100 rounded-[10px] h-22 mt-4 text-center">
            Įkelti naują
          </div>{" "}
        </Link>
        {reservations.map((item) => {
          return (
            <AdminReservationsCard item={item} passItem={setReservations} key={item._id} />
          );
        })}
      </div>
    </>
  );
}

export default AdminReservations;
