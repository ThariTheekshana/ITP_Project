import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import WarrantyInfo from "./WarrantyInfo";

import LogoRG from "./LogoRG";

const RGWarranty = ({
  WarrantyId,
  ItemName,
  ItemBrand,
  WarrantyStartedDate,
  WarrantyPeriod,
  WarrantyExpiredDate,
  WarrantyStatus,
  
}) => {
  const { setEditItem, deleteItem } = useAppContext();

  const ref = React.createRef();

  return (
    <Wrapper ref={ref}>
      <LogoRG/>
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
        <tr>
            <td>Warranty ID</td>
            <td>
            <WarrantyInfo text={WarrantyId} />
            </td>
        </tr>
          <tr>
            <td>Item Name</td>
            <td>
              <WarrantyInfo text={ItemName} />
            </td>
          </tr>
          <tr>
            <td>Item Brand</td>
            <td>
              <WarrantyInfo text={ItemBrand} />
            </td>
          </tr>
          <tr>
            <td>Warranty Started Date</td>
            <td>
              <WarrantyInfo text={WarrantyStartedDate} />
            </td>
          </tr>
          <tr>
            <td>Warranty Period</td>
            <td>
              <WarrantyInfo text={WarrantyPeriod} />
            </td>
          </tr>
          <tr>
            <td>Warranty Expired Date</td>
            <td>
              <WarrantyInfo text={WarrantyExpiredDate} />
            </td>
          </tr>
          <tr>
            <td>Warranty Status</td>
            <td>
              <WarrantyInfo text={WarrantyStatus} />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGWarranty;
