import { IoBarChartSharp } from "react-icons/io5"; //Dashboard
import { BsFillPersonFill } from "react-icons/bs"; //Cus
import { FiUsers } from "react-icons/fi"; //Emp
import { MdPayment } from "react-icons/md"; //Payment
import { FaChartLine } from "react-icons/fa"; //Finance
import { VscPerson } from "react-icons/vsc"; //Supplier
import { GiAutoRepair } from "react-icons/gi"; //repair
import { TbTruckDelivery } from "react-icons/tb"; //Delivery
import { FiCodesandbox } from "react-icons/fi"; //Item
import { ImProfile } from "react-icons/im"; //Profile
const links = [
  { id: 1, text: "DASHBOARD", path: "", icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: "CUSTOMER MANAGEMENT",
    path: "CustomerStats",
    icon: <BsFillPersonFill />,
  },
  {
    id: 3,
    text: "EMPLOYEE MANAGEMENT",
    path: "EmployeeStats",
    icon: <FiUsers />,
  },
  {
    id: 4,
    text: "ITEM MANAGEMENT",
    path: "ItemStats",
    icon: <FiCodesandbox />,
  },
  {
    id: 5,
    text: "REPAIR MANAGEMENT",
    path: "RepairStats",
    icon: <GiAutoRepair />,
  },
  {
    id: 6,
    text: "SUPPLIER MANAGEMENT",
    path: "SupplierStats",
    icon: <VscPerson />,
  },
  {
    id: 7,
    text: "DELIVERY MANAGEMENT",
    path: "DeliveryStats",
    icon: <TbTruckDelivery />,
  },
  {
    id: 8,
    text: "PAYMENT MANAGEMENT",
    path: "PaymentStats",
    icon: <MdPayment />,
  },
  { id: 9, text: "FINANCE MANAGEMENT", path: "", icon: <FaChartLine /> },
  {
    id: 10,
    text: "WARRANTY MANAGEMENT",
    path: "WarrantyStats",
    icon: <ImProfile />,
  },
  { id: 11, text: "PROFILE", path: "profile", icon: <ImProfile /> },
  { id: 12, text: "ORDERS", path: "OrderStatus", icon: <FiCodesandbox /> },

  //{id:12,text:'NEW ORDER',path:'',icon : <ImProfile />},
];
export default links;
