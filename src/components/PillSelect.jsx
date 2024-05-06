import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Pill } from "./Pill";

export const PillSelect = ({
  title = "No title",
  items = [],
  setSelectedItemsDef = () => {},
  initialSelected = [],
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    setConfirmed(initialSelected || []);
    setSelected(initialSelected || []);
  }, []);

  const handleClickPill = (index) => {
    setSelected((prev) => {
      if (!!prev.find((i) => i.id === index.id)) {
        return prev.filter((i) => i.id !== index.id);
      }
      return [...prev, index];
    });
  };

  const handleSave = () => {
    setSelectedItemsDef(selected);
    setConfirmed(selected);
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(confirmed);
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>
        {confirmed?.map((item, i) => (
          <Pill key={i} text={item.name} className={"text-sm"} active={true} />
        ))}
      </button>
      <Modal isOpen={open} onRequestClose={handleClose}>
        <div>
          <h2>{title}</h2>
          {items.map((item, i) => (
            <Pill
              key={i}
              text={item.name}
              className={"text-sm"}
              active={!!selected.find((i) => i.id === item.id)}
              onClick={() => handleClickPill(item)}
            />
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </>
  );
};

