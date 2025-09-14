import React from 'react';

const Spinner = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className="w-20 h-20 border-4 border-transparent rounded-full text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400">
        <div className="w-16 h-16 border-4 border-transparent rounded-full text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400"></div>
      </div>
    </div>
  );
};

export default Spinner;
