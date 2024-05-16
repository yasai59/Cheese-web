import React from "react";
import { useState } from "react";
import { ViewRestaurant } from "./ViewRestaurant";
import { EditRestaurant } from "./EditRestaurant";

export const Restaurant = () => {
  const [edit, setEdit] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (edit) {
    return <EditRestaurant setEdit={setEdit} setNewImageUrl={setNewImageUrl} />;
  }
  return <ViewRestaurant setEdit={setEdit} newImageUrl={newImageUrl} />;
};
