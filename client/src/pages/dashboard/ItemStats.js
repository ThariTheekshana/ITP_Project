import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { ItemStatsContainer, Loading, ChartsContainer } from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Item Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <ItemStatsContainer />
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
          <Link to={"/add-item"}>
                {" "}
            <button type="submit" className="btnStyle">
              Add Item
            </button>
                {" "}
          </Link>
              {" "}
          <Link to={"/all-items"}>
                {" "}
            <button type="submit" className="btnStyle">
              Manage Items
            </button>
                {" "}
          </Link>
              {" "}
          <Link to={"/all-ItemAllDetails"}>
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

export default Stats;
