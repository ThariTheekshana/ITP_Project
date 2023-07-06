import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import RepairInfo from "./RepairInfo";

import LogoRG from "./LogoRG";

const RGRepair = ({
  RepairId,
  customerName,
  repairDate,
  returnDate,
  WarrantyStatus,
  email,
  customerNumber,
  warrantyId,
  repairStatus,
  repairType,
  repairCost,
  IssueDescription,
}) => {
  const { setEditRepair, deleteRepair } = useAppContext();

  const ref = React.createRef();

//   //ori ekn gtte
//   let date = moment(createdAt);
//   date = date.format("MMM Do, YYYY");

  return (
    <Wrapper ref={ref}>
      <LogoRG />
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
          <tr>
            <td>Repair ID</td>
            <td>
              <RepairInfo text={RepairId} />
            </td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>
              <RepairInfo text={customerName} />
            </td>
          </tr>
          <tr>
            <td>Repair Date</td>
            <td>
              <RepairInfo text={repairDate} />
            </td>
          </tr>
          <tr>
            <td>Return Date</td>
            <td>
              <RepairInfo text={returnDate} />
            </td>
          </tr>
          <tr>
            <td>WarrantyStatus</td>
            <td>
              <RepairInfo text={WarrantyStatus} />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <RepairInfo text={email} />
            </td>
          </tr>
          <tr>
            <td>Repair Status</td>
            <td>
              <RepairInfo text={repairStatus} />
            </td>
          </tr>
          <tr>
            <td>Repair Type</td>
            <td>
              <RepairInfo text={repairType} />
            </td>
          </tr>
           <tr>
            <td>IssueDescription</td>
            <td>
              <RepairInfo text={IssueDescription} />
            </td>
          </tr>
          
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGRepair;
