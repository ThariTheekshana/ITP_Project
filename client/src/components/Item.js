import moment from "moment";
import React from "react";
//import {GoPrimitiveDot } from 'react-icons/go'
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import ItemInfo from "./ItemInfo";
import FormRow from "./FormRow";
import Pdf from "react-to-pdf";
import ReactToPdf from "react-to-pdf";

const Item = ({
  _id,
  ItemId,
  ItemName,
  ItemBrand,
  ItemPurchasePrice,
  ItemSellingPrice,
  ItemQuantity,
  ItemBenchQuantity,
  ItemType,
  itemSupplier,
  createdAt,
}) => {
  const { setEditItem, deleteItem } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const ref = React.createRef();

  console.log(ref);
  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{ItemBrand.charAt(0)}</div>
        <div className="info">
          <h5>{ItemName}</h5>
          <p>{ItemBrand}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
        &emsp;Item ID
        <ItemInfo text={ItemId} />
        &emsp;ItemPurchasePrice
        <ItemInfo text={ItemPurchasePrice} />
        &emsp;ItemSellingPrice
        <ItemInfo text={ItemSellingPrice} />
        &emsp;ItemQuantity
        <ItemInfo text={ItemQuantity} />
        &emsp;ItemBenchQuantity
        <ItemInfo text={ItemBenchQuantity} />
        &emsp;ItemType
        <ItemInfo text={ItemType} />
        &emsp;itemSupplier
        <ItemInfo text={itemSupplier} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-item"
            className="btn edit-btn"
            onClick={() => setEditItem(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteItem(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf targetRef={ref} filename={ItemId + " - " + ItemType + ".pdf"}>
            {({ toPdf }) => (
              <button onClick={toPdf} className="btn report-btn">
                Generate Pdf
              </button>
            )}
          </Pdf>
        </div>
      </footer>
      <form></form>
    </Wrapper>
  );
};

export default Item;
