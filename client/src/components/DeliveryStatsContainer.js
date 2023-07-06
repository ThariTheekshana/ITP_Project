import { useAppContext } from '../context/appContext'
import StatDelivery from './StatDelivery'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'

const DeliveryStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Pending',
      count: stats.pending || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Pre-transit',
      count: stats.preTransit || 0,
      icon: <BsPcDisplay />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Out for delivery',
      count: stats.outForDelivery || 0,
      icon: <BsKeyboard />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Delivered',
      count: stats.delivered || 0,
      icon: <BsKeyboard />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((delivery, index) => {
        return <StatDelivery key={index} {...delivery} />
      })}
    </Wrapper>
  )
}

export default DeliveryStatsContainer