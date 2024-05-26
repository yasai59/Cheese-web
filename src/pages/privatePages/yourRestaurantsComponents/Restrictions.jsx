import React from "react";
import { Pill } from "../../../components/Pill";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { PillModalDish } from "./PillModalDish";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { RestrictionsSelect } from "../yourProfileComponents/RestrictionsSelect";

export const Restrictions = ({
  selectedRestrictions,
  setSelectedRestrictions,
}) => {
  const { restrictions, allRestrictions, setRestrictions } =
    useContext(UserContext);

  const [openRestrictions, setOpenRestrictions] = useState(false);

  const [restrictionActive, setRestrictionActive] = useState(
    restrictions.find((r) => r.id <= 3) ?? {
      name: "Omnivore",
      id: 3,
    }
  );

  useEffect(() => {
    setRestrictionActive(
      restrictions.find((r) => r.id <= 3) ?? {
        name: "Omnivore",
        id: 3,
      }
    );
  }, [restrictions]);

  const handleOpenRestrictions = () => {
    setOpenRestrictions((prev) => !prev);
  };

  const uploadRestrictions = (restrictions) => {
    const defRestrictions = [
      restrictionActive,
      ...restrictions.filter((r) => r.id > 3),
    ];
    setRestrictions(defRestrictions);
    setSelectedRestrictions(defRestrictions);
  };

  // useEffect(() => {
  //     setRestrictions(selectedRestrictions || []);
  // }, [selectedRestrictions])

  return (
    <>
      <label className="text-light text-sm">Restrictions</label>
      <div
        className="flex flex-col justify-center cursor-pointer bg-base rounded h-[50px] p-2 overflow-hidden"
        onClick={handleOpenRestrictions}
      >
        {restrictions && restrictions.length > 0 ? (
          <div className="laptop:grid row-start-1 row-end-3 col-start-2">
            <div className="w-full">
              <div className="flex gap-3 overflow-hidden">
                {restrictions.map((restriction) => {
                  return (
                    <Pill
                      text={restriction.name}
                      activate={true}
                      key={restriction.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-light">No restrictions selected</p>
        )}
        <PillModalDish
          options={allRestrictions.filter((r) => r.id > 3)}
          selectedOptions={restrictions}
          title="Restrictions"
          setSelectedOptions={uploadRestrictions}
          open={openRestrictions}
          setOpen={setOpenRestrictions}
        >
          <RestrictionsSelect
            setItemActive={setRestrictionActive}
            itemActive={restrictionActive}
          />
        </PillModalDish>
      </div>
    </>
  );
};
