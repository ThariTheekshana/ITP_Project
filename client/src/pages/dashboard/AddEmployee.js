import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddEmployee = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,

    EmployeeName,
    EmployeeNIC,
    EmployeeAddress,
    EmployeeContactNumber,
    EmployeeEmail,
    EmployeeAge,
    EmployeeGender,
    EmployeePosition,

    employeePositionOptions,
    employeeGenderOptions,
    handleChange,
    clearValues,
    createEmployee,
    editEmployee,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !EmployeeName ||
      !EmployeeNIC ||
      !EmployeeAddress ||
      !EmployeeContactNumber ||
      !EmployeeEmail ||
      !EmployeeAge ||
      !EmployeePosition
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editEmployee();
      return;
    }

    createEmployee();
  };

  const handleEmployeeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit employee" : "add employee"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* EmployeeName */}
          <FormRow
            type="text"
            labelText="Employee Name"
            name="EmployeeName"
            value={EmployeeName}
            handleChange={handleEmployeeInput}
          />

          {/*EmployeeNIC */}
          <FormRow
            type="text"
            labelText="Employee NIC"
            name="EmployeeNIC"
            value={EmployeeNIC}
            handleChange={handleEmployeeInput}
          />

          {/* EmployeeAddress*/}
          <FormRow
            type="text"
            labelText="Employee Address"
            name="EmployeeAddress"
            value={EmployeeAddress}
            handleChange={handleEmployeeInput}
          />

          {/* EmployeeContactNumber  */}
          <FormRow
            type="text"
            labelText="Employee Contact Number"
            name="EmployeeContactNumber"
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            value={EmployeeContactNumber}
            handleChange={handleEmployeeInput}
          />

          {/* EmployeeEmail */}
          <FormRow
            type="text"
            labelText="Employee Email"
            name="EmployeeEmail"
            placeholder="sasindu@gmail.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={EmployeeEmail}
            handleChange={handleEmployeeInput}
          />

          {/* EmployeeAge */}
          <FormRow
            type="text"
            labelText="Employee Age"
            name="EmployeeAge"
            value={EmployeeAge}
            handleChange={handleEmployeeInput}
          />

          {/* EmployeePosition */}
          <FormRowSelect
            //type="text"
            name="EmployeePosition"
            labelText="Employee Position"
            value={EmployeePosition}
            handleChange={handleEmployeeInput}
            list={["all", ...employeePositionOptions]}
          />

          {/* EmployeeGender */}
          <FormRowSelect
            name="EmployeeGender"
            labelText="Employee Gender"
            value={EmployeeGender}
            handleChange={handleEmployeeInput}
            list={["all", ...employeeGenderOptions]}
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
export default AddEmployee;
