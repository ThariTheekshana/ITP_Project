import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGCustomer from "./RGCustomer";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const CustomersRGContainer = () => {
  const {
    CustomerId,
    getCustomers,
    customers,
    isLoading,
    FirstName,
    page,
    totalCustomers,
    search,
    searchCustomerType,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getCustomers();
  }, [page, search, searchCustomerType, searchType, sort]);

  // if (isLoading) {
  //   return <Loading center />;
  // }

  // if (customers.length === 0) {
  //   return (
  //     <Wrapper>
  //       <h2>No Customers to display....</h2>
  //     </Wrapper>
  //   );
  // }

  return (
    <div>
      {showAlert && <Alert />}
      <Pdf targetRef={ref} filename={CustomerId + " - " + FirstName + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {customers.map((customer) => {
          
          return <RGCustomer key={customer._id} {...customer} />;
        })}
      </div>
    </div>
  );
};

export default CustomersRGContainer;
