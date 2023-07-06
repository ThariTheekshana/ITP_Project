import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { MdOutlineComputer } from 'react-icons/md'
import { BsKeyboard,BsPcDisplay,BsMotherboardFill,BsFillMouse2Fill } from 'react-icons/bs'
import{GiProcessor,GiComputerFan} from 'react-icons/gi'
import {SiCairographics} from 'react-icons/si'
import {GrMemory} from 'react-icons/gr'
import {MdSdStorage,MdStorage} from 'react-icons/md'
import {FiMonitor} from 'react-icons/fi'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Laptops',
      count: stats.Laptops || 0,
      icon: <MdOutlineComputer />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Desktop Work Stations',
      count: stats.DesktopWorkStations|| 0,
      icon: <BsPcDisplay />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'MotherBoards',
      count: stats.MotherBoards || 0,
      icon: <BsMotherboardFill />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
        {
      title: 'Processors',
      count: stats.Processors || 0,
      icon: <GiProcessor />,
      color: '#a1d660',
      bcg: '#d2fc9f',
    },
    {
      title: 'Graphic Cards',
      count: stats.GraphicCards || 0,
      icon: <SiCairographics />,
      color: '#3ba88a',
      bcg: '#9ffce2',
    },
    {
      title: 'Memory(RAM)',
      count: stats.Memory || 0,
      icon: <GrMemory />,
      color: '#6c2f8f',
      bcg: '#da9ffc',
    },
        {
      title: 'Storage & NAS',
      count: stats.Storage || 0,
      icon: <MdStorage />,
      color: '#d6a715',
      bcg: '#fcefc7',
    },
    {
      title: 'Monitors',
      count: stats.Monitors || 0,
      icon: <FiMonitor />,
      color: '#a0ad09',
      bcg: '#fcfc9f',
    },
    {
      title: 'External Storages',
      count: stats.ExternalStorages || 0,
      icon: <MdSdStorage />,
      color: '#fa1919',
      bcg: '#ffeeee',
    },
        {
      title: 'Mouse',
      count: stats.Mouse || 0,
      icon: <BsFillMouse2Fill />,
      color: '#f20f90',
      bcg: '#fc9fd4',
    },
    {
      title: 'KeyBoard',
      count: stats.KeyBoard || 0,
      icon: <BsKeyboard />,
      color: '#3bfa0a',
      bcg: '#b2fc9f',
    },
    {
      title: 'Casings',
      count: stats.Casings || 0,
      icon: <GiComputerFan />,
      color: '#fc7b08',
      bcg: '#fccb9f',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
