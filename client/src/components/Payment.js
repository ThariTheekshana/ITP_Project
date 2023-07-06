import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import PaymentInfo from "./PaymentInfo";
import Pdf from "react-to-pdf";
import React from "react";

const Payment = ({
  _id,
  PaymentId,
  ItemId,
  CustomerName,
  MobileNumber,
  ItemName,
  ItemBrand,
  Quantity,
  PaymentMethod,
  
}) => {
  const { setEditPayment, deletePayment } = useAppContext();

  const ref = React.createRef();
  //ori ekn gtte
  // let date = moment(createdAt)
  // date = date.format('MMM Do, YYYY')

  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{CustomerName.charAt(0)}</div>
        <div className="info">
          <h5>{CustomerName}</h5>
          <p>{MobileNumber}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;Payment ID
        <PaymentInfo text={PaymentId} />
        {/* &emsp;Item ID
        <PaymentInfo text={ItemId} />
        &emsp;ItemName
        <PaymentInfo text={ItemName} />
        &emsp;ItemBrand
        <PaymentInfo text={ItemBrand} />
        &emsp;Quantity
        <PaymentInfo text={Quantity} /> */}
        &emsp;PaymentMethod
        <PaymentInfo text={PaymentMethod} />
        {/* &emsp;UnitPrice
        <PaymentInfo text={UnitPrice} /> */}
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-payment"
            className="btn edit-btn"
            onClick={() => setEditPayment(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deletePayment(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf
            targetRef={ref}
            filename={PaymentId + " - " + PaymentId + ".pdf"}
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

export default Payment;
