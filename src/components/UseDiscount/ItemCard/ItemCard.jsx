import { useState } from 'react';
import ItemCardShimmer from '../ItemCardShimmer/ItemCardShimmer';

const ItemCard = ({ randomNumber }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-40% h-90% rounded-lg bg-secondary flex justify-center items-center shadow-2xl">
      {!isImageLoaded && <ItemCardShimmer />}
      <div
        className={`${
          isImageLoaded ? 'block' : 'hidden'
        } h-90% w-90% rounded relative`}
      >
        <img
          className="object-cover rounded-lg w-full h-full"
          src="https://source.unsplash.com/250x300/?product"
          alt="Item to buy"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-black opacity-40"></div>
        <p className="absolute bottom-0 left-0 text-white text-2xl font-bold py-2 px-4">
          € {randomNumber}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
