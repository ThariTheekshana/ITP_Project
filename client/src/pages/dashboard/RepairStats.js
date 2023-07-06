import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  RepairStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const RepairStats = () => {
  const { showRepairStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showRepairStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Repair Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <RepairStatsContainer />
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
          <Link to={"/add-repair"}>
            <button type="submit" className="btnStyle">
              Add Repair
            </button>
          </Link>
           {" "}
          <Link to={"/all-repairs"}>
            <button type="submit" className="btnStyle">
              Manage Repairs
            </button>
          </Link>
           {" "}
          <Link to={"/all-RepairAllDetails"}>
            <button type="submit" className="btnStyle">
              Generate Report
            </button>
          </Link>
        </div>
      </Wrapper>
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default RepairStats;
