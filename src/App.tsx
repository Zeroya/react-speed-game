import { useAppSelector } from './hooks'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import { GameController } from './components/GameController'
import './App.scss'

function App() {
  const { isPlaying } = useAppSelector((state) => state.game);

  return (
    <div className={`app ${isPlaying ? 'app--playing' : ''}`}>
      <LeftPanel />
      <RightPanel />
      <GameController />
    </div>
  )
}

export default App
