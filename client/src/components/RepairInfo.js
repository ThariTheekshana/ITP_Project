import Wrapper from '../assets/wrappers/JobInfo'

const RepairInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span> 
    </Wrapper>
  )
}

export default RepairInfo
