import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  PaymentStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const PaymentStats = () => {
  const { showPaymentStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showPaymentStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Payment Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <PaymentStatsContainer />
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
          <Link to={"/add-payment"}>
                {" "}
            <button type="submit" className="btnStyle">
              Add Payment
            </button>
                {" "}
          </Link>
                   {" "}
          <Link to={"/all-payments"}>
                {" "}
            <button type="submit" className="btnStyle">
              Manage Payments
            </button>
                {" "}
          </Link>
                   {" "}
          <Link to={"/all-PaymentAllDetails"}>
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

export default PaymentStats;
