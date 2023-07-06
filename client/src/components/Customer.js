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

const Customer = ({
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
    <Wrapper>
      <header>
        <div className="main-icon">{FirstName.charAt(0)}</div>
        <div className="info">
          <h5>{FirstName}</h5>
          <p>{LastName}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;Customer ID
        <CustomerInfo text={CustomerId} />
        &emsp;ContactNumber
        <CustomerInfo text={ContactNumber} />
        &emsp;Address
        <CustomerInfo text={Address} />
        &emsp;DateOfBirth
        <CustomerInfo text={DateOfBirth} />
        &emsp;EmailAddress
        <CustomerInfo text={EmailAddress} />
        &emsp;CustomerType
        <CustomerInfo text={CustomerType} />
        &emsp;createdAt
        <CustomerInfo text={createdAt} />
        &emsp;loyaltyPoints
        <CustomerInfo text={updatedLoyaltyPoints} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-customer"
            className="btn edit-btn"
            onClick={() => setEditCustomer(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteCustomer(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf
            targetRef={ref}
            filename={CustomerId + " - " + FirstName + ".pdf"}
          >
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

export default Customer;
