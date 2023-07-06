import {
  FormRow,
  FormRowSelect,
  Alert,
  ItemSearchContainer,
} from "../../components/index.js";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import moment from "moment";
import { useState } from "react";

const AddRepair = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [repairDate, setRepairDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  // const AddRepair = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    customerName,
    // repairDate,
    // returnDate,
    WarrantyStatus,
    email,
    customerNumber,
    WarrantyId,
    IssueDescription,
    repairStatus,
    repairStatusOptions,
    repairType,
    repairTypeOptions,
    handleChange,
    clearValues,
    createRepair,
    editRepair,
    // } = useAppContext();
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("ADD TO  REPAIR");

    if (
      !customerName ||
      !repairDate ||
      !returnDate ||
      !email ||
      !customerNumber
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editRepair();
      return;
    }

    createRepair();
  };

  // start date handler
  const handleRepairDateChange = (e) => {
    setRepairDate(e.target.value);
    if (e.target.value > returnDate) {
      setReturnDate(e.target.value);
    }
  };

  // end date handler
  const handleReturnDateChange = (e) => {
    setRepairDate(e.target.value);
    if (e.target.value > repairDate) {
      setReturnDate(e.target.value);
    }
  };

  const handleRepairInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name: name, value: value, type: typeof value });
    handleChange({ name, value });
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const isValidDate = (currentDate, selectedDate) => {
    return currentDate.isSame(selectedDate, "day");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
    setLastName(event.target.value + " @gamil.com"); // auto-fill last name
  }

  function handleLastNameChange(event) {
    setLastName(event.target.customerNumber);
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit repair" : "add repair"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* customerName */}
          <FormRow
            type="text"
            labelText="Customer Name"
            name="customerName"
            value={customerName}
            handleChange={handleRepairInput}
          />

          {/* customerNumber */}
          <FormRow
            type="tel"
            name="customerNumber"
            labelText="Customer Number"
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            value={customerNumber}
            handleChange={handleRepairInput}
          />

          {/* email */}
          <FormRow
            type="email"
            name="email"
            placeholder="sasindu@gmail.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={email}
            handleChange={handleRepairInput}
          />

          {/* warrantyId */}
          <FormRow
            type="text"
            name="WarrantyId"
            labelText="Warranty Id"
            value={WarrantyId}
            handleChange={handleRepairInput}
          />

          {/* warrantyId */}
          <FormRow
            type="text"
            name="WarrantyStatus"
            labelText="Warranty Status"
            value={WarrantyStatus}
            handleChange={handleRepairInput}
          />

          {/* repairDate */}
          <FormRow
            type="date"
            labelText="repair Date"
            name="repairDate"
            value={repairDate}
            min={moment().format("YYYY-MM-DD")}
            max={moment().add(0, "days").format("YYYY-MM-DD")}
            onChange={handleRepairDateChange}
            handleChange={handleRepairInput}
          />

          {/* returnDate*/}
          <FormRow
            type="date"
            labelText="Return Date"
            name="returnDate"
            value={returnDate}
            min={moment().format("YYYY-MM-DD")}
            max={moment().add(365, "days").format("YYYY-MM-DD")}
            onChange={handleReturnDateChange}
            handleChange={handleRepairInput}
          />

          {/* repair status */}
          {/* repair status */}
          <FormRowSelect
            name="repairStatus"
            labelText="Repair Status"
            value={repairStatus}
            handleChange={handleRepairInput}
            list={repairStatusOptions}
          />
          {/* Item Supplier */}
          <FormRowSelect
            name="repairType"
            labelText="Repair Type"
            value={repairType}
            handleChange={handleRepairInput}
            list={repairTypeOptions}
          />

          {/* Issue Description */}
          <FormRow
            type="text"
            name="IssueDescription"
            labelText="Issue Description"
            value={IssueDescription}
            handleChange={handleRepairInput}
          />
        </div>
      </form>
      <br />
      <br />
      <form className="form">
        <div className="form-center">
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddRepair;
