import { useAppContext } from '../context/appContext'
import StatsWarranty from './StatWarranty'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'

const WarrantyStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Valid Warranties',
      count: stats.Valid || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Expired Warranties',
      count: stats.Expired || 0,
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
      {defaultStats.map((warranty, index) => {
        return <StatsWarranty key={index} {...warranty} />
      })}
    </Wrapper>
  )
}

export default WarrantyStatsContainer
