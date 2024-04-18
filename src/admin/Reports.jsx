import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { Restaurant } from "./components/Restaurant";
import { User } from "./components/User";

const Report = ({ report }) => {
  let fecha = new Date(report.report_date);

  fecha = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}`;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="bg-base w-56 rounded-lg p-5 cursor-pointer"
        onClick={handleClick}
      >
        <h3 className="font-bold">{report.restaurant.name}</h3>
        <h3 className="mb-3">reporterd by: {report.user.username}</h3>
        <h4 className="text-sm font-bold">{fecha}</h4>
        <p>{report.description}</p>
        {report.reason_name ? (
          <>
            <p>reasons:</p>
            <ul>
              {report.reason_name?.map((reason, index) => {
                return (
                  <li key={index} className="ml-2 text-sm">
                    - {reason}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>no reasons</p>
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h2 className="text-4xl font-bold">{report.description}</h2>
        <h3 className="text-2xl font-bold">
          {report.user.username} - {fecha}
        </h3>
        <p className="text-lg font-bold">Reasons:</p>
        <ul>
          {report.reason_name?.map((reason, index) => {
            return (
              <li key={index} className="ml-2 text-sm">
                - {reason}
              </li>
            );
          })}
        </ul>
        <p className="text-lg font-bold">Restaurant:</p>
        <div className="flex items-center justify-center">
          <Restaurant restaurant={report.restaurant} />
        </div>
        <p className="text-lg font-bold">User:</p>
        <div className="flex items-center justify-center">
          <User user={report.user} />
        </div>
        <div className="flex justify-end">
          <button className="p-3 bg-secondary rounded-lg self-end mt-10 justify-self-end text-black">
            Delete report
          </button>
        </div>
      </Modal>
    </>
  );
};

export const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/api/report/getAll").then((res) => {
      setReports(res.data.reports);
    });
  }, []);

  return (
    <div className="pl-5 pt-5">
      <h1 className="text-5xl font-bold">Reports</h1>
      <div className="flex gap-5 flex-wrap mt-10">
        {reports.map((report) => {
          return <Report report={report} key={report.id} />;
        })}
      </div>
    </div>
  );
};
