 import React, { useReducer, useContext, useEffect } from 'react';

import reducer from './reducer';
import axios from 'axios';
import {
  //User
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  //Item
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
  //Customer
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
  //Payment
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
  //Supplier
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
  
  //Delivery
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
  //////////////
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,

  ////////////
  SET_REPAIR_ITEM
} from './actions';

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  showSidebar: false,
  isEditing: false,
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    //Item
    //ItemId: '',
    editItemId:'',
    ItemName: '',
    ItemBrand: '',
    ItemPurchasePrice: '',
    ItemSellingPrice: '',
    ItemQuantity: '',
    ItemBenchQuantity: '',
    ItemTypeOptions: ['Laptops', 'DesktopWorkStations', 'MotherBoards','Processors','GraphicCards','Memory','Storage','Monitors','ExternalStorages','Mouse','KeyBoard','Casings'],
    ItemType: 'Laptops',
    itemSupplierOptions: ['Malith', 'Sasindu', 'Chiran', 'Tharindu'],
    itemSupplier: 'Malith',
    items:[],
    totalItems:0,
    numOfPages: 1,
    page: 1,
    search: '',
    searchWarrantyStatus: 'all',
    searchType: 'all',


    //Customer

  CustomerId: '',
  editCustomerId: '',
  FirstName: '',
  LastName: '',
  ContactNumber: '',
  Address: '',
  DateOfBirth: '',
  EmailAddress: '',
  CustomerTypeOptions: ['normalCustomer', 'loyaltyCustomer'],
  CustomerType: 'normalCustomer',
  customers: [],
  totalCustomers: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchCustomerType: 'all',

  //Payment
    PaymentId:'',
  // ItemId: '',
  editPaymentId:'',
  // ItemName: '',
  // ItemBrand: '',
  CustomerName: '',
  // Quantity:'',
  MobileNumber: '',
  // UnitPrice: '',
  PaymentMethodOptions: ['Cash', 'Card'],
  PaymentMethod: 'Cash',
  payments:[],
  totalPayments:0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchPaymentMethod: 'all',

  //Supplier
  editSupplierId:'',
  SupplierId: '',
  supplierName :'',
  supplierEmail :'',
  supplierContactNo :'',
  supplierAddress :'',
  SupplierTypeOptions: ['Laptops', 'DesktopWorkStations', 'MotherBoards','Processors','GraphicCards','Memory','Storage','Monitors','ExternalStorages','Mouse','KeyBoard','Casings'],
  SupplierType: 'Laptops',
  suppliers:[],
  totalSuppliers:0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchStatus: 'all',

  //repair
     // RepairId: '',
    //editRepairId:'',
    editCustomerName:'',
    customerName: '',
    repairDate: '',
    returnDate: '',
    WarrantyStatus:'',
    IssueDescription:'',
    email: '',
    customerNumber: '',
    ItemId: '',
    repairStatusOptions: ['completed', 'processing', 'toCompleted'],
    repairStatus: 'toCompleted',
    repairTypeOptions: ['software', 'hardware'],
    repairType: 'hardware',
    repairs:[],
    totalRepairs:0,
    numOfPages: 1,
    page: 1,
    stats: {},
    search: '',
    searchStatus: 'all',
    searchType: 'all',

    //Delivery
  DeliveryId: '',
  editDeliveryId:'',
  RepairId: '',
  itemName: '',
  customerName: '',
  phoneNo: '',
  deliveryAddress: '',
  deliveryPerson: '',
  receivedDate: '',
  dispatchDate: '',
  DeliveryStatus:'Pending',
  DeliveryStatusOptions: ['Pending', 'Pre-transit', 'Out for delivery', 'Delivered'],
  repairCharge: '',
  deliveryCharge: '',
  totalAmount: '',
  deliveries: [],
  totalDelivery: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchWarrantyStatus: 'all',

  //Employee
  EmployeeID: '',
  EmployeeName:'',
  EmployeeNIC: '',
  EmployeeAddress: '',
  EmployeeContactNumber: '',
  EmployeeEmail: '',
  EmployeeAge: '',
  EmployeePosition: '',
  employeeGenderOptions: ['male', 'female'],
  status: 'manager',
    employeePositionOptions: ['manager', 'admin', 'cashier','technician','delivery person'],
    genderOptions: 'Male',
  employees:[],
  totalemployees:0,
  numOfPages: 1,
  page: 1,
  stats: {},
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  
  //warranty
  WarrantyId: '',
    editWarrantyId:'',
    ItemName: '',
    ItemBrand: '',
    WarrantyStartedDate: '',
    WarrantyPeriod: '',
    WarrantyExpiredDate: '',
  WarrantyStatusOptions: ['Valid', 'Expired'],
  WarrantyStatus: 'Valid',
  totalWarranties:0,
  warranties:[],
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchWarrantyStatus: 'all',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };



  //ITEM MANAGEMENT
  const createItem = async () => {
    dispatch({ type: CREATE_ITEM_BEGIN });
    try {

      const {ItemName,ItemBrand,ItemPurchasePrice,ItemSellingPrice,ItemQuantity,ItemBenchQuantity,ItemType,itemSupplier} = state
      await authFetch.post('/items', {

            //ItemId,
            ItemName,
            ItemBrand,
            ItemPurchasePrice,
            ItemSellingPrice,
            ItemQuantity,
            ItemBenchQuantity,
            ItemType,
            itemSupplier,
      });
      //dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CREATE_ITEM_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        //type: CREATE_JOB_ERROR,
        type: CREATE_ITEM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getItems = async () => {
    const { page, search, searchItemType, searchType, sort } = state;


    let url = `/items?page=${page}&ItemType=${searchItemType}&itemSupplier=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ITEMS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { items, totalItems, numOfPages } = data;
      dispatch({
        type: GET_ITEMS_SUCCESS,
          payload: {
          items,
          totalItems,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditItem = (id) => {
    dispatch({ type: SET_EDIT_ITEM, payload: { id } });
  };

  const setRepairItem = (id)=>{
    dispatch({type:SET_REPAIR_ITEM,payload:{id}});
  }
  const editItem = async () => {
    dispatch({ type: EDIT_ITEM_BEGIN });

    try {

    const { ItemName,ItemBrand,ItemPurchasePrice,ItemSellingPrice,ItemQuantity,ItemBenchQuantity, ItemType,itemSupplier } = state;
      await authFetch.patch(`/items/${state.editItemId}`, {

       //ItemId,
        ItemName,
        ItemBrand,
        ItemPurchasePrice,
        ItemSellingPrice,
        ItemQuantity,
        ItemBenchQuantity,
        ItemType,
        itemSupplier,
      });
      dispatch({ type: EDIT_ITEM_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_ITEM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteItem = async (itemId) => {
    dispatch({ type: DELETE_ITEM_BEGIN });
    try {
      await authFetch.delete(`/items/${itemId}`);
      getItems();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_ITEM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/items/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };






  //CUSTOMER MANAGEMENT
  const createCustomer = async () => {
    dispatch({ type: CREATE_CUSTOMER_BEGIN });
    try {
      const {  CustomerId,FirstName, LastName, ContactNumber, Address, DateOfBirth, EmailAddress, CustomerType } = state
      await authFetch.post('/customers', {

        CustomerId,
        FirstName,
        LastName,
        ContactNumber,
        Address,
        DateOfBirth,
        EmailAddress,
        CustomerType,

      });
      dispatch({ type: CREATE_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getCustomers = async () => {
    const { page, search, searchCustomerType, sort } = state;

    
    let url = `/customers?page=${page}&CustomerType=${searchCustomerType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_CUSTOMERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      //const { jobs, totalJobs, numOfPages } = data;
      const { customers, totalCustomers, numOfPages } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
          totalCustomers,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditCustomer = (id) => {
    dispatch({ type: SET_EDIT_CUSTOMER, payload: { id } });
  };
  const editCustomer = async () => {
    dispatch({ type: EDIT_CUSTOMER_BEGIN });

    try {
      const {  CustomerId,FirstName, LastName, ContactNumber, Address, DateOfBirth, EmailAddress, CustomerType } = state;
      await authFetch.patch(`/customers/${state.editCustomerId}`, {

        CustomerId,
        FirstName,
        LastName,
        ContactNumber,
        Address,
        DateOfBirth,
        EmailAddress,
        CustomerType,
      });
      dispatch({ type: EDIT_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteCustomer = async (customerId) => {
    dispatch({ type: DELETE_CUSTOMER_BEGIN });
    try {
      await authFetch.delete(`/customers/${customerId}`);
      getCustomers();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showCustomerStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/customers/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };


  //Payment Management
  const createPayment = async () => {
    dispatch({ type: CREATE_PAYMENT_BEGIN });
    try {
      
      const {PaymentId,CustomerName,PaymentMethod,MobileNumber} = state
      await authFetch.post('/payments', {

            PaymentId,
            CustomerName,
            PaymentMethod,
            MobileNumber,
      });
      
      dispatch({ type: CREATE_PAYMENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        
        type: CREATE_PAYMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getPayments = async () => {
    const { page, search, searchPaymentMethod,  sort } = state;


    let url = `/payments?page=${page}&PaymentMethod=${searchPaymentMethod}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_PAYMENTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      
      const { payments, totalPayments, numOfPages } = data;
      dispatch({
        type: GET_PAYMENTS_SUCCESS,
          payload: {
          payments,
          totalPayments,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditPayment = (id) => {
    dispatch({ type: SET_EDIT_PAYMENT, payload: { id } });
  };
  const editPayment = async () => {
    dispatch({ type: EDIT_PAYMENT_BEGIN });

    try {
    
    const { PaymentId,CustomerName,PaymentMethod,MobileNumber } = state;
      await authFetch.patch(`/payments/${state.editPaymentId}`, {

            PaymentId,
            CustomerName,
            PaymentMethod,
            MobileNumber,
      });
      dispatch({ type: EDIT_PAYMENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PAYMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deletePayment = async (paymentId) => {
    dispatch({ type: DELETE_PAYMENT_BEGIN });
    try {
      await authFetch.delete(`/payments/${paymentId}`);
      getPayments();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_PAYMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showPaymentStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/payments/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

//Supplier
const createSupplier = async () => {
    dispatch({ type: CREATE_SUPPLIER_BEGIN });
    try {
      
      const {SupplierId,supplierName,supplierEmail,supplierContactNo,supplierAddress,SupplierType} = state
      await authFetch.post('/suppliers', {
        
        SupplierId,   
        supplierName,
        supplierEmail,
        supplierContactNo,
        supplierAddress,
        SupplierType,
        
      });
      
      dispatch({ type: CREATE_SUPPLIER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        
        type: CREATE_SUPPLIER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getSuppliers = async () => {
    const { page, search, searchStatus, sort } = state;

   
    let url = `/suppliers?page=${page}&SupplierType=${searchStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_SUPPLIERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      
      const { suppliers, totalSuppliers, numOfPages } = data;
      dispatch({
        type: GET_SUPPLIERS_SUCCESS,
          payload: {
          suppliers,
          totalSuppliers,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditSupplier = (id) => {
    dispatch({ type: SET_EDIT_SUPPLIER, payload: { id } });
  };
  const editSupplier = async () => {
    dispatch({ type: EDIT_SUPPLIER_BEGIN });

    try {
    
    const { SupplierId,supplierName,supplierEmail,supplierContactNo,supplierAddress,SupplierType } = state;
      await authFetch.patch(`/suppliers/${state.editSupplierId}`, {
       
        SupplierId,   
        supplierName,
        supplierEmail,
        supplierContactNo,
        
        supplierAddress,
        SupplierType,
      });
      dispatch({ type: EDIT_SUPPLIER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_SUPPLIER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteSupplier = async (supplierId) => {
    dispatch({ type: DELETE_SUPPLIER_BEGIN });
    try {
      await authFetch.delete(`/suppliers/${supplierId}`);
      getSuppliers();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_SUPPLIER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showSupplierStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/suppliers/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  //Repair management
    //Create Repair
  const createRepair = async () => {
    dispatch({ type: CREATE_REPAIR_BEGIN });
    try {
      //const { position, company, jobLocation, jobType, status } = state;
      const { customerName, repairDate, returnDate, email, customerNumber, WarrantyId ,repairStatus, repairType,IssueDescription,WarrantyStatus} = state
      await authFetch.post('/repairs', {
        //position,
        //company,
        //jobLocation,
        //jobType,
            
            customerName,
            repairDate,
            returnDate,
            email,
            customerNumber,
            WarrantyId,
            repairStatus,
            repairType,
            IssueDescription,
            WarrantyStatus, 
            WarrantyId
      });
      //dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CREATE_REPAIR_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        //type: CREATE_JOB_ERROR,
        type: CREATE_REPAIR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

//Get Repairs
  const getRepairs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

   // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    let url = `/repairs?page=${page}&repairStatus=${searchStatus}&repairType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_REPAIRS_BEGIN });
    try {
      const { data } = await authFetch(url);
      //const { jobs, totalJobs, numOfPages } = data;
      const { repairs, totalRepairs, numOfPages } = data;
      dispatch({
        type: GET_REPAIRS_SUCCESS,
          payload: {
          repairs,
          totalRepairs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditRepair = (id) => {
    dispatch({ type: SET_EDIT_REPAIR, payload: { id } });
  };
  const editRepair = async () => {
    dispatch({ type: EDIT_REPAIR_BEGIN });

    try {
   
    const {  customerName, repairDate, returnDate, email, customerNumber ,repairStatus, repairType,IssueDescription,WarrantyId } = state;
      await authFetch.patch(`/repairs/${state.editCustomerName}`, {

        
        customerName,
        repairDate,
        returnDate,
        email,
        customerNumber,
        repairStatus,
        IssueDescription,
        repairType,
        WarrantyId
      });
      dispatch({ type: EDIT_REPAIR_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_REPAIR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  //Delete Repair
  const deleteRepair = async (repairId) => {
    dispatch({ type: DELETE_REPAIR_BEGIN });
    try {
      await authFetch.delete(`/repairs/${repairId}`);
      getRepairs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_REPAIR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showRepairStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/repairs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  //Delivery
   const createDelivery = async () => {
    dispatch({ type: CREATE_DELIVERY_BEGIN });
    try {
      const {DeliveryId, RepairId, itemName, customerName, phoneNo, deliveryAddress, deliveryPerson, receivedDate, dispatchDate, DeliveryStatus, repairCharge, deliveryCharge, totalAmount} = state
      await authFetch.post('/deliveries', {
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
      });

      dispatch({ type: CREATE_DELIVERY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_DELIVERY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }; 

  const getDeliveries = async () => {
    const { page, search, searchStatus, sort } = state;

    let url = `/deliveries?page=${page}&DeliveryStatus=${searchStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_DELIVERIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { deliveries, totalDeliveries, numOfPages } = data;
      dispatch({
        type: GET_DELIVERIES_SUCCESS,
          payload: {
          deliveries,
          totalDeliveries,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditDelivery = (id) => {
    dispatch({ type: SET_EDIT_DELIVERY, payload: { id } });
  };

  const editDelivery= async () => {
    dispatch({ type: EDIT_DELIVERY_BEGIN });

    try {
    const { DeliveryId, RepairId, itemName, customerName, phoneNo, deliveryAddress, deliveryPerson, receivedDate, dispatchDate, DeliveryStatus, repairCharge, deliveryCharge, totalAmount } = state;
      await authFetch.patch(`/deliveries/${state.editDeliveryId}`, {
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
      });
      dispatch({ type: EDIT_DELIVERY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_DELIVERY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteDelivery = async (deliveryId) => {
    dispatch({ type: DELETE_DELIVERY_BEGIN });
    try {
      await authFetch.delete(`/deliveries/${deliveryId}`);
      getDeliveries();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_DELIVERY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showDeliveryStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/deliveries/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  //Employee Management
   const createEmployee = async () => {
    dispatch({ type: CREATE_EMPLOYEE_BEGIN });
    try {
      //const { position, company, jobLocation, jobType, status } = state;
      const {EmployeeID,EmployeeName,EmployeeNIC,EmployeeAddress,EmployeeContactNumber,EmployeeEmail,EmployeeAge,EmployeeGender, EmployeePosition} = state
      await authFetch.post('/employees', {
        //position,
        //company,
        //jobLocation,
        //jobType,
            EmployeeID,
            EmployeeName,
            EmployeeNIC,
            EmployeeAddress,
            EmployeeContactNumber,
            EmployeeEmail,
            EmployeeAge,
            EmployeeGender,
            EmployeePosition,
      });
      //dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CREATE_EMPLOYEE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        //type: CREATE_JOB_ERROR,
        type: CREATE_EMPLOYEE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getEmployees = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

   // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    let url = `/employees?page=${page}&status=${searchStatus}&employeePosition=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_EMPLOYEES_BEGIN });
    try {
      const { data } = await authFetch(url);
      //const { jobs, totalJobs, numOfPages } = data;
      const { employees, totalEmployees, numOfPages } = data;
      dispatch({
        type: GET_EMPLOYEES_SUCCESS,
          payload: {
          employees,
          totalEmployees,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditEmployee = (id) => {
    dispatch({ type: SET_EDIT_EMPLOYEE, payload: { id } });
  };
  const editEmployee = async () => {
    dispatch({ type: EDIT_EMPLOYEE_BEGIN });

    try {
    //   const { position, company, jobLocation, jobType, status } = state;
    const { EmployeeID,EmployeeName,EmployeeNIC,EmployeeAddress,EmployeeContactNumber,EmployeeEmail,EmployeeAge,EmployeeGender, EmployeePosition } = state;
      await authFetch.patch(`/employees/${state.editEmployeeID}`, {
        // company,
        // position,
        // jobLocation,
        // jobType,
        EmployeeID,
        EmployeeName,
        EmployeeNIC,
        EmployeeAddress,
        EmployeeContactNumber,
        EmployeeEmail,
        EmployeeAge,
        EmployeeGender,
        EmployeePosition,
      });
      dispatch({ type: EDIT_EMPLOYEE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_EMPLOYEE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteEmployee = async (EmployeeID) => {
    dispatch({ type: DELETE_EMPLOYEE_BEGIN });
    try {
      await authFetch.delete(`/employees/${EmployeeID}`);
      getEmployees();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_EMPLOYEE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showEmployeeStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/employees/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  //warranty
  const createWarranty = async () => {
    dispatch({ type: CREATE_WARRANTY_BEGIN });
    try {

      const {WarrantyId,ItemName,ItemBrand,WarrantyStartedDate,WarrantyPeriod,WarrantyExpiredDate,WarrantyStatus} = state
      await authFetch.post('/warranties', {

            WarrantyId,
            ItemName,
            ItemBrand,
            WarrantyStartedDate,
            WarrantyPeriod,
            WarrantyExpiredDate,
            WarrantyStatus,
      });
      
      dispatch({ type: CREATE_WARRANTY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        
        type: CREATE_WARRANTY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getWarranties = async () => {
    const { page, search, searchWarrantyStatus, sort } = state;


    let url = `/warranties?page=${page}&WarrantyStatus=${searchWarrantyStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_WARRANTIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      
      const { warranties, totalWarranties, numOfPages } = data;
      dispatch({
        type: GET_WARRANTIES_SUCCESS,
          payload: {
          warranties,
          totalWarranties,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditWarranty = (id) => {
    dispatch({ type: SET_EDIT_WARRANTY, payload: { id } });
  };
  const editWarranty = async () => {
    dispatch({ type: EDIT_WARRANTY_BEGIN });

    try {
    const {WarrantyId,ItemName,ItemBrand,WarrantyStartedDate,WarrantyPeriod,WarrantyExpiredDate,WarrantyStatus } = state;
      await authFetch.patch(`/warranties/${state.editWarrantyId}`, {

            WarrantyId,
            ItemName,
            ItemBrand,
            WarrantyStartedDate,
            WarrantyPeriod,
            WarrantyExpiredDate,
            WarrantyStatus,
      });
      dispatch({ type: EDIT_WARRANTY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_WARRANTY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteWarranty = async (warrantyId) => {
    dispatch({ type: DELETE_WARRANTY_BEGIN });
    try {
      await authFetch.delete(`/warranties/${warrantyId}`);
      getWarranties();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_WARRANTY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const showWarrantyStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/warranties/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  //ALLLLLLLLLL
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        //All
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        clearFilters,
        changePage,
        //Item
        createItem,
        getItems,
        setEditItem,
        deleteItem,
        editItem,
        showStats,
        //Customer
        createCustomer,
        getCustomers,
        setEditCustomer,
        deleteCustomer,
        editCustomer,
        showCustomerStats,
        //Payment
        createPayment,
        getPayments,
        setEditPayment,
        deletePayment,
        editPayment,
        showPaymentStats,
        //Supplier
        createSupplier,
        getSuppliers,
        setEditSupplier,
        deleteSupplier,
        editSupplier,
        showSupplierStats,
        
        //repair
        createRepair,
        getRepairs,
        setEditRepair,
        deleteRepair,
        editRepair,
        showRepairStats,

        //delivery
        createDelivery,
        getDeliveries,
        setEditDelivery,
        deleteDelivery,
        editDelivery,
        showDeliveryStats,
        
        //Employee
        createEmployee,
        getEmployees,
        setEditEmployee,
        deleteEmployee,
        editEmployee,
        showEmployeeStats,

        //warranty
        createWarranty,
        getWarranties,
        setEditWarranty,
        deleteWarranty,
        editWarranty,
        showWarrantyStats,


        ////////////
        setRepairItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };













