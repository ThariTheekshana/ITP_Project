//import React from 'react'
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Payment from './Payment';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const PaymentsContainer = () => {
    const {
    getPayments,
    payments,
    isLoading,
    page,
    totalPayments,
    search,
    searchPaymentMethod,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()


useEffect(() => {
getPayments()
}, [page,search,searchPaymentMethod,sort]);
if(isLoading){
return <Loading center />;
}
if(payments.length === 0){
 return(
 <Wrapper>
 <h2>No Payments to display....</h2>
</Wrapper>
);
}
return <Wrapper>
{showAlert && <Alert />}
<h5>
{totalPayments} payment{payments.length > 1 && 's'} found
 </h5>
<div className='jobs'>
{payments.map((payment)=>{
return<Payment key={payment._id}{...payment} />
 })}
</div>
{numOfPages > 1 && <PageBtnContainer />}
</Wrapper>
}


export default PaymentsContainer
