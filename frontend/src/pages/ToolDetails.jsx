import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ToolDetails() {
  const [tool, setTool] = useState({ description: { imageURIs: [], details: {}, basePrice: '' } });
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3000/tools/' + id)
      .then((res) => res.json())
      .then((data) => {
        setTool(data.product || {});
        setTotalPrice(data.product.description.basePrice || '');
      })
      .catch((err) => console.error(err));
  }, [id]);

  function decreaseQuantity() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotalPrice(tool.description.basePrice * newQuantity);
    }
  }

  function increaseQuantity() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalPrice(tool.description.basePrice * newQuantity);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">{tool.description.nameRetail}</h3>
      <div className=" mx-auto flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:mx-0 lg:gap-[30px]">
        <div className="flex items-center w-[350px] py-4 lg:w-[600px] lg:h-[600px] bg-white">
          <img src={tool.description.imageURIs[0]} alt="tool-image" className="lg:max-w-[600px] lg:max-h-[600px]"></img>
        </div>
        <div className="lg:w-[50%] flex lg:justify-end lg:pt-5">
          <table className="lg:w-[90%]">
            <tbody>
              {Object.entries(tool.description.details).map(([key, value]) => (
                <tr key={key}>
                  <td className="font-bold pr-5">{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col align-center text-center items-center space-x-2 justify-around mt-8 bg-gray-100 py-3 h-[300px] lg:flex-row lg:h-[200px]">
        <div className="flex flex-col gap-4 h-[82px]">
          <p className="font-bold text-red-500">Rental price: {tool.description.basePrice} € / day</p>
          <p>
            Deposit: <span className="font-bold">{tool.description.basePrice / 5} € </span>
          </p>
        </div>
        <div className="flex flex-col text-center gap-3 h-[82px]">
          <p>Quantity: </p>
          <div className="flex gap-1 w-[150px]">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500" type="button" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="number"
              id="quantityInput"
              min="1"
              className="w-16 text-center border border-gray-300 rounded py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setQuantity(value);
                setTotalPrice(tool.description.basePrice * value);
              }}
            />
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500" type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p>
            Total rent price: <span className="font-bold"> {totalPrice} € </span>
          </p>
          <Link to={'/booking/' + id + '?quantity=' + quantity} className="bg-red-500 text-white rounded-[25px] border border-red-500 hover:border-black ml-2 px-5 py-3 font-medium">
            Book reservation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ToolDetails;
