import React from "react";
import spinn from "../../assetsCon/assets/img/loader/SpinGif.gif";

const Spinner = () => {
  return (
    <>
      <div className="flex justify-center">
        <img className=" w-16 select-none" src={spinn} alt="loading" />
      </div>
    </>
  );
};

export default Spinner;
