import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGPayment from "./RGPayment";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const PaymentsRGContainer = () => {
  const {
    getPayments,
    payments,
    isLoading,
    page,
    totalPayments,
    search,
    searchPaymentMethod,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getPayments();
  }, [page, search, sort]);


  return (
    <div>
      {showAlert && <Alert />}
      <Pdf targetRef={ref} filename={" - " + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {payments.map((payment) => {
          
          return <RGPayment key={payment._id} {...payment} />;
        })}
      </div>
    </div>
  );
};

export default PaymentsRGContainer;
