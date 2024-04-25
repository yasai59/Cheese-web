import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DishesComponent from "../../components/DishesComponent";
import {ImageCarousel} from "../../components/ImageCarousel";
import {LinkButton} from "../../components/LinkButton";
import { LinkAnchor } from "../../components/LinkAnchor";

export const ViewRestaurant = () => {

    const [dishes, setDishes] = useState([]);
    const { restaurants } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { restaurantId } = useParams();
    const restaurant = restaurants.find((restaurant) => restaurant.id == restaurantId);

    const [carousel, setCarousel] = React.useState(restaurant.carousel);


    useEffect(() => {
        axios.get('/api/dish/' + restaurant.id).then((res) => {
            console.log(res.data);
            setDishes(res.data);
        })
    }, [])


    const isOwner = user.id === restaurant.owner_id;


    return (
        <>
            <div className="w-full mx-auto flex flex-col">
                <div id="header" className="h-full border-b border-base-light">
                    <div className="flex flex-col px-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl text-light font-bold my-5">{restaurant.name}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"/></svg>
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="h-24 w-24 rounded-full" src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}></img>
                        </div>
                        <div className="py-4">
                            <p>{restaurant.address}</p>
                        </div>
                    </div>
                </div>
                {isOwner && (
                    <div className="border-b border-base-light">
                        <div className="p-4 flex justify-between items-center">
                            <label className="text-primary">Menu</label>
                            <Link to={`/add-dish`} className="rounded-md py-1 px-2 text-white bg-base">
                                Add dish
                            </Link>
                        </div>
                    </div>
                )}    
                <DishesComponent dishes={dishes} isOwner={isOwner} restaurantId={restaurantId} />
                <div className="flex flex-col gap-2 p-4">
                    <label className="text-primary">Carousel</label>
                    <ImageCarousel setDefCarousel={setCarousel} />
                </div>
                <hr className="border-b-1 border-base-light"/>
                <div id="links" className="flex flex-col gap-2 p-4">
                    <label className="text-primary">Links</label>
                    {isOwner ? (
                        <>
                            {/* <LinkButton link="google.com" app="favicon"></LinkButton>
                            <LinkButton link="google.com" app="favicon"></LinkButton>
                            <LinkButton link="google.com" app="favicon"></LinkButton>     */}
                            <LinkAnchor link="google.com" img="favicon"></LinkAnchor>

                        </>
                    ): (
                      <>
                      </>  
                    )}

                </div>
            </div>
        </>
    )
}
