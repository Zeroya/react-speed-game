import { useAppDispatch, useAppSelector } from '../../hooks';
import { openConfig } from '../../store/reducers';
import { SettingsPanel } from '../SettingsPanel';
import './LeftPanel.scss';

const LeftPanel = () => {
  const dispatch = useAppDispatch();
  const isConfigOpen = useAppSelector((state) => state.game.isConfigOpen);

  const handleOpenSettings = () => {
    if (!isConfigOpen) {
      dispatch(openConfig());
    }
  };

  return (
    <div className="left-panel">
      <h1 className="left-panel__title">Speed Game</h1>
      <div className="left-panel__content">
        <button className="left-panel__button" onClick={handleOpenSettings}>
          Start
        </button>
      </div>

      <div
        className={`left-panel__settings ${
          isConfigOpen ? 'left-panel__settings--visible' : ''
        }`}
      >
        {isConfigOpen && <SettingsPanel />}
      </div>
    </div>
  );
};

export { LeftPanel };
export default LeftPanel;
