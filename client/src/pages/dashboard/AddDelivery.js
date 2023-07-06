import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddDelivery = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
   

    customerName,
    phoneNo,
    deliveryAddress,
    deliveryPerson,
    receivedDate,
    dispatchDate,
    DeliveryStatus,
    DeliveryStatusOptions,
    repairCharge,
    deliveryCharge,
    totalAmount,
    handleChange,
    clearValues,
    createDelivery,
    editDelivery,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
     
      !customerName ||
      !phoneNo ||
      !deliveryAddress ||
      !deliveryPerson ||
      !receivedDate ||
      !dispatchDate | !deliveryCharge
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editDelivery();
      return;
    }
    createDelivery();
  };

  const handleDeliveryInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Delivery" : "Add Delivery"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
       

          {/* customerName */}
          <FormRow
            type="text"
            name="customerName"
            labelText="Customer Name"
            value={customerName}
            handleChange={handleDeliveryInput}
          />

          {/* phoneNo */}
          <FormRow
            type="number"
            name="phoneNo"
            labelText="Contact Number"
            placeholder="07xxxxxxxxx"
            pattern="[7-9]{1}[0-9]{9}"
            value={phoneNo}
            handleChange={handleDeliveryInput}
          />

          {/* deliveryAddress */}
          <FormRow
            type="text"
            name="deliveryAddress"
            labelText="Delivery Address"
            value={deliveryAddress}
            handleChange={handleDeliveryInput}
          />

          {/* deliveryPerson */}
          <FormRow
            type="text"
            name="deliveryPerson"
            labelText="Delivery Person"
            value={deliveryPerson}
            handleChange={handleDeliveryInput}
          />

          {/* receivedDate */}
          <FormRow
            type="date"
            name="receivedDate"
            labelText="Received Date"
            value={receivedDate}
            handleChange={handleDeliveryInput}
            min={new Date().toISOString().split("T")[0]} // set the max attribute to today's dat
          />

          {/* dispatchDate */}
          <FormRow
            type="date"
            name="dispatchDate"
            labelText="Dispatch Date"
            value={dispatchDate}
            handleChange={handleDeliveryInput}
            min={new Date().toISOString().split("T")[0]} // set the max attribute to today's dat
          />

          {/* status */}
          <FormRowSelect
            name="DeliveryStatus"
            labelText="Delivery Status"
            value={DeliveryStatus}
            handleChange={handleDeliveryInput}
            list={DeliveryStatusOptions}
          />

          {/* deliveryCharge */}
          <FormRow
            type="number"
            name="deliveryCharge"
            labelText="Delivery Charge"
            value={deliveryCharge}
            handleChange={handleDeliveryInput}
          />

          {/* btn container */}
          <div className="btn-container">
            {/* btn submit */}
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>

            {/* btn clear */}
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

export default AddDelivery;
