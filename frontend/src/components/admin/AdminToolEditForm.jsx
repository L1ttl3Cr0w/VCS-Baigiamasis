import { Link, useOutletContext } from "react-router-dom";
import { JsonEditor } from "json-edit-react";
import { useEffect, useState } from "react";

function AdminToolEditForm() {
  const [product] = useOutletContext();
  const [itemEdit, setItemEdit] = useState({ product });
  const token = localStorage.token;
console.log(product)
  const handleItemPatch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/tools/${itemEdit._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            itemEdit,
          }),
        }
      );
      const data = await response.json();
      console.log(response)
      if (response.ok) {
        console.log("Patch success:", data);
      }
    } catch (error) {
      console.error("Patch failed:", error);
    }
  };
  const handleItemDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/tools/${itemEdit._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemEdit,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Delete success:", response);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    setItemEdit(product);
  }, [product]);

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Koreguoti Įrankius</h3>
        <Link to="../">
          <div>X</div>
        </Link>
      </div>
      <form className="flex gap-6 ">
        <JsonEditor
          data={itemEdit}
          setData={setItemEdit}
          restrictEdit={({ key, level }) => key === "_id" && level === 0}
        />
        <button onClick={handleItemPatch}>Save changes</button>
        <button onClick={handleItemDelete}>Delete</button>
      </form>
    </div>
  );
}

export default AdminToolEditForm;
