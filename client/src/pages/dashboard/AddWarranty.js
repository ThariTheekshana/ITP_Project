import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddWarranty = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    ItemName,
    ItemBrand,
    WarrantyStartedDate,
    WarrantyPeriod,
    WarrantyExpiredDate,
    WarrantyStatus,
    WarrantyStatusOptions,
    handleChange,
    clearValues,
    createWarranty,
    editWarranty,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !ItemName ||
      !ItemBrand ||
      !WarrantyStartedDate ||
      !WarrantyPeriod ||
      !WarrantyExpiredDate
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editWarranty();
      return;
    }

    createWarranty();
  };

  const handleWarrantyInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit warranty" : "add warranty"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="ItemName"
            labelText="Item Name"
            value={ItemName}
            handleChange={handleWarrantyInput}
          />

          <FormRow
            type="text"
            name="ItemBrand"
            labelText="Item Brand"
            value={ItemBrand}
            handleChange={handleWarrantyInput}
          />

          <FormRow
            type="date"
            name="WarrantyStartedDate"
            labelText="Warranty Started Date"
            value={WarrantyStartedDate}
            handleChange={handleWarrantyInput}
            max={new Date().toISOString().split("T")[0]} // set the max attribute to today's date
            min={new Date().toISOString().split("T")[0]} // set the max attribute to today's date
          />

          <FormRow
            type="text"
            name="WarrantyPeriod"
            labelText="Warranty Period"
            value={WarrantyPeriod}
            handleChange={handleWarrantyInput}
          />

          <FormRow
            type="date"
            name="WarrantyExpiredDate"
            labelText="Warranty Expired Date"
            value={WarrantyExpiredDate}
            handleChange={handleWarrantyInput}
            min={new Date().toISOString().split("T")[0]} // set the max attribute to today's date
          />

          <FormRowSelect
            name="WarrantyStatus"
            value={WarrantyStatus}
            handleChange={handleWarrantyInput}
            list={WarrantyStatusOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>

            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddWarranty;
