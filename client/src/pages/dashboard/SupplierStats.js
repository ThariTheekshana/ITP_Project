import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  SupplierStatsContainer,
  Loading,
  ChartsContainer,
} from "../../components";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Button";

const SupplierStats = () => {
  const { showSupplierStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showSupplierStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <h3>
        <center>
          Supplier Management
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </center>
      </h3>
      <SupplierStatsContainer />
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
          <Link to={"/add-supplier"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Add Supplier
            </button>
                     {" "}
          </Link>
                   {" "}
          <Link to={"/all-suppliers"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Manage Suppliers
            </button>
                     {" "}
          </Link>
                   {" "}
          <Link to={"/all-SupplierAllDetails"}>
                     {" "}
            <button type="submit" className="btnStyle">
              Generate Report
            </button>
                     {" "}
          </Link>
             {" "}
        </div>
      </Wrapper>
      {/* {monthlyApplications.length > 0 && <ChartsContainer />} */}
    </>
  );
};

export default SupplierStats;
