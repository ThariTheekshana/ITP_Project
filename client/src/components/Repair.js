import moment from "moment";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import RepairInfo from "./RepairInfo";
import Pdf from "react-to-pdf";
import { useEffect } from "react";
const Repair = ({
  _id,

  createdAt,

  //Repair
  RepairId,
  customerName,
  repairDate,
  returnDate,
  WarrantyStatus,
  email,
  customerNumber,
  warrantyId,
  //ItemId,
  repairStatus,
  repairType,
  repairCost,
  IssueDescription,
}) => {
  const { setEditRepair, deleteRepair } = useAppContext();

  const ref = React.createRef();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{customerName.charAt(0)}</div>
        <div className="info">
          <h5>{customerNumber}</h5>
          <p>{customerName}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;RepairId
        <RepairInfo text={RepairId} />
        &emsp;customerName
        <RepairInfo text={customerName} />
        &emsp;Email
        <RepairInfo text={email} />
        &emsp;repairType
        <RepairInfo text={repairType} />
        &emsp;Repair Date
        <RepairInfo text={repairDate} />
        &emsp;Return Date
        <RepairInfo text={returnDate} />
        &emsp;Warranty Status,
        <RepairInfo text={WarrantyStatus} />
        &emsp;RepairStatus
        <RepairInfo text={repairStatus} />
        &emsp;Issue Description
        <RepairInfo text={IssueDescription} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-repair"
            className="btn edit-btn"
            onClick={() => setEditRepair(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteRepair(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf targetRef={ref} filename={RepairId + " - " + RepairId + ".pdf"}>
            {({ toPdf }) => (
              <button onClick={toPdf} className="btn report-btn">
                Generate Pdf
              </button>
            )}
          </Pdf>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Repair;
