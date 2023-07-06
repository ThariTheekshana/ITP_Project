import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGEmployee from "./RGEmployee";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const EmployeesRGContainer = () => {
  const {
    getEmployees,
    employees,
    isLoading,
    page,
    totalEmployees,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getEmployees();
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
      <Pdf targetRef={ref} filename={ " - " + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {employees.map((employee) => {
          
          return <RGEmployee key={employee._id} {...employee} />;
        })}
      </div>
    </div>
  );
};

export default EmployeesRGContainer;
