import { useAppContext } from '../context/appContext'
import StatRepair from './StatRepair'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/StatsContainer'

const RepairStatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Completed Repairs',
      count: stats.completed || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Processing Repairs',
      count: stats.processing || 0,
      icon: <BsPcDisplay />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'To be Completed Repairs',
      count: stats.toCompleted || 0,
      icon: <BsKeyboard />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatRepair key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default RepairStatsContainer
