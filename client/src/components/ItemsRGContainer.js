import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import RGItem from "./RGItem";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Pdf from "react-to-pdf";
import React from "react";

const ItemsRGContainer = () => {
  const {
    ItemId,
    getItems,
    items,
    isLoading,
    page,
    totalItems,
    search,
    searchItemType,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  const ref = React.createRef();
  useEffect(() => {
    getItems();
  }, [page, search, searchItemType, searchType, sort]);

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
      <Pdf targetRef={ref} filename={ItemId + " - " + ".pdf"}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn report-btn">
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className="jobs" ref={ref}>
        {items.map((item) => {
          
          return <RGItem key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default ItemsRGContainer;
