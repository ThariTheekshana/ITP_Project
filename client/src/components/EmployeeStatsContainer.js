import { useAppContext } from '../context/appContext'
import StatsEmployee from './StatEmployee'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Managers',
      count: stats.manager || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Admins',
      count: stats.admin || 0,
      icon: <BsPcDisplay />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'cashiers',
      count: stats.cashier || 0,
      icon: <BsKeyboard />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((employee, index) => {
        return <StatsEmployee key={index} {...employee} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
