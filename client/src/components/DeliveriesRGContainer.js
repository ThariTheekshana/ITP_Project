import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGDelivery from "./RGDelivery";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const DeliveriesRGContainer = () => {
  const {
        getDeliveries,
        deliveries,
        isLoading, 
        page,
        totalDeliveries,
        search,
        searchDeliveryStatus,
        sort,
        numOfPages,
        showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getDeliveries();
  }, [page, search, sort]);


  return (
    <div>
      {showAlert && <Alert />}
      <Pdf targetRef={ref} filename={ " - " + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {deliveries.map((delivery) => {
          
          return <RGDelivery key={delivery._id} {...delivery} />;
        })}
      </div>
    </div>
  );
};

export default DeliveriesRGContainer;
