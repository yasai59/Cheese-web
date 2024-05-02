import React from "react";
import { useState } from "react";
import { ViewRestaurant } from "./ViewRestaurant";
import { EditRestaurant } from "./EditRestaurant";

export const Restaurant = () => {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <EditRestaurant setEdit={setEdit} />;
  }
  return <ViewRestaurant setEdit={setEdit} />;
};
