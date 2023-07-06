import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import Delivery from './Delivery'

const DeliveriesContainer = () => {
    const {
        getDeliveries,
        deliveries,
        isLoading, 
        page,
        totalDeliveries,
        search,
        searchDeliveryStatus,
        sort,
        numOfPages,
        showAlert,
    } = useAppContext() 


    useEffect(() => {
        getDeliveries()
    }, [page, search, searchDeliveryStatus, sort]);

    if(isLoading){
        return <Loading center />;
    }

    if(deliveries.length === 0){
        return(
            <Wrapper>
                <h2>No deliveries to display....</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>
                {totalDeliveries} Item{deliveries.length > 1 && 's'} Found
            </h5>
            <div className='jobs'>
                {deliveries.map((delivery)=>{
                //methana balanna
                return<Delivery key={delivery._id}{...delivery} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default DeliveriesContainer