import { useAppSelector } from './hooks'
import { LeftPanel, RightPanel, GameController } from './components'
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
