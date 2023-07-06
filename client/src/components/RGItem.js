import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import ItemInfo from "./ItemInfo";

import LogoRG from "./LogoRG";

const RGItem = ({
  _id,
  ItemId,
  ItemName,
  ItemBrand,
  ItemPurchasePrice,
  ItemSellingPrice,
  ItemQuantity,
//   ItemBenchQuantity,
  ItemType,
  itemSupplier,
  
}) => {
  const { setEditItem, deleteItem } = useAppContext();

  const ref = React.createRef();


//   let date = moment(createdAt);
//   date = date.format("MMM Do, YYYY");

  return (
    <Wrapper ref={ref}>
      <LogoRG/>
      <table className="customer-table" style={{ border: "10px solid #ddd" }}>
        <tbody>
          <tr>
            <td>Item ID</td>
            <td>
            <ItemInfo text={ItemId} />
            </td>
          </tr>
          <tr>
            <td>Item Name</td>
            <td>
              <ItemInfo text={ItemName} />
            </td>
          </tr>
          <tr>
            <td>Item Brand</td>
            <td>
              <ItemInfo text={ItemBrand} />
            </td>
          </tr>
          <tr>
            <td>Item Purchase Price</td>
            <td>
              <ItemInfo text={ItemPurchasePrice} />
            </td>
          </tr>
          <tr>
            <td>Item Selling Price</td>
            <td>
              <ItemInfo text={ItemSellingPrice} />
            </td>
          </tr>
          <tr>
            <td>Item Quantity</td>
            <td>
              <ItemInfo text={ItemQuantity} />
            </td>
          </tr>
          <tr>
            <td>Item Type</td>
            <td>
              <ItemInfo text={ItemType} />
            </td>
          </tr>
          <tr>
            <td>Item Supplier</td>
            <td>
              <ItemInfo text={itemSupplier} />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default RGItem;
