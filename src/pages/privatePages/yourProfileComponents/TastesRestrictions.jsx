import React from "react";
import { Pill } from "../../../components/Pill";
import { Option } from "./Option";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { PillModal } from "./PillModal";
import { useState } from "react";
import axios from "axios";
import { RestrictionsSelect } from "./RestrictionsSelect";
import { useEffect } from "react";

export const TastesRestrictions = () => {
  const {
    tastes,
    restrictions,
    allTastes,
    allRestrictions,
    setTastes,
    setRestrictions,
  } = useContext(UserContext);

  const [openTastes, setOpenTastes] = useState(false);
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

  const handleOpenTastes = () => {
    setOpenTastes((prev) => !prev);
  };

  const handleOpenRestrictions = () => {
    setOpenRestrictions((prev) => !prev);
  };

  const uploadTastes = (tastes) => {
    axios.post("/api/taste", { tastes: tastes.map((t) => t.id) });
    setTastes(tastes);
  };

  const uploadRestrictions = (restrictions) => {
    axios.post("/api/restriction", {
      restrictions: restrictions.map((r) => r.id),
    });
    setRestrictions(restrictions);
  };

  return (
    <>
      <div className="flex flex-col laptop:hidden">
        <Option
          title={"Tastes"}
          content={"taste 1, taste 2, taste 3"}
          type="text"
          onClick={handleOpenTastes}
        />
        <Option
          title={"Restrictions"}
          content={"restriction 1, restriction 2, restriction 3"}
          type="text"
          onClick={handleOpenRestrictions}
        />
      </div>
      <div className="hidden laptop:grid row-start-1 row-end-3 col-start-2 ">
        <div className="m-5 bg-base rounded-xl p-3 flex flex-col">
          <h5 className="text-primary">Tastes</h5>
          <div className="flex flex-wrap gap-3 my-3">
            {tastes.map((taste) => {
              return (
                <Pill text={taste.name} activate={true} key={taste.name} />
              );
            })}
          </div>
          <button
            onClick={handleOpenTastes}
            className="w-min self-end mr-5 bg-base-light text-light px-7 py-2 text-3xl rounded-lg h-min grid place-items-center"
          >
            <span className="icon-[mdi--pencil-outline]"></span>
          </button>
        </div>
      </div>
      <div className="hidden laptop:grid row-start-3 row-end-5 col-start-2 w-full">
        <div className="hidden laptop:grid row-start-1 row-end-3 col-start-1 ">
          <div className="m-5 bg-base rounded-xl p-3 flex flex-col">
            <h5 className="text-primary">Restrictons</h5>
            <div className="flex flex-wrap gap-3 my-3">
              {restrictions?.map((restriction) => {
                return (
                  <Pill
                    text={restriction.name}
                    activate={true}
                    key={restriction.name}
                  />
                );
              })}
            </div>
            <button
              onClick={handleOpenRestrictions}
              className="w-min self-end mr-5 bg-base-light text-light px-7 py-2 text-3xl rounded-lg h-min grid place-items-center"
            >
              <span className="icon-[mdi--pencil-outline]"></span>
            </button>
          </div>
        </div>
      </div>
      {/* tastes modal */}
      <PillModal
        options={allTastes}
        selectedOptions={tastes}
        title="Tastes"
        setSelectedOptions={uploadTastes}
        open={openTastes}
        setOpen={setOpenTastes}
      />
      {/* restriction modal */}
      <PillModal
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
      </PillModal>
    </>
  );
};
