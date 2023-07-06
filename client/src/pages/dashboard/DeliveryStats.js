import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  DeliveryStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const DeliveryStats = () => {
  const { showDeliveryStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showDeliveryStats();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Delivery Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </center>
      </h3>
      <DeliveryStatsContainer />
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
          <Link to={"/add-delivery"}>
            {" "}
            <button type="submit" className="btnStyle">
              Add Delivery
            </button>{" "}
          </Link>{" "}
          <Link to={"/all-deliveries"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Manage Deliveries
            </button>{" "}
          </Link>{" "}
          <Link to={"/all-DeliveryAllDetails"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Generate Report
            </button>{" "}
          </Link>
        </div>
      </Wrapper>
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default DeliveryStats;
