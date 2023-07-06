import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGWarranty from "./RGWarranty";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const WarrantiesRGContainer = () => {
  const {
    getWarranties,
    warranties,
    isLoading,
    page,
    totalWarranties,
    search,
    searchWarrantyStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getWarranties();
  }, [page, search, searchType, sort]);

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
      <Pdf targetRef={ref} filename={" - " + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {warranties.map((warranty) => {
          
          return <RGWarranty key={warranty._id} {...warranty} />;
        })}
      </div>
    </div>
  );
};

export default WarrantiesRGContainer;
