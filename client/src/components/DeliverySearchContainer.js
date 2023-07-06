import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';

const DeliverySearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    search,
    searchDeliveryStatus,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    DeliveryStatusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  }; 

  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>

          {/* search DeliveryId */}
          <FormRow
            type='text'
            name='search'
            labelText="Delivery ID"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            name='searchDeliveryStatus'
            labelText='Delivery Status'
            value={searchDeliveryStatus}
            handleChange={handleSearch}
            list={['all', ...DeliveryStatusOptions]}
          />
          
          {/* sort */}
          <FormRowSelect
            name='sort'
            labelText="Sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default DeliverySearchContainer;