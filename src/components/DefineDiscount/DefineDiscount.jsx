import { useRef, useState } from 'react';
import CodeTable from './CodeTable/CodeTable';
import { BsDatabaseAdd } from 'react-icons/bs';
import { useGlobalContext } from '../../context';
import { apiUrl } from '../../config';
import Loading from './Loading/Loading';

const DefineDiscount = ({ deleteCodeFromDB }) => {
  const {
    errorMessage,
    setErrorMessage,
    dataFromDB,
    setDataFromDB,
    loading,
    setLoading,
  } = useGlobalContext();

  const discountCodeInputRef = useRef(null);
  const percentageInputRef = useRef(null);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const code = discountCodeInputRef.current.value.toUpperCase();
    const percentage = percentageInputRef.current.value;

    // Check if the code already exists in the array
    const existingCode = dataFromDB.find((item) => item.code === code);

    if (existingCode) {
      setErrorMessage({
        message: 'The code already exists in the database!',
        color: 'text-warning-dark',
        type: 'existedInDB',
      });

      setTimeout(() => {
        setErrorMessage({
          message: '',
          color: '',
          type: '',
        });
      }, 2000);
      setLoading(false);
    } else {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            percentage: percentage,
            status: 'active',
          }),
        });
        const data = await response.json();
        setDataFromDB([...dataFromDB, data]);
        setErrorMessage({
          message: 'The discount code has been added to the database!',
          color: 'text-accent-dark',
          type: 'addedToDB',
        });
        setLoading(false);
        discountCodeInputRef.current.value = '';
        percentageInputRef.current.value = '';
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
    }
  };

  return (
    <div className=" rounded-lg flex flex-col bg-primary-light w-85% h-85% shadow-2xl">
      <header className="w-full h-10% flex justify-center items-center bg-secondary rounded-t-lg">
        <BsDatabaseAdd className="text-4xl text-white ml-4" />
        <h2 className="text-2xl font-bold text-white flex-1 text-center pr-4">
          Database
        </h2>
      </header>
      <div className="w-full h-35% flex flex-col items-center justify-center">
        <form
          className="h-full w-80% flex items-center justify-center "
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between w-full items-center flex-wrap">
            <label
              className="block font-bold mb-1 mt-3"
              htmlFor="discount-code"
            >
              Code:
            </label>

            <input
              className="border rounded w-28 h-10 uppercase p-2"
              id="discount-code"
              type="text"
              placeholder="8AVE93BX"
              maxLength={8}
              pattern="^[a-zA-Z0-9]{8}$"
              required
              title="Please enter a valid 8-character code (letters or digits only)."
              ref={discountCodeInputRef}
            />
            <label className="block font-bold mb-1 mt-3 " htmlFor="percentage">
              Percentage:
            </label>
            <input
              className="border rounded w-16 h-10 uppercase p-2"
              id="precentage"
              type="number"
              placeholder="30"
              min={1}
              max={100}
              required
              title="Please enter a valid number between 1 to 100."
              ref={percentageInputRef}
            />
            <button className="bg-accent-light hover:bg-accent-dark text-white text-md font-bold w-16 h-10 rounded">
              Add
            </button>
          </div>
        </form>
        <div>{loading && <Loading />}</div>
        <div className="w-full h-35% flex flex-col items-center justify-center">
          {errorMessage.type === 'existedInDB' && (
            <p className={`text-center text-base pb-10 ${errorMessage.color}`}>
              {errorMessage.message}
            </p>
          )}
        </div>
      </div>

      <div className="h-40% flex flex-col items-center">
        <div className="h-0.5 mb-3 w-full bg-gradient-to-r from-primary-light via-primary-dark to-primary-light"></div>
        <CodeTable deleteCodeFromDB={deleteCodeFromDB} />
      </div>
      <div className="h-10% w-full">
        {(errorMessage.type === 'addedToDB' ||
          errorMessage.type === 'deletedFromDB') && (
          <p className={`text-center text-base pb-10 ${errorMessage.color}`}>
            {errorMessage.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DefineDiscount;
