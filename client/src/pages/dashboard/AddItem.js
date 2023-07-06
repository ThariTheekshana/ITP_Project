import {FormRow,FormRowSelect,Alert} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddItem = () => {
const {
 isLoading,
 isEditing,
 showAlert,
 displayAlert,
 //ItemId,
 ItemName,
 ItemBrand,
 ItemPurchasePrice,
 ItemSellingPrice,
 ItemQuantity,
 ItemBenchQuantity,
 ItemType,
 ItemTypeOptions,
 itemSupplier,
 itemSupplierOptions,
 handleChange,
 clearValues,
 createItem,
 editItem,
} =useAppContext()


 const handleSubmit = (e) => {
 e.preventDefault()

 if( !ItemName ||!ItemBrand || !ItemPurchasePrice || !ItemPurchasePrice || !ItemBenchQuantity ||!ItemSellingPrice ||!ItemQuantity){
 displayAlert()
 return
 }
 if(isEditing){
 editItem()
 return
 }

 createItem()
 }

const handleItemInput = (e) =>{
  const name = e.target.name
const value =e.target.value
handleChange({name,value})
}

return (  
    <Wrapper>
<form className='form'>
<h3>{isEditing ? 'edit item' : 'add item'}</h3>
{showAlert && <Alert/>}
<div className='form-center'>


{/* ItemId */}
{/* <FormRow
type="number"
labelText="Item Id"
placeholder="XXXX"
name="ItemId"
value={ItemId}
handleChange={handleItemInput}
/> */}

{/* ItemName */}
<FormRow
type="text"
labelText="Item Name"
placeholder="Laptop"
name="ItemName"
value={ItemName}
handleChange={handleItemInput}
/>

 {/* ItemBrandName */}
 <FormRow
 type="text"
 labelText="Item Brand"
 placeholder="Asus"
 name="ItemBrand"
 value={ItemBrand}
 handleChange={handleItemInput}
 />

 {/* ItemPurchasePrice*/}
 <FormRow
 type="number"
 labelText="Item Purchase Price"
 placeholder="XXXX.XX"
 name="ItemPurchasePrice"
 value={ItemPurchasePrice}
 handleChange={handleItemInput}
 />

 {/* ItemSellingPrice */}
 <FormRow
 type="number"
 labelText="Item Selling Price"
 placeholder="XXXX.XX"
 name="ItemSellingPrice"
 value={ItemSellingPrice}
 handleChange={handleItemInput}
 />

 {/* ItemQuantity */}
 <FormRow
 type="number"
 labelText="Item Quantity"
 name="ItemQuantity"
 value={ItemQuantity}
 handleChange={handleItemInput}
 />

 {/* ItemBenchQuantity */}
 <FormRow
 type="number"
 labelText="Item Bench Quantity"
 name="ItemBenchQuantity"  
 value={ItemBenchQuantity}
 handleChange={handleItemInput}
 />

 {/* item status */}
  <FormRowSelect
  name='ItemType'
  labelText="Item Type"
  value={ItemType}
  handleChange={handleItemInput}
  list={ItemTypeOptions}
  />

  {/* Item Supplier */}
  <FormRowSelect
   name='itemSupplier'
  labelText='Item Supplier'
  value={itemSupplier}
  handleChange={handleItemInput}
  list={itemSupplierOptions}
  />

<div className='btn-container'>
 <button
 type='submit'
 className='btn btn-block submit-btn'
 onClick={handleSubmit}
 disabled={isLoading}
 >
Submit
 </button>

<button
className='btn btn-block clear-btn'
onClick={(e)=>{
e.preventDefault()
clearValues()
}}
>
  Clear
</button>
</div>
</div>
</form>
</Wrapper>
)
}
export default AddItem
