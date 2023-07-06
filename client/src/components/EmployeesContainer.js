import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Employee from './Employee';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const EmployeesContainer = () => {
    const {
    getEmployees,
    employees,
    isLoading,
    page,
    totalEmployees,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
} = useAppContext()


useEffect(() => {
getEmployees()
}, [page,search,searchStatus,searchType,sort]);
if(isLoading){
return <Loading center />;
}
if(employees.length === 0){
return(
<Wrapper>
<h2>No Employees to display....</h2>
</Wrapper>
);
}
return <Wrapper>
{showAlert && <Alert />}
<h5>
{totalEmployees} employee{employees.length > 1 && 's'} found
</h5>
<div className='jobs'>
 {employees.map((employee)=>{
return<Employee key={employee._id}{...employee} />
})}
</div>
{numOfPages > 1 && <PageBtnContainer />}
  </Wrapper>
}
export default EmployeesContainer
