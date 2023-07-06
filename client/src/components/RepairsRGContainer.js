import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGRepair from "./RGRepair";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const RepairsRGContainer = () => {
  const {
    getRepairs,
    repairs,
    isLoading,
    page,
    totalRepairs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getRepairs();
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
        {repairs.map((repair) => {
          
          return <RGRepair key={repair._id} {...repair} />;
        })}
      </div>
    </div>
  );
};

export default RepairsRGContainer;
