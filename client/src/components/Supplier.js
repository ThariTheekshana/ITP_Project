import Pdf from "react-to-pdf";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import SupplierInfo from "./SupplierInfo";

const Supplier = ({
  _id,
  SupplierId,
  supplierName,
  supplierEmail,
  supplierContactNo,
  SupplierType,
  supplierAddress,
  createdAt,
}) => {
  const { setEditSupplier, deleteSupplier } = useAppContext();
  const ref = React.createRef();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{supplierName.charAt(0)}</div>
        <div className="info">
          <h5>{supplierName}</h5>
          <p>{supplierAddress}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center" ref={ref}>
          &emsp;Supplier ID
          <SupplierInfo text={SupplierId} />
          &emsp;Supplier Name
          <SupplierInfo text={supplierName} />
          &emsp;Supplier Email
          <SupplierInfo text={supplierEmail} />
          &emsp;Contact No
          <SupplierInfo text={supplierContactNo} />
          &emsp;SupplierType
          <SupplierInfo text={SupplierType} />
          &emsp;Supplier Address
          <SupplierInfo text={supplierAddress} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-supplier"
            className="btn edit-btn"
            onClick={() => setEditSupplier(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteSupplier(_id)}
          >
            Delete
          </button>
          {"   "}
          <Pdf targetRef={ref} filename={SupplierId + " - " + supplierName + ".pdf"}>
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

export default Supplier;
