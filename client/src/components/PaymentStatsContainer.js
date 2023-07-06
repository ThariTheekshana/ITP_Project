import { useAppContext } from '../context/appContext'

import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatsPayment from './StatPayment'

const PaymentStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Cash',
      count: stats.Cash|| 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Card',
      count: stats.Card || 0,
      icon: <BsPcDisplay />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    // {
    //   title: 'accessories',
    //   count: stats.accessories || 0,
    //   icon: <BsKeyboard />,
    //   color: '#d66a6a',
    //   bcg: '#ffeeee',
    // },
  ]

  return (
    <Wrapper>
      {defaultStats.map((payment, index) => {
        return <StatsPayment key={index} {...payment} />
      })}
    </Wrapper>
  )
}

export default PaymentStatsContainer
