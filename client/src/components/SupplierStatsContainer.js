import { useAppContext } from '../context/appContext'
import StatSupplier from './StatSupplier'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'

const SupplierStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Credit Supplier',
      count: stats.creditSupplier || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Cash Supplier',
      count: stats.cashSupplier || 0,
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
      {defaultStats.map((item, index) => {
        return <StatSupplier key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default SupplierStatsContainer
