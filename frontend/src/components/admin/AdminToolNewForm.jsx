import { Link, useOutletContext } from "react-router-dom";
import { JsonEditor } from "json-edit-react";
import { useEffect, useState } from "react";

function AdminToolNewForm() {
  const [itemEdit, setItemEdit] = useState({});
  const token = localStorage.token;
  const jsonTemplate = {
    toolType: "string",
    description: {
      nameRetail: "string",
      basePrice: 1,
      imageURIs: ["string"],
      details: {
        productType: "string",
        trademark: "string",
        warranty: 1,
        company_warranty: 1,
        origin_country: "string",
      },
    },
    isAvailable: false,
    isVisible: false,
    isDraft: true,
  };

  useEffect(() => {
    console.log(itemEdit);
  }, [itemEdit]);

  const handleItemPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/tools/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          itemEdit,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Post success:", data);
      }
    } catch (error) {
      console.error("Post failed:", error);
    }
  };

  useEffect(() => {
    console.log(itemEdit);
  }, [itemEdit]);

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Kurti Įrankius</h3>
        <Link to="../">
          <div>X</div>
        </Link>
      </div>
      <form className="flex gap-6 ">
        <JsonEditor data={jsonTemplate} setData={setItemEdit} />
        <button onClick={handleItemPost}>Add new item</button>
      </form>
    </div>
  );
}

export default AdminToolNewForm;
