import moment from "moment";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import WarrantyInfo from "./WarrantyInfo";
import Pdf from "react-to-pdf";
import React from "react";

const Warranty = ({
  _id,
  WarrantyId,
  ItemName,
  ItemBrand,
  WarrantyStartedDate,
  WarrantyPeriod,
  WarrantyExpiredDate,
  WarrantyStatus,
  //createdAt,
}) => {
  const { setEditWarranty, deleteWarranty } = useAppContext();
  const ref = React.createRef();
  //ori ekn gtte
  // let date = moment(createdAt)
  // date = date.format('MMM Do, YYYY')

  return (
    <Wrapper>
       
      <header>
        <div className="main-icon">{ItemBrand.charAt(0)}</div>
        <div className="info">
          <h5>{WarrantyId}</h5>
          <p>{ItemBrand}</p>
        </div>
      </header>
      <div className="content"></div>
      <div className="content-center">
        Item Name
        <WarrantyInfo text={ItemName} />
        WarrantyStartedDate
        <WarrantyInfo icon={<FaLocationArrow />} text={WarrantyStartedDate} />
        WarrantyPeriod
        <WarrantyInfo icon={<FaLocationArrow />} text={WarrantyPeriod} />
        WarrantyExpiredDate
        <WarrantyInfo icon={<FaLocationArrow />} text={WarrantyExpiredDate} />
        WarrantyStatus
        <WarrantyInfo icon={<FaLocationArrow />} text={WarrantyStatus} />
      </div>
      <footer>
        <div className="actions">
          <Link
            to="/add-warranty"
            className="btn edit-btn"
            onClick={() => setEditWarranty(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteWarranty(_id)}
          >
            Delete
          </button>
          <Pdf
            targetRef={ref}
            filename={WarrantyId + " - " + WarrantyId + ".pdf"}
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

export default Warranty;
