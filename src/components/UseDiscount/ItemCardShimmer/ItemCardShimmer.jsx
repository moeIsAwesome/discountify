const ItemCardShimmer = () => {
  return (
    <div className="h-90% w-90% rounded-lg relative flex justify-center items-center bg-gradient-to-r from-primary-dark via-secondary to-primary-dark animate-pulse">
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-black opacity-30"></div>
      <div className="absolute bottom-0 left-0 text-white text-2xl py-2 px-4">
        <div className="w-14 h-8 rounded-full bg-secondary "></div>
      </div>
    </div>
  );
};

export default ItemCardShimmer;
