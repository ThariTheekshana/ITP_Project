import { useAppContext } from '../context/appContext'
import StatCustomer from './StatCustomer'
import { MdOutlineLoyalty } from 'react-icons/md'
import { FcManager } from 'react-icons/fc'
import Wrapper from '../assets/wrappers/StatsContainer'

const CustomerStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Loyalty Customers',
      count: stats.loyaltyCustomer || 0,
      icon: <MdOutlineLoyalty />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Normal Customers',
      count: stats.normalCustomer || 0,
      icon: <FcManager />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((customer, index) => {
        return <StatCustomer key={index} {...customer} />
      })}
    </Wrapper>
  )
}

export default CustomerStatsContainer
