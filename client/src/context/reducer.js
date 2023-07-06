import {
        CLEAR_ALERT,
        DISPLAY_ALERT,
        SETUP_USER_BEGIN,
        SETUP_USER_SUCCESS,
        SETUP_USER_ERROR,
        TOGGLE_SIDEBAR,
        LOGOUT_USER,
        UPDATE_USER_BEGIN,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
        HANDLE_CHANGE,
        CLEAR_VALUES,
//Item management
        CREATE_ITEM_BEGIN,
        CREATE_ITEM_SUCCESS,
        CREATE_ITEM_ERROR,
        GET_ITEMS_BEGIN,
        GET_ITEMS_SUCCESS,
        SET_EDIT_ITEM,
        DELETE_ITEM_BEGIN,
        DELETE_ITEM_ERROR,
        EDIT_ITEM_BEGIN,
        EDIT_ITEM_SUCCESS,
        EDIT_ITEM_ERROR,
//Customer management
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  SET_EDIT_CUSTOMER,
  DELETE_CUSTOMER_BEGIN,
  DELETE_CUSTOMER_ERROR,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_ERROR,

//Payment Management
  CREATE_PAYMENT_BEGIN,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
  GET_PAYMENTS_BEGIN,
  GET_PAYMENTS_SUCCESS,
  SET_EDIT_PAYMENT,
  DELETE_PAYMENT_BEGIN,
  DELETE_PAYMENT_ERROR,
  EDIT_PAYMENT_BEGIN,
  EDIT_PAYMENT_SUCCESS,
  EDIT_PAYMENT_ERROR,
  
  //Supplier Management
  CREATE_SUPPLIER_BEGIN,
  CREATE_SUPPLIER_SUCCESS,
  CREATE_SUPPLIER_ERROR,
  GET_SUPPLIERS_BEGIN,
  GET_SUPPLIERS_SUCCESS,
  SET_EDIT_SUPPLIER,
  DELETE_SUPPLIER_BEGIN,
  DELETE_SUPPLIER_ERROR,
  EDIT_SUPPLIER_BEGIN,
  EDIT_SUPPLIER_SUCCESS,
  EDIT_SUPPLIER_ERROR,

        //Repair
      CREATE_REPAIR_BEGIN,
      CREATE_REPAIR_SUCCESS,
      CREATE_REPAIR_ERROR,
      GET_REPAIRS_BEGIN,
      GET_REPAIRS_SUCCESS,
      SET_EDIT_REPAIR,
      DELETE_REPAIR_BEGIN,
      DELETE_REPAIR_ERROR,
      EDIT_REPAIR_BEGIN,
      EDIT_REPAIR_SUCCESS,
      EDIT_REPAIR_ERROR,

      //delivery
      CREATE_DELIVERY_BEGIN,
      CREATE_DELIVERY_SUCCESS,
      CREATE_DELIVERY_ERROR,
      GET_DELIVERIES_BEGIN,
      GET_DELIVERIES_SUCCESS,
      SET_EDIT_DELIVERY,
      DELETE_DELIVERY_BEGIN,
      DELETE_DELIVERY_ERROR,
      EDIT_DELIVERY_BEGIN,
      EDIT_DELIVERY_SUCCESS,
      EDIT_DELIVERY_ERROR,
      //Employee
        CREATE_EMPLOYEE_BEGIN,
        CREATE_EMPLOYEE_SUCCESS,
        CREATE_EMPLOYEE_ERROR,
        GET_EMPLOYEES_BEGIN,
        GET_EMPLOYEES_SUCCESS,
        SET_EDIT_EMPLOYEE,
        DELETE_EMPLOYEE_BEGIN,
        DELETE_EMPLOYEE_ERROR,
        EDIT_EMPLOYEE_BEGIN,
        EDIT_EMPLOYEE_SUCCESS,
        EDIT_EMPLOYEE_ERROR,

//Warranty
        CREATE_WARRANTY_BEGIN,
        CREATE_WARRANTY_SUCCESS,
        CREATE_WARRANTY_ERROR,
        GET_WARRANTIES_BEGIN,
        GET_WARRANTIES_SUCCESS,
        SET_EDIT_WARRANTY,
        DELETE_WARRANTY_BEGIN,
        DELETE_WARRANTY_ERROR,
        EDIT_WARRANTY_BEGIN,
        EDIT_WARRANTY_SUCCESS,
        EDIT_WARRANTY_ERROR,
  //All
        SHOW_STATS_BEGIN,
        SHOW_STATS_SUCCESS,
        CLEAR_FILTERS,
        CHANGE_PAGE,
        GET_CURRENT_USER_BEGIN,
        GET_CURRENT_USER_SUCCESS,

        ////////
        // SET_REPAIR_ITEM,

    } from "./actions"
    import { initialState } from "./appContext"
