import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Supplier from "./Supplier";
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const SuppliersContainer = () => {
   const {
    getSuppliers,
    suppliers,
    isLoading,
    page,
    totalSuppliers,
    search,
    searchSupplierType,
    searchType,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()


useEffect(() => {
        getSuppliers()
}, [page,search,searchSupplierType,searchType,sort]);

if(isLoading){
      return <Loading center />;
}

if(suppliers.length === 0){
    return(
     <Wrapper>
         <h2>No Suppliers to display....</h2>
    </Wrapper>
 );
}

 return <Wrapper>
    {showAlert && <Alert />}
     <h5>
    {totalSuppliers} supplier{suppliers.length > 1 && 's'} found
     </h5>
     <div className='jobs'>
     {suppliers.map((supplier)=>{
    
     return<Supplier key={supplier._id}{...supplier} />
    })}
     </div>
{numOfPages > 1 && <PageBtnContainer />}
 </Wrapper>
}


export default SuppliersContainer
