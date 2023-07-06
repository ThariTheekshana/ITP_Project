import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddSupplier = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    supplierName,
    supplierEmail,
    supplierContactNo,
    supplierAddress,
    SupplierType,
    SupplierTypeOptions,
    handleChange,
    clearValues,
    createSupplier,
    editSupplier,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !supplierName ||
      !supplierEmail ||
      !supplierContactNo ||
      !supplierAddress
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editSupplier();
      return;
    }

    createSupplier();
  };

  const handleSupplierInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit supplier" : "add supplier"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* SupplierName */}
          <FormRow
            type="text"
            name="supplierName"
            value={supplierName}
            labelText="Supplier Name"
            handleChange={handleSupplierInput}
          />

          {/* SupplierEEmail */}
          <FormRow
            type="text"
            name="supplierEmail"
            placeholder="sasindu@gmail.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={supplierEmail}
            labelText="Supplier Email"
            handleChange={handleSupplierInput}
          />

          {/* SupplierContactNo */}
          <FormRow
            type="text"
            name="supplierContactNo"
            value={supplierContactNo}
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            labelText="Supplier ContactNo"
            handleChange={handleSupplierInput}
          />

          <FormRowSelect
            name="SupplierType"
            value={SupplierType}
            labelText="Supplier Type"
            handleChange={handleSupplierInput}
            list={SupplierTypeOptions}
          />

          {/* SupplierAddress */}
          <FormRow
            type="text"
            name="supplierAddress"
            labelText="Supplier Address"
            value={supplierAddress}
            handleChange={handleSupplierInput}
          />

          {/* Supplier status */}

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
export default AddSupplier;
