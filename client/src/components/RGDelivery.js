import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import DeliveryInfo from "./DeliveryInfo";

import LogoRG from "./LogoRG";

const RGDelivery = ({
  _id,
  DeliveryId,
  itemName,
  customerName,
  phoneNo,
  deliveryAddress,
  deliveryPerson,
  receivedDate,
  dispatchDate,
  DeliveryStatus,
  deliveryCharge,
  //totalAmount,
  
}) => {
  const { setEditDelivery, deleteDelivery } = useAppContext();

  const ref = React.createRef();



  return (
    <Wrapper ref={ref}>
      <LogoRG />
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
          <tr>
            <td>Delivery ID</td>
            <td>
              <DeliveryInfo text={DeliveryId} />
            </td>
          </tr>
          <tr>
            <td>Item Name</td>
            <td>
              <DeliveryInfo text={itemName} />
            </td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>
              <DeliveryInfo text={customerName} />
            </td>
          </tr>
          <tr>
            <td>phone No</td>
            <td>
              <DeliveryInfo text={phoneNo} />
            </td>
          </tr>
          <tr>
            <td>Delivery Address</td>
            <td>
              <DeliveryInfo text={deliveryAddress} />
            </td>
          </tr>
          <tr>
            <td>Delivery Person</td>
            <td>
              <DeliveryInfo text={deliveryPerson} />
            </td>
          </tr>
            <tr>
            <td>Received Date</td>
            <td>
              <DeliveryInfo text={receivedDate} />
            </td>
          </tr>
            <tr>
            <td>Dispatch Date</td>
            <td>
              <DeliveryInfo text={dispatchDate} />
            </td>
          </tr>
          <tr>
            <td>Delivery Status</td>
            <td>
              <DeliveryInfo text={DeliveryStatus} />
            </td>
          </tr>
          <tr>
            <td>Delivery Charge</td>
            <td>
              <DeliveryInfo text={deliveryCharge} />
            </td>
          </tr>
    
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGDelivery;
