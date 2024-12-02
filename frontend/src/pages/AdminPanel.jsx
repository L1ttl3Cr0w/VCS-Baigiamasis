import { Link, Outlet } from "react-router-dom";

// import AdminReservations from "../components/admin/AdminReservations";
// import AdminTools from "../components/admin/AdminTools";
// import AdminUsers from "../components/admin/AdminUsers";

function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Valdymo Skydas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="tools">
          <div className="p-4 bg-white rounded-t">
            <h3 className="font-bold mb-2">Tvarkyti įrankius</h3>
          </div>
        </Link>
        <Link to="reservations">
          <div className="p-4 bg-white rounded-t shadow-inner">
            <h3 className="font-bold mb-2">Rezervacijos</h3>
          </div>
        </Link>
        <Link to="users">
          <div className="p-4 bg-white rounded-t">
            <h3 className="font-bold mb-2">Vartotojai</h3>
          </div>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
