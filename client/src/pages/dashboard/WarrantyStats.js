import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  WarrantyStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const WarrantyStats = () => {
  const { showWarrantyStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showWarrantyStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Warranty Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <WarrantyStatsContainer />
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
          <Link to={"/add-warranty"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Add Warranty
            </button>
                     {" "}
          </Link>
                                       {" "}
          <Link to={"/all-warranties"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Manage Warranties
            </button>
                     {" "}
          </Link>
                                       {" "}
          <Link to={"/all-WarrantyAllDetails"}>
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

export default WarrantyStats;
