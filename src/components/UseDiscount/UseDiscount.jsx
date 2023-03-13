import { useState, useEffect } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import ItemCard from './ItemCard/ItemCard';
import { useGlobalContext } from '../../context';
import { apiUrl } from '../../config';

const UseDiscount = () => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const { errorMessage, setErrorMessage, dataFromDB, setDataFromDB } =
    useGlobalContext();

  const newRandomNumber = Math.floor(Math.random() * 140) + 2;
  const [randomNumber, setRandomNumber] = useState(null);
  const handleDiscountInputView = (event) => {
    setShowDiscountInput(event.target.checked);
  };

  useEffect(() => {
    setRandomNumber(newRandomNumber);
  }, []);

  const [totalPrice, setTotalPrice] = useState(newRandomNumber);
  const handleAppliedDiscount = async () => {
    const inputValue = document.getElementById('input').value;

    const foundCodeInTheTable = await dataFromDB.find(
      (el) => el.code === inputValue.toUpperCase()
    );

    if (foundCodeInTheTable && foundCodeInTheTable.status === 'active') {
      // If the discount code exists, display the percentage
      setTotalPrice(
        (
          totalPrice -
          (totalPrice * foundCodeInTheTable.percentage) / 100
        ).toFixed(2)
      );
      try {
        const response = await fetch(`${apiUrl}/${foundCodeInTheTable._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'inactive',
          }),
        });
        const updatedCodeFromDB = await response.json();
        const updatedData = dataFromDB.map((data) =>
          data._id === updatedCodeFromDB._id
            ? { ...data, status: 'inactive' }
            : data
        );
        setDataFromDB(updatedData);
        setErrorMessage({
          message: `You've got ${foundCodeInTheTable.percentage}% discount!`,
          color: 'text-accent-dark',
          type: 'applied',
        });
      } catch (err) {
        console.error('Error: ', err);
      }
    } else {
      // If the discount code does not exist, display an error message

      setErrorMessage({
        message: 'The discount code is not valid! or has been used!',
        color: 'text-warning-dark',
        type: 'notValid',
      });
    }
  };

  return (
    <div className="flex flex-col bg-primary-light h-85% w-85% shadow-2xl">
      <header className="w-full h-10% flex justify-center items-center bg-secondary rounded-t-lg">
        <BsCreditCard className="text-4xl text-white ml-4" />
        <h2 className="text-2xl font-bold text-white flex-1 text-center pr-4">
          Checkout
        </h2>
      </header>

      <div className="w-full h-55% flex justify-center items-center">
        <ItemCard randomNumber={randomNumber} />
      </div>
      <div className="w-full h-20%">
        <div className="flex flex-col items-center mb-2 ">
          <div>
            <input
              className="mr-2 checked:bg-red-500"
              id="voucher-checkbox"
              type="checkbox"
              onChange={handleDiscountInputView}
            />
            <label className="text-md " htmlFor="voucher-checkbox">
              I have a discount code
            </label>
          </div>

          <input
            className={`border rounded py-2 px-3 uppercase mr-1 mt-2 mb-4 ${
              showDiscountInput ? 'w-1/4' : 'hidden'
            }`}
            id="input"
            type="text"
            placeholder="Discount code"
            maxLength={8}
            pattern="^[a-zA-Z0-9]{8}$"
            required
            title="Please enter a valid 8-character code (letters or digits only)."
          />
          <button
            onClick={handleAppliedDiscount}
            className={`bg-accent-light hover:bg-accent-dark text-white font-bold py-2 px-4 rounded ${
              showDiscountInput ? 'w-1/7' : 'hidden'
            }`}
          >
            Apply
          </button>
          {(errorMessage.type === 'notValid' ||
            errorMessage.type === 'applied') && (
            <p className={`text-center text-base mt-2 ${errorMessage.color}`}>
              {errorMessage.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full h-15% flex justify-center items-center flex-col">
        <div className="h-0.5 mb-2 w-full bg-gradient-to-r from-primary-light via-primary-dark to-primary-light"></div>

        <div className="flex items-center">
          <h1 className="text-xl  md:text-2xl font-bold pr-2">Total:</h1>
          <h1 className="text-2xl md:text-4xl font-bold">€ {totalPrice}</h1>
        </div>
      </div>
    </div>
  );
};

export default UseDiscount;
