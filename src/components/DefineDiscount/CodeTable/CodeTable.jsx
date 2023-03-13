import CodeComponent from './CodeComponent/CodeComponent';
import { apiUrl } from '../../../config';

import { useGlobalContext } from '../../../context';
const CodeTable = () => {
  const { setErrorMessage, dataFromDB, setDataFromDB } = useGlobalContext();

  const deleteCodeFromDB = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      const deletedCodeComingFromDB = await response.json();
      setDataFromDB(
        dataFromDB.filter((el) => el._id !== deletedCodeComingFromDB._id)
      );

      setErrorMessage({
        message: 'The discount code has been deleted from the database!',
        color: 'text-warning-dark',
        type: 'deletedFromDB',
      });

      setTimeout(() => {
        setErrorMessage({
          message: '',
          color: '',
          type: '',
        });
      }, 3000);
    } catch (err) {
      console.error('Error: ', err);
    }
  };
  return (
    <div className="w-60% h-60 overflow-y-scroll ">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="font-bold">Code</div>
          <div className="font-bold">Percentage</div>
          <div className="font-bold">Status</div>
          <div className="font-bold">Remove</div>
        </div>

        {dataFromDB &&
          dataFromDB.map((el) => {
            return (
              <CodeComponent
                key={el._id}
                el={el}
                deleteCodeFromDB={deleteCodeFromDB}
                setDataFromDB={setDataFromDB}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CodeTable;
