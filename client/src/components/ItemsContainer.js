import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Item from './Item';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const ItemsContainer = () => {
    const {
    getItems,
    items,
    isLoading,
    page,
    totalItems,
    search,
    searchItemType,
    searchType,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()
useEffect(() => {
getItems()
}, [page,search,searchItemType,searchType,sort]);

if(isLoading){
  return <Loading center />;
}
if(items.length === 0){
    return(
<Wrapper>
<h2>No Items to display....</h2>
</Wrapper>
);
}
return <Wrapper>
{showAlert && <Alert />}
<h5>
{totalItems} item{items.length > 1 && 's'} found
</h5>
<div className='jobs'>
{items.map((item)=>{
 return<Item key={item._id}{...item} />
 })}
</div>
{numOfPages > 1 && <PageBtnContainer />}
  </Wrapper>
}


export default ItemsContainer
