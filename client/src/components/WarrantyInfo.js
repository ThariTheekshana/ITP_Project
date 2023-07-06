import Wrapper from '../assets/wrappers/JobInfo'

const WarrantyInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span> 
    </Wrapper>
  )
}

export default WarrantyInfo
