import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Warranty from './Warranty';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const WarrantiesContainer = () => {
    const {
    getWarranties,
    warranties,
    isLoading,
    page,
    totalWarranties,
    search,
    searchWarrantyStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()
useEffect(() => {
getWarranties()
}, [page,search,searchWarrantyStatus,searchType,sort]);

if(isLoading){
  return <Loading center />;
}
if(warranties.length === 0){
    return(
<Wrapper>
<h2>No Items to display....</h2>
</Wrapper>
);
}
return <Wrapper>
{showAlert && <Alert />}
<h5>
{totalWarranties} item{warranties.length > 1 && 's'} found
</h5>
<div className='jobs'>
{warranties.map((warranty)=>{
 return<Warranty key={warranty._id}{...warranty} />
 })}
</div>
{numOfPages > 1 && <PageBtnContainer />}
  </Wrapper>
}


export default WarrantiesContainer
