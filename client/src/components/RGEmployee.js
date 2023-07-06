import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import EmployeeInfo from "./EmployeeInfo";

import LogoRG from "./LogoRG";

const RGEmployee = ({
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
}) => {
  const { setEditEmployee, deleteEmployee } = useAppContext();

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
            <td>Employee ID</td>
            <td>
              <EmployeeInfo text={EmployeeID} />
            </td>
          </tr>
          <tr>
            <td>Employee Name</td>
            <td>
              <EmployeeInfo text={EmployeeName} />
            </td>
          </tr>
          <tr>
            <td>Employee NIC</td>
            <td>
              <EmployeeInfo text={EmployeeNIC} />
            </td>
          </tr>
          <tr>
            <td>Employee Address</td>
            <td>
              <EmployeeInfo text={EmployeeAddress} />
            </td>
          </tr>
          <tr>
            <td>Employee Contact Number</td>
            <td>
              <EmployeeInfo text={EmployeeContactNumber} />
            </td>
          </tr>
          <tr>
            <td>Employee Email</td>
            <td>
              <EmployeeInfo text={EmployeeEmail} />
            </td>
          </tr>
          <tr>
            <td>Employee Age</td>
            <td>
              <EmployeeInfo text={EmployeeAge} />
            </td>
          </tr>
          <tr>
            <td>Employee Gender</td>
            <td>
              <EmployeeInfo text={EmployeeGender} />
            </td>
          </tr>
          <tr>
            <td>Employee Position</td>
            <td>
              <EmployeeInfo text={EmployeePosition} />
            </td>
          </tr>

        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGEmployee;
