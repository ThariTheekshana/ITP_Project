import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  EmployeeStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const EmployeeStats = () => {
  const { showEmployeeStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showEmployeeStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Employee Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <EmployeeStatsContainer />
      <br></br>
      <Wrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
              {" "}
          <Link to={"/add-employee"}>
                {" "}
            <button type="submit" className="btnStyle">
              Add Employee
            </button>
                {" "}
          </Link>
              {" "}
          <Link to={"/all-employees"}>
                {" "}
            <button type="submit" className="btnStyle">
              Manage Employees
            </button>
                {" "}
          </Link>
              {" "}
          <Link to={"/all-EmployeeAllDetails"}>
                {" "}
            <button type="submit" className="btnStyle">
              Generate Report
            </button>
                {" "}
          </Link>
           {" "}
        </div>
      </Wrapper>
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default EmployeeStats;
