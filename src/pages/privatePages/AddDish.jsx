import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Input } from "../../components/Input";

export const AddDish = ({ isEditing }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = (isOpen) => {
        setOpen(isOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="border-b border-base-light">
                <div className="p-4 flex justify-between items-center">
                    <label className="text-primary">Menu</label>
                    { isEditing && 
                        <button onClick={() => handleOpen(true)} className="rounded-md py-1 px-2 text-white bg-base">
                            Add dish
                        </button> 
                    }
                </div>
            </div>

            <Modal open={open} setOpen={setOpen}>
                <div className="bg-base-dark rounded-lg border-2 border-base relative">
                    <h1 className="text-light font-bold text-xl mt-10 text-center">Add dish</h1>
                    <div className="w-[80%] mx-auto gap-2">
                        <p className="text-light">Name</p>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-light">Description</p>
                        <Input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="text-light">Price</p>
                        <Input
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
