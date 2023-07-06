

//import React from 'react'
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Repair from './Repair';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const RepairsContainer = () => {
  const {
    getRepairs,
    repairs,
    isLoading,
    page,
    totalRepairs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()


useEffect(() => {
    getRepairs()
}, [page,search,searchStatus,searchType,sort]);

if(isLoading){
  return <Loading center />;
}

if(repairs.length === 0){
  return(
    <Wrapper>
      <h2>No Repairs to display....</h2>
    </Wrapper>
  );
}

 return <Wrapper>
    {showAlert && <Alert />}
  <h5>
    {totalRepairs} repair{repairs.length > 1 && 's'} found
  </h5>
  <div className='jobs'>
    {repairs.map((repair)=>{
      return <Repair key={repair._id}{...repair} />
    })}
  </div>
{numOfPages > 1 && <PageBtnContainer />}
 </Wrapper>
}


export default RepairsContainer
