import { useEffect, useState } from 'react';
import ToolGrid from '../components/ToolGrid';

function Tools() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tools')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.tools);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 text-center">Our Tools Collection</h1>
      <ToolGrid products={products} isSearchResult={false} />
    </main>
  );
}

export default Tools;
