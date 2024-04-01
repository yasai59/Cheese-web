import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { AddPhoto } from "../../components/AddPhoto";
import { ImageCarousel } from "../../components/ImageCarousel";
import { FormButton } from "../../components/FormButton";
import { Form } from "react-router-dom";

export const AddRestaurant = () => {

    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setSelectedImage(imageUrl);
            console.log(imageFile);
            console.log(imageUrl);
        } else {
            setSelectedImage(null);
        }
    };

    const handleDelete = () => {
        setSelectedImage(null);
    }

    return (
        <div className="flex flex-col gap-2 p-4">
            <Link to="/your-restaurants" className="text-primary flex items-center justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                Back
            </Link>
            <h1 className="text-light text-4xl font-bold">Add Restaurant</h1>
            <form className="flex flex-col gap-2">
                <div>
                    <label className="text-light text-sm" htmlFor="">Name</label>
                    <Input
                        type="text"
                        placeholder={"ex.Bob's Burgers"}
                        value={name}
                        setValue={setName}
                    />
                </div>
                <div>
                    <label className="text-light text-sm" htmlFor="">Address</label>
                    <Input
                        type="text"
                        placeholder={"Casa de tu mami #123"}
                        value={address}
                        setValue={setAddress}
                    />
                </div>
                <div>
                    <label className="text-light text-sm" htmlFor="">Phone number</label>
                    <Input
                        type="tel"
                        placeholder={"666777123"}
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />
                </div>
                <div>
                    <label className="text-light text-sm" htmlFor="">Photo</label>
                    <AddPhoto 
                        handleImageChange={handleImageChange} 
                        selectedImage={selectedImage} 
                        handleDelete={handleDelete}
                    />
                </div>
                <hr className="w-full border-light mt-2" />
                <div className="flex flex-col gap-2">
                    <label className="text-primary text-md" htmlFor="">Your carousel</label>
                    <p className="text-light text-sm"> You need to add at least 2 photos</p>
                    <ImageCarousel/>
                    <p className="text-light mt-3 text-[13px]">
                        To start adding your dishes go to the restaurant page once created
                    </p>
                </div>
                <div>
                    <FormButton title="Add Restaurant" className="w-full text-md"/>
                </div>
            </form>
        </div>
    );
}