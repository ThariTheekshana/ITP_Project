import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import DeliveryInfo from "./DeliveryInfo";
import Pdf from "react-to-pdf";
import React from "react";

const Delivery = ({
  _id,
  DeliveryId,
  RepairId,
  itemName,
  customerName,
  phoneNo,
  deliveryAddress,
  deliveryPerson,
  receivedDate,
  dispatchDate,
  DeliveryStatus,
  repairCharge,
  deliveryCharge,
  totalAmount,
  createdAt,
}) => {
  const { setEditDelivery, deleteDelivery } = useAppContext();

  const ref = React.createRef();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{customerName.charAt(0)}</div>
        <div className="info">
          <h5>{DeliveryId}</h5>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;Delivery ID
        <DeliveryInfo text={DeliveryId} />
        &emsp;Customer Name
        <DeliveryInfo text={customerName} />
        &emsp;Contact Number
        <DeliveryInfo text={phoneNo} />
        &emsp;Delivery Address
        <DeliveryInfo text={deliveryAddress} />
        &emsp;Delivery Person
        <DeliveryInfo text={deliveryPerson} />
        &emsp;Received Date
        <DeliveryInfo text={receivedDate} />
        &emsp;Dispatch Date
        <DeliveryInfo text={dispatchDate} />
        &emsp;DeliveryStatus
        <DeliveryInfo text={DeliveryStatus} />
        &emsp;Delivery Charge
        <DeliveryInfo text={deliveryCharge} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-delivery"
            className="btn edit-btn"
            onClick={() => setEditDelivery(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteDelivery(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf
            targetRef={ref}
            filename={DeliveryId + " - " + itemName + ".pdf"}
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

export default Delivery;