const reducer = (state ,
   action) => {  
    if(action.type === DISPLAY_ALERT){
        return {
           ...state,showAlert:true,
            alertType:'danger',
        alertText:'Please Provide all values!'
    }
    }
        if(action.type === CLEAR_ALERT){
        return {
            ...state,showAlert:false,
            alertType:'',
        alertText:''
    }
    }

        if(action.type === SETUP_USER_BEGIN){
        return{...state,isLoading: true}
    }
       if(action.type === SETUP_USER_SUCCESS){
       return{
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      //jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
    }

        if(action.type === SETUP_USER_ERROR){
        return{
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };

    }

           if(action.type === TOGGLE_SIDEBAR){
        return{
            ...state,
            showSidebar: !state.showSidebar,
    }
    }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }
    if(action.type === UPDATE_USER_BEGIN){
        return{...state,isLoading: true}
    }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      //jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

    if(action.type === CLEAR_VALUES){
        const initialState = {
    isEditing:false,
    editItemId:'',
    //ItemId:'',
    ItemName:'',
    ItemBrand:'',
    ItemPurchasePrice:'',
    ItemSellingPrice:'',
    ItemQuantity:'',
    ItemBenchQuantity:'',
    ItemType:'Laptops',
    itemSupplier:'Malith',

          //isEditing: true,
      editCustomerId:'',
      CustomerId:'',
      FirstName:'',
      LastName:'',
      ContactNumber:'',
      Address:'',
      DateOfBirth:'',
      EmailAddress:'',
      CustomerType:'normalCustomer',
      editPaymentId:'',
      PaymentId:'',
      CustomerName:'',
      UnitPrice:'',
      Quantity:'',
      PaymentMethod:'',
      MobileNumber:'',
      editSupplierId:'',
      SupplierId:'',   
      supplierName:'',
      supplierEmail:'',
      supplierContactNo:'',
      SupplierType:'Laptops',
      supplierAddress:'',
    editCustomerName:'',
    //RepairId:'',
    customerName:'',
    repairDate:'',
    returnDate:'',
    WarrantyStatus:'',
    IssueDescription:'',
    email:'',
    customerNumber:'',
    warrantyId:'',
    repairStatus:'toComplete',
    repairType:'hardware',
      editDeliveryId:'',
      DeliveryId:'',
      RepairId:'',
      itemName:'',
      customerName:'',
      phoneNo:'',
      deliveryAddress:'',
      deliveryPerson:'',
      receivedDate:'',
      dispatchDate:'',
      DeliveryStatus:'Pending',
      repairCharge:'',
      deliveryCharge:'',
      totalAmount:'',
      editEmployeeID:'',
      EmployeeID:'',
      EmployeeName:'',
      EmployeeNIC:'',
      EmployeeAddress:'',
      EmployeeContactNumber:'',
     EmployeeEmail:'',
      EmployeeAge:'',
      EmployeeGender:'',
      EmployeePosition:'all',
      editWarrantyId:'',
      WarrantyId:'',
      ItemName:'',
      ItemBrand:'',
      WarrantyStartedDate:'',
      WarrantyPeriod:'',
      WarrantyExpiredDate:'',
      WarrantyStatus:'Valid',


        }

        return{
            ...state,
            ...initialState,
    }
}


//ITEM MANAGEMENT
if(action.type === CREATE_ITEM_BEGIN){
    return {...state,isLoading:true}
}

        if(action.type === CREATE_ITEM_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Item Created!',
    };
    }

        if(action.type === CREATE_ITEM_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

    if(action.type === GET_ITEMS_BEGIN){
        return {...state, isLoading: true, showAlert: false}
    }

    if(action.type === GET_ITEMS_SUCCESS){
    return{
       ...state,
        isLoading: false,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        numOfPages: action.payload.numOfPages,
    }
    }

    if(action.type === SET_EDIT_ITEM){
        const item = state.items.find((item) => item._id === action.payload.id);
        const{_id,ItemName,ItemBrand,ItemPurchasePrice,ItemSellingPrice,ItemQuantity,ItemBenchQuantity,ItemType,itemSupplier} = item
        return{
           ...state,
            isEditing:true,
            editItemId: _id,
           // ItemId,
            ItemName,
            ItemBrand,
            ItemPurchasePrice,
            ItemSellingPrice,
            ItemQuantity,
            ItemBenchQuantity,
            ItemType,
            itemSupplier,
            
        }
    }

// if(action.type === SET_REPAIR_ITEM){
//   const item = state.items.find((item) => item.ItemId === action.payload.id);
//   const{ItemName,ItemId} = item

//    return{
//            ...state,
//             isEditing:true,
//             editItemId: ItemId,
//             ItemId,
//             ItemName,
//         }
// }
    if(action.type === DELETE_ITEM_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
  if (action.type === DELETE_ITEM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

        if(action.type === EDIT_ITEM_BEGIN){
        return{
            ...state,
            isLoading: true,
    }
    }
            if(action.type === EDIT_ITEM_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'Item Updated!',

    }

    }

        if(action.type === EDIT_ITEM_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

//CUSTOMER MANAGEMENT

if (action.type === CREATE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Customer Created!',
    };
  }

  if (action.type === CREATE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_CUSTOMERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_CUSTOMERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customers: action.payload.customers,
      totalCustomers: action.payload.totalCustomers,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === SET_EDIT_CUSTOMER) {
    const customer = state.customers.find((customer) => customer._id === action.payload.id);
    const { _id, CustomerId, FirstName, LastName, ContactNumber, Address, DateOfBirth, EmailAddress, CustomerType } = customer
    return {
      ...state,
      isEditing: true,
      editCustomerId: _id,
      CustomerId,
      FirstName,
      LastName,
      ContactNumber,
      Address,
      DateOfBirth,
      EmailAddress,
      CustomerType
    }
  }
  if (action.type === DELETE_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === DELETE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Customer Updated!',

    }

  }

  if (action.type === EDIT_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
//Payment management
if(action.type === CREATE_PAYMENT_BEGIN){
    return {...state,isLoading:true}
}

        if(action.type === CREATE_PAYMENT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Payment Created!',
    };
    }

        if(action.type === CREATE_PAYMENT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

    if(action.type === GET_PAYMENTS_BEGIN){
        return {...state, isLoading: true, showAlert: false}
    }

    if(action.type === GET_PAYMENTS_SUCCESS){
    return{
       ...state,
        isLoading: false,
       payments: action.payload.payments,
        totalPayments: action.payload.totalPayments,
        numOfPages: action.payload.numOfPages,
    }
    }

    if(action.type === SET_EDIT_PAYMENT){
        const payment = state.payments.find((payment) => payment._id === action.payload.id);
        const{_id,PaymentId,CustomerName,PaymentMethod,MobileNumber} = payment
        return{
           ...state,
            isEditing:true,
            editPaymentId: _id,
            PaymentId,
            CustomerName,
            PaymentMethod,
            MobileNumber,
        }
    }
    if(action.type === DELETE_PAYMENT_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
  if (action.type === DELETE_PAYMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

        if(action.type === EDIT_PAYMENT_BEGIN){
        return{
            ...state,
            isLoading: true,
    }
    }
            if(action.type === EDIT_PAYMENT_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'payment Updated!',

    }

    }

        if(action.type === EDIT_PAYMENT_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }
//Supplier Management
if(action.type === CREATE_SUPPLIER_BEGIN){
   return {...state,isLoading:true}
}

if(action.type === CREATE_SUPPLIER_SUCCESS){
 return{
 ...state,
 isLoading: false,
 showAlert:true,
 alertType:'success',
 alertText: 'New Supplier Created!',
 };
 }

if(action.type === CREATE_SUPPLIER_ERROR){
 return{
 ...state,
 isLoading: false,
 showAlert:true,
 alertType:'danger',
 alertText: action.payload.msg,
 }
 }

 if(action.type === GET_SUPPLIERS_BEGIN){
 return {...state, isLoading: true, showAlert: false}
 }

 if(action.type === GET_SUPPLIERS_SUCCESS){
  return{
 ...state,
 isLoading: false,
 suppliers: action.payload.suppliers,
 totalSuppliers: action.payload.totalSuppliers,
 numOfPages: action.payload.numOfPages,
 }
 }

 if(action.type === SET_EDIT_SUPPLIER){
  const supplier = state.suppliers.find((supplier) => supplier._id === action.payload.id);
  const{_id,SupplierId,supplierName,supplierEmail,supplierContactNo,supplierAddress,SupplierType} = supplier
 return{
 ...state,
  isEditing:true,
  editSupplierId: _id,
  SupplierId,   
        supplierName,
        supplierEmail,
        supplierContactNo,
        SupplierType,
        supplierAddress,
        
 }
 }
 if(action.type === DELETE_SUPPLIER_BEGIN){
 return{
 ...state,
 isLoading: true,
 }
 }
  if (action.type === DELETE_SUPPLIER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

 if(action.type === EDIT_SUPPLIER_BEGIN){
  return{
  ...state,
  isLoading: true,
 }
 }
 if(action.type === EDIT_SUPPLIER_SUCCESS){
 return{
 ...state,
 isLoading: false,
 showAlert:true,
 alertType:'success',
 alertText: 'Supplier Updated!',

 }

 }

 if(action.type === EDIT_SUPPLIER_ERROR){
 return{
 ...state,
 isLoading: false,
 showAlert:true,
 alertType:'danger',
 alertText: action.payload.msg,
 }
 }



 //Repair Management
  if(action.type === CREATE_REPAIR_BEGIN){
    return {...state,isLoading:true}
  }

  if(action.type === CREATE_REPAIR_SUCCESS){
    return{
    ...state,
    isLoading: false,
    showAlert:true,
    alertType:'success',
    alertText: 'New Repair Created!',
  };
 }

  if(action.type === CREATE_REPAIR_ERROR){
    return{
    ...state,
    isLoading: false,
    showAlert:true,
    alertType:'danger',
    alertText: action.payload.msg,
  }
 }

 if(action.type === GET_REPAIRS_BEGIN){
  return {...state, isLoading: true, showAlert: false}
 }

 if(action.type === GET_REPAIRS_SUCCESS){
  return{
    ...state,
    isLoading: false,
    repairs: action.payload.repairs,
    totalRepairs: action.payload.totalRepairs,
    numOfPages: action.payload.numOfPages,
  }
 }

 if(action.type === SET_EDIT_REPAIR){
  const repair = state.repairs.find((repair) => repair._id === action.payload.id);
  const{_id,customerName,repairDate,returnDate,email,customerNumber,WarrantyId,repairStatus,repairType,WarrantyStatus, IssueDescription} = repair
  return{
    ...state,
    isEditing:true,
    editCustomerName: _id,
    //RepairId,
    customerName,
    repairDate,
    returnDate,
    WarrantyStatus, 
    email,
    customerNumber,
    WarrantyId,
    IssueDescription,
    repairStatus,
    repairType
  }
 }

 if(action.type === DELETE_REPAIR_BEGIN){
  return{
   ...state,
   isLoading: true,
  }
 }
  if (action.type === DELETE_REPAIR_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if(action.type === EDIT_REPAIR_BEGIN){
      return{
      ...state,
      isLoading: true,
     }
  }
   if(action.type === EDIT_REPAIR_SUCCESS){
    return{
    ...state,
    isLoading: false,
    showAlert:true,
    alertType:'success',
    alertText: 'Repair Updated!',
   }
  }

  if(action.type === EDIT_REPAIR_ERROR){
  return{
   ...state,
   isLoading: false,
   showAlert:true,
   alertType:'danger',
   alertText: action.payload.msg,
 }
 }
 //Delivery
  if(action.type === CREATE_DELIVERY_BEGIN){
    return {...state,isLoading:true}
  }

  if(action.type === CREATE_DELIVERY_SUCCESS){
    return {
      ...state,
      isLoading: false,
      showAlert:true,
      alertType:'success',
      alertText: 'New Delivery Created!',
    };
  }

  if(action.type === CREATE_DELIVERY_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert:true,
      alertType:'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === GET_DELIVERIES_BEGIN){
    return {
      ...state, 
      isLoading: true, 
      showAlert: false
    }
  }

  if(action.type === GET_DELIVERIES_SUCCESS){
    return{
      ...state,
      isLoading: false,
      deliveries: action.payload.deliveries,
      totalDeliveries: action.payload.totalDeliveries,
      numOfPages: action.payload.numOfPages,
    }
  }

  if(action.type === SET_EDIT_DELIVERY){
    const delivery = state.deliveries.find((delivery) => delivery._id === action.payload.id);
    const{
      _id,
      DeliveryId,
      RepairId,
      itemName,
      customerName,
      phoneNo,
      deliveryAddress,
      deliveryPerson,
      receivedDate,
      dispatchDate,
      DeliveryStatus,
      repairCharge,
      deliveryCharge,
      totalAmount,
    } = delivery

    return{
      ...state,
      isEditing:true,
      editDeliveryId: _id,
      DeliveryId,
      RepairId,
      itemName,
      customerName,
      phoneNo,
      deliveryAddress,
      deliveryPerson,
      receivedDate,
      dispatchDate,
      DeliveryStatus,
      repairCharge,
      deliveryCharge,
      totalAmount,
    }
  }

  if(action.type === DELETE_DELIVERY_BEGIN){
    return{
      ...state,
      isLoading: true,
    }
  }

  if (action.type === DELETE_DELIVERY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if(action.type === EDIT_DELIVERY_BEGIN){
    return{
      ...state,
      isLoading: true,
  }
}

  if(action.type === EDIT_DELIVERY_SUCCESS){
    return{
      ...state,
      isLoading: false,
      showAlert:true,
      alertType:'success',
      alertText: 'Delivery details updated!',
    }
  }

  if(action.type === EDIT_DELIVERY_ERROR){
    return{
      ...state,
      isLoading: false,
      showAlert:true,
      alertType:'danger',
      alertText: action.payload.msg,
    }
  }

  //Employee
  if(action.type === CREATE_EMPLOYEE_BEGIN){
    return {...state,isLoading:true}
}

        if(action.type === CREATE_EMPLOYEE_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Employee Created!',
    };
    }

        if(action.type === CREATE_EMPLOYEE_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

    if(action.type === GET_EMPLOYEES_BEGIN){
        return {...state, isLoading: true, showAlert: false}
    }

    if(action.type === GET_EMPLOYEES_SUCCESS){
    return{
       ...state,
        isLoading: false,
        employees: action.payload.employees,
        totalEmployees: action.payload.totalEmployees,
        numOfPages: action.payload.numOfPages,
    }
    }

    if(action.type === SET_EDIT_EMPLOYEE){
        const employee = state.employees.find((employee) => employee._id === action.payload.id);
        const{_id,EmployeeID,EmployeeName,EmployeeNIC,EmployeeAddress,EmployeeContactNumber,EmployeeEmail,EmployeeAge,EmployeeGender, EmployeePosition} = employee
        return{
           ...state,
            isEditing:true,
            editEmployeeID: _id,
            EmployeeID,
            EmployeeName,
            EmployeeNIC,
            EmployeeAddress,
            EmployeeContactNumber,
            EmployeeEmail,
            EmployeeAge,
            EmployeeGender,
            EmployeePosition,
        }
    }
    if(action.type === DELETE_EMPLOYEE_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
  if (action.type === DELETE_EMPLOYEE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

        if(action.type === EDIT_EMPLOYEE_BEGIN){
        return{
            ...state,
            isLoading: true,
    }
    }
            if(action.type === EDIT_EMPLOYEE_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'Employee Updated!',

    }

    }

        if(action.type === EDIT_EMPLOYEE_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

//Warranty
if(action.type === CREATE_WARRANTY_BEGIN){
    return {...state,isLoading:true}
}

        if(action.type === CREATE_WARRANTY_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Item Warranty Created!',
    };
    }

        if(action.type === CREATE_WARRANTY_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

    if(action.type === GET_WARRANTIES_BEGIN){
        return {...state, isLoading: true, showAlert: false}
    }

    if(action.type === GET_WARRANTIES_SUCCESS){
    return{
       ...state,
        isLoading: false,
        warranties: action.payload.warranties,
        totalWarranties: action.payload.totalWarranties,
        numOfPages: action.payload.numOfPages,
    }
    }

    if(action.type === SET_EDIT_WARRANTY){
        const warranty = state.warranties.find((warranty) => warranty._id === action.payload.id);
        const{_id,WarrantyId,ItemName,ItemBrand,WarrantyStartedDate,WarrantyPeriod,WarrantyExpiredDate,WarrantyStatus } = warranty
        return{
           ...state,
            isEditing:true,
            editWarrantyId: _id,
            WarrantyId,
            ItemName,
            ItemBrand,
            WarrantyStartedDate,
            WarrantyPeriod,
            WarrantyExpiredDate,
            WarrantyStatus,
        }
    }
    if(action.type === DELETE_WARRANTY_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
  if (action.type === DELETE_WARRANTY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

        if(action.type === EDIT_WARRANTY_BEGIN){
        return{
            ...state,
            isLoading: true,
    }
    }
            if(action.type === EDIT_WARRANTY_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'success',
            alertText: 'Item Updated!',

    }

    }

        if(action.type === EDIT_WARRANTY_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg,
    }
    }

 //ALL
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      //methana balanna
      searchType: 'all',
      sort: 'latest',
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

    throw new Error(`no such action : ${action.type}`)

}

export default reducer