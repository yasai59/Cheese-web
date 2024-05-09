import React from "react";
import { Pill } from "../../../components/Pill";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { PillModalDish } from "./PillModalDish";
import { useState } from "react";
import { useEffect } from "react";

export const Tastes = ({ selectedTastes, setSelectedTastes }) => {
    const {
        tastes,
        allTastes,
        setTastes,
    } = useContext(UserContext);

    const [openTastes, setOpenTastes] = useState(false);

    const handleOpenTastes = () => {
        setOpenTastes((prev) => !prev);
    };

    const uploadTastes = (tastes) => {
        setTastes(tastes);
        setSelectedTastes(tastes);
    };
    
    useEffect(() => {
        setTastes(selectedTastes || []);
    }, [selectedTastes])

    
    return (
        <>
            <label className="text-light text-sm">Tastes</label>
            <div className="flex flex-col justify-center cursor-pointer bg-base rounded h-[50px] p-2 overflow-hidden" onClick={handleOpenTastes}>
                {tastes && tastes.length > 0 ? (
                    <div className="laptop:grid row-start-1 row-end-3 col-start-2">
                        <div className="w-full">
                            <div className="flex gap-3 overflow-hidden">
                                {tastes.map((taste) => {
                                    return (
                                        <Pill text={taste.name} activate={true} key={taste.name} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-base-light">No tastes selected</p>
                )}
                {/* tastes modal */}
                <PillModalDish
                    options={allTastes}
                    selectedOptions={tastes}
                    title="Tastes"
                    setSelectedOptions={uploadTastes}
                    open={openTastes}
                    setOpen={setOpenTastes}
                />
            </div>
        </>
    );
};
