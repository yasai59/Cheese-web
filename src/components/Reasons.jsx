import React, { useContext, useState, useEffect } from "react";
import { Pill } from "../components/Pill";
import UserContext from "../context/UserContext";
import { PillModalDish } from "../pages/privatePages/yourRestaurantsComponents/PillModalDish";

export const Reasons = ({ selectedReasons, setSelectedReasons }) => {
  const { reasons, allReasons, setReasons } = useContext(UserContext);
  const [openReasons, setOpenReasons] = useState(false);

  const handleOpenReasons = () => {
    setOpenReasons((prev) => !prev);
  };

  const uploadReasons = (reasons) => {
    setReasons(reasons);
    setSelectedReasons(reasons);
  };

  useEffect(() => {
    setReasons(selectedReasons || []);
  }, [selectedReasons]);

  return (
    <>
      <label className="text-light text-sm">Reasons</label>
      <div className="flex flex-col justify-center cursor-pointer bg-base rounded h-[50px] p-2 overflow-hidden" onClick={handleOpenReasons}>
        {reasons && reasons.length > 0 ? (
          <div className="laptop:grid row-start-1 row-end-3 col-start-2">
            <div className="w-full">
              <div className="flex gap-3 overflow-hidden">
                {reasons.map((reason) => {
                  return (
                    <Pill text={reason.name} activate={true} key={reason.id} />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-base-light">No reasons selected</p>
        )}
        {/* Reasons modal */}
        <PillModalDish
          options={allReasons}
          selectedOptions={reasons}
          title="Reasons"
          setSelectedOptions={uploadReasons}
          open={openReasons}
          setOpen={setOpenReasons}
        />
      </div>
    </>
  );
};
