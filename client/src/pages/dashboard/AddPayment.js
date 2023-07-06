import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddPayment = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
 
    CustomerName,
    PaymentMethod,
    MobileNumber,
    PaymentMethodOptions,
    handleChange,
    clearValues,
    createPayment,
    editPayment,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!CustomerName || !PaymentMethod || !MobileNumber) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editPayment();
      return;
    }

    createPayment();
  };

  const handlePaymentInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit payment" : "add payment"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* ItemPurchasePrice*/}
          <FormRow
            type="text"
            labelText="Customer Name"
            name="CustomerName"
            value={CustomerName}
            handleChange={handlePaymentInput}
          />

          {/* ItemSellingPrice */}

          {/* ItemBenchQuantity */}
          <FormRow
            type="number"
            labelText="Mobile Number"
            name="MobileNumber"
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            value={MobileNumber}
            handleChange={handlePaymentInput}
          />

          {/* item status */}
          <FormRowSelect
            name="PaymentMethod"
            labelText="Payment Method"
            value={PaymentMethod}
            handleChange={handlePaymentInput}
            list={PaymentMethodOptions}
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
export default AddPayment;
