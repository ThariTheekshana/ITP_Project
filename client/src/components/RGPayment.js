import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import PaymentInfo from "./PaymentInfo";

import LogoRG from "./LogoRG";

const RGPayment = ({
  PaymentId,
  CustomerName,
  MobileNumber,
  PaymentMethod,
}) => {
  const { setEditPayment, deletePayment } = useAppContext();

  const ref = React.createRef();



  return (
    <Wrapper ref={ref}>
      <LogoRG />
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
          <tr>
            <td>Payment ID</td>
            <td>
              <PaymentInfo text={PaymentId} />
            </td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>
              <PaymentInfo text={CustomerName} />
            </td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>
              <PaymentInfo text={MobileNumber} />
            </td>
          </tr>
          <tr>
            <td>Payment Method</td>
            <td>
              <PaymentInfo text={PaymentMethod} />
            </td>
          </tr>

          
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGPayment;
