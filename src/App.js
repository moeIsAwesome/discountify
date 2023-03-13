import { useEffect, useCallback } from 'react';
import DefineDiscount from './components/DefineDiscount/DefineDiscount';
import UseDiscount from './components/UseDiscount/UseDiscount';
import { apiUrl } from './config';
import { useGlobalContext } from './context';

function App() {
  const { setDataFromDB } = useGlobalContext();

  const fetchCodesFromDB = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setDataFromDB(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteCodeFromDB = useCallback(async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete data: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCodesFromDB();
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-4 bg-primary-light">
      <div className="flex flex-1 h-screen bg-primary-light justify-center items-center">
        <DefineDiscount
          fetchCodesFromDB={fetchCodesFromDB}
          deleteCodeFromDB={deleteCodeFromDB}
        />
      </div>
      <div className="flex flex-1 h-screen bg-primary-light justify-center items-center">
        <UseDiscount />
      </div>
    </div>
  );
}

export default App;
