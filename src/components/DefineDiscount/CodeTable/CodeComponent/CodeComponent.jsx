const CodeComponent = ({ el, deleteCodeFromDB }) => {
  return (
    <div>
      <div className="flex justify-between uppercase mt-1">
        <div className="text-center">{el.code}</div>
        <div>{el.percentage}%</div>
        <div
          className={
            el.status === 'active'
              ? 'text-accent-dark font-bold'
              : 'text-warning-light font-bold'
          }
        >
          {el.status}
        </div>
        <div>
          <button
            className="bg-warning-light hover:bg-warningdark text-white  py-0.5 px-2 rounded"
            onClick={() => {
              deleteCodeFromDB(el._id);
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="h-0.5 mt-1 mb-1 w-full bg-gradient-to-r from-primary-light via-primary-dark to-primary-light"></div>
    </div>
  );
};

export default CodeComponent;
