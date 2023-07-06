import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Register,Error,Landing,ProtectedRoute } from "./pages";
import {
   SharedLayout,
   Profile,
   AllItems,
   AddItem,
    ItemStats,
    AllCustomers,
    AddCustomer,
    CustomerStats,
    AllPayments,
    AddPayment,
    PaymentStats,
    AddSupplier,
    AllSuppliers,
    SupplierStats,
    AddRepair,
    AllRepairs,
    RepairStats,
    AddDelivery,
    AllDeliveries,
    DeliveryStats,
    AddEmployee,
    AllEmployees,
    EmployeeStats,
    AddWarranty,
    AllWarranties,
    WarrantyStats,

    CustomerAllReport,
    ItemAllReport,
    EmployeeAllReport,
    RepairAllReport,
    SupplierAllReport,
    WarrantyAllReport,
    PaymentAllReport,
    DeliveryAllReport
  } from './pages/dashboard'

function App() {
  return(
<BrowserRouter>
<Routes>
  <Route 
    path='/' 
    element = {
  <ProtectedRoute>
    <SharedLayout />
    </ProtectedRoute>
  }>


        <Route index element={<ItemStats/>}/>
        <Route index element={<CustomerStats/>}/>
        <Route index element={<PaymentStats/>}/>

        <Route path='CustomerStats' element={<CustomerStats/>}/>
        <Route path='ItemStats' element={<ItemStats/>}/>
        <Route path='PaymentStats' element={<PaymentStats/>}/>
        <Route path='SupplierStats' element={<SupplierStats/>}/>
        <Route path='RepairStats' element={<RepairStats/>}/>
        <Route path='DeliveryStats' element={<DeliveryStats/>}/>
        <Route path='EmployeeStats' element={<EmployeeStats/>}/>
        <Route path='WarrantyStats' element={<WarrantyStats/>}/>

        <Route path='all-items' element={<AllItems/>}/>
        <Route path='add-item' element={<AddItem/>}/>
        <Route path='all-payments' element={<AllPayments/>}/>
        <Route path='add-payment' element={<AddPayment/>}/>
        <Route path='all-customers' element={<AllCustomers/>}/>
        <Route path='add-customer' element={<AddCustomer/>}/>
        <Route path='all-suppliers' element={<AllSuppliers/>}/>
        <Route path='add-supplier' element={<AddSupplier/>}/>
        <Route path='add-repair' element={<AddRepair/>}/>
        <Route path='all-repairs' element={<AllRepairs/>}/>
        <Route path='add-delivery' element={<AddDelivery/>}/>
        <Route path='all-deliveries' element={<AllDeliveries/>}/>
        <Route path='add-employee' element={<AddEmployee/>}/>
        <Route path='all-employees' element={<AllEmployees/>}/>
        <Route path='add-warranty' element={<AddWarranty/>}/>
        <Route path='all-warranties' element={<AllWarranties/>}/>


        <Route
            path="all-CustomerAllDetails"
            element={<CustomerAllReport />}
        />
        <Route
            path="all-ItemAllDetails"
            element={<ItemAllReport />}
        />
        <Route
            path="all-EmployeeAllDetails"
            element={<EmployeeAllReport />}
        />
        <Route
            path="all-RepairAllDetails"
            element={<RepairAllReport />}
        />
        <Route
            path="all-SupplierAllDetails"
            element={<SupplierAllReport />}
        />
        <Route
            path="all-WarrantyAllDetails"
            element={<WarrantyAllReport />}
        />
        <Route
            path="all-DeliveryAllDetails"
            element={<DeliveryAllReport />}
        />
        <Route
            path="all-PaymentAllDetails"
            element={<PaymentAllReport />}
        />

        <Route path='profile' element={<Profile/>}/>
    </Route>

  < Route path='/Register' element={<Register/>}/>
  < Route path='/landing' element={<Landing/>}/>
  < Route path='*' element={<Error/>}/>
</Routes>
</BrowserRouter>
  )
}
export default App;
