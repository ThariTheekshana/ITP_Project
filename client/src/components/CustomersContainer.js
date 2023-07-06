

import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Customer from './Customer';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const CustomersContainer = () => {
    const {
        getCustomers,
        customers,
        isLoading,
        page,
        totalCustomers,
        search,
        searchCustomerType,
        searchType,
        sort,
        numOfPages,
        showAlert,
    } = useAppContext()


    useEffect(() => {
        getCustomers()
    }, [page, search, searchCustomerType, searchType, sort]);

    if (isLoading) {
        return <Loading center />;
    }

    if (customers.length === 0) {
        return (
            <Wrapper>
                <h2>No Customers to display....</h2>
            </Wrapper>
        );
    }

    return <Wrapper>
        {showAlert && <Alert />}
        <h5>
            {totalCustomers} customer{customers.length > 1 && 's'} found
        </h5>
        <div className='jobs'>
            {customers.map((customer) => {
                
                return <Customer key={customer._id}{...customer} />
            })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
}


export default CustomersContainer
