import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import CustomerInfo from "./CustomerInfo";

import LogoRG from "./LogoRG";

const RGCustomer = ({
  _id,
  CustomerId,
  FirstName,
  LastName,
  ContactNumber,
  Address,
  DateOfBirth,
  EmailAddress,
  CustomerType,
  createdAt,
  loyaltyPoints, // new prop for loyalty points
}) => {
  const { setEditCustomer, deleteCustomer } = useAppContext();

  const ref = React.createRef();

  //ori ekn gtte
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  // Add loyalty points based on the customer type
  let updatedLoyaltyPoints = (loyaltyPoints = 0);
  if (CustomerType === "normalCustomer") {
    updatedLoyaltyPoints += 0;
  } else if (CustomerType === "loyaltyCustomer") {
    updatedLoyaltyPoints += 5;
  }

  return (
    <Wrapper ref={ref}>
      <LogoRG />
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
          <tr>
            <td>Customer ID</td>
            <td>
              <CustomerInfo text={CustomerId} />
            </td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td>
              <CustomerInfo text={ContactNumber} />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <CustomerInfo text={Address} />
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>
              <CustomerInfo text={DateOfBirth} />
            </td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>
              <CustomerInfo text={EmailAddress} />
            </td>
          </tr>
          <tr>
            <td>Customer Type</td>
            <td>
              <CustomerInfo text={CustomerType} />
            </td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>
              <CustomerInfo text={createdAt} />
            </td>
          </tr>
          <tr>
            <td>Loyalty Points</td>
            <td>
              <CustomerInfo text={updatedLoyaltyPoints} />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGCustomer;
