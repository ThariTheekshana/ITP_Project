import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  CustomerStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";


import RGCustomer from "../../components/RGCustomer";

const Stats = () => {
  const { showCustomerStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showCustomerStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Customer Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <CustomerStatsContainer />
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
          <Link to={"/add-customer"}>
            <button type="submit" className="btnStyle">
              Add Customer
            </button>
          </Link>
           {" "}
          <Link to={"/all-customers"}>
            <button type="submit" className="btnStyle">
              Manage Customers
            </button>
          </Link>
           {" "}
          <Link to={"/all-CustomerAllDetails"}>
            <button type="submit" className="btnStyle" >
              Generate Report
            </button>
          </Link>
        </div>
      </Wrapper>
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
