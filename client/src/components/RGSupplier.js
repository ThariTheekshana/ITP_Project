import Pdf from "react-to-pdf";

import React from "react";
// export default Job

import moment from "moment";
//import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import SupplierInfo from "./SupplierInfo";

import LogoRG from "./LogoRG";

const RGSupplier = ({
  _id,
  SupplierId,
  supplierName,
  supplierEmail,
  supplierContactNo,
  SupplierType,
  supplierAddress,
  
}) => {
  const { setEditSupplier, deleteSupplier } = useAppContext();

  const ref = React.createRef();



  return (
<Wrapper ref={ref}>
<LogoRG />
<table className="customer-table" style={{ border: "10px solid #ddd" }}>
<tbody>
<tr>
<td>Supplier ID</td>
<td>
<SupplierInfo text={SupplierId} />
</td>
</tr>
<tr>
<td>Supplier Name</td>
<td>
<SupplierInfo text={supplierName} />
</td>
</tr>
<tr>
<td>Supplier Email</td>
<td>
<SupplierInfo text={supplierEmail} />
</td>
</tr>
<tr>
<td>Supplier Contact No</td>
<td>
<SupplierInfo text={supplierContactNo} />
</td>
</tr>
<tr>
<td>Supplier Type</td>
<td>
<SupplierInfo text={SupplierType} />
</td>
</tr>
<tr>
<td>Supplier Address</td>
<td>
<SupplierInfo text={supplierAddress} />
</td>
</tr>

</tbody>
</table>
</Wrapper>
  );
};

export default RGSupplier;
