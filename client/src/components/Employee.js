import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import EmployeeInfo from "./EmployeeInfo";
import Pdf from "react-to-pdf";

import React from "react";

const Employee = ({
  _id,
  EmployeeID,
  EmployeeName,
  EmployeeNIC,
  EmployeeAddress,
  EmployeeContactNumber,
  EmployeeEmail,
  EmployeeAge,
  EmployeeGender,
  EmployeePosition,

  createdAt,
}) => {
  const { setEditEmployee, deleteEmployee } = useAppContext();
  const ref = React.createRef();

  //ori ekn gtte
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{EmployeeName.charAt(0)}</div>
        <div className="info">
          <h5>{EmployeeName}</h5>
          <p>{EmployeePosition}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;Employee ID
        <EmployeeInfo text={EmployeeID} />
        &emsp;EmployeeNIC
        <EmployeeInfo text={EmployeeNIC} />
        &emsp;EmployeeAddress
        <EmployeeInfo text={EmployeeAddress} />
        &emsp;EmployeeContactNumber
        <EmployeeInfo text={EmployeeContactNumber} />
        &emsp;EmployeeEmail
        <EmployeeInfo text={EmployeeEmail} />
        &emsp;EmployeeAge
        <EmployeeInfo text={EmployeeAge} />
        &emsp;EmployeeGender
        <EmployeeInfo text={EmployeeGender} />
        &emsp;EmployeePosition
        <EmployeeInfo text={EmployeePosition} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-employee"
            className="btn edit-btn"
            onClick={() => setEditEmployee(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteEmployee(_id)}
          >
            Delete
          </button>

          <Pdf
            targetRef={ref}
            filename={(EmployeeID + " - " + EmployeeName, +".pdf")}
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

export default Employee;
