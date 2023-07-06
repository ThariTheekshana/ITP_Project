import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCustomer = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    FirstName,
    LastName,
    ContactNumber,
    Address,
    DateOfBirth,
    EmailAddress,
    CustomerType,
    CustomerTypeOptions,
    //itemSupplier,
    //itemSupplierOptions,
    handleChange,
    clearValues,
    createCustomer,
    editCustomer,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !FirstName ||
      !LastName ||
      !ContactNumber ||
      !Address ||
      !DateOfBirth ||
      !EmailAddress
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editCustomer();
      return;
    }
    createCustomer();
  };

  const handleCustomerInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name: name, value: value, type: typeof value });
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit customer" : "add customer"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* <FormRow
            type="number"
            labelText="Customer Id"
            name="CustomerId"
            value={CustomerId}
            handleChange={handleCustomerInput}
          /> */}

          <FormRow
            type="text"
            labelText="Customer First Name"
            name="FirstName"
            value={FirstName}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="Customer Last Name"
            name="LastName"
            value={LastName}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="number"
            name="ContactNumber"
            labelText="Customer Contact Number"
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            value={ContactNumber}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            name="Address"
            value={Address}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="date"
            name="DateOfBirth"
            labelText="Date of Birth"
            value={DateOfBirth}
            handleChange={handleCustomerInput}
            max={new Date().toISOString().split("T")[0]} // set the max attribute to today's date
          />

          <FormRow
            type="text"
            labelText="Email Address"
            name="EmailAddress"
            placeholder="sasindu@gmail.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={EmailAddress}
            handleChange={handleCustomerInput}
          />

          <FormRowSelect
            name="CustomerType"
            labelText="Customer Type"
            value={CustomerType}
            handleChange={handleCustomerInput}
            list={CustomerTypeOptions}
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
export default AddCustomer;
