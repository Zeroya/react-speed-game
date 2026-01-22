import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { PRESET_LEVELS, GRID_SIZES, SHAPE_OPTIONS, ZOOM_OPTIONS, COLOR_OPTIONS } from '@/constants/settings';
import { ShapeType, ZoomLevel, type CellColors } from '@/types';
import { closeConfig, setGridSize, setShapeType, setTimeLimit, setTotalRounds, setZoomLevel, setCellColor, startGame, setPlayerName } from '@/store/reducers';
import { getShapeCellCount } from '@/utils/shapeGenerator';
import './SettingsPanel.scss';

interface FormData {
  customTime: number;
  rounds: number;
  playerName: string;
}

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { gridSize, shapeType, timeLimit, totalRounds, zoomLevel, cellColors, playerName } = useAppSelector((state) => state.game);

  const [selectedLevel, setSelectedLevel] = useState<string>('medium');
  const [selectedGridSize, setSelectedGridSize] = useState<number>(gridSize);
  const [selectedShape, setSelectedShape] = useState<ShapeType>(shapeType);
  const [selectedZoom, setSelectedZoom] = useState<ZoomLevel>(zoomLevel);

  const maxRounds = Math.min(getShapeCellCount(selectedGridSize, selectedShape), 20);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      customTime: timeLimit,
      rounds: Math.min(totalRounds, maxRounds),
      playerName: playerName,
    },
    mode: 'onChange',
  });

  const customTimeValue = useWatch({ control, name: 'customTime' });
  const roundsValue = useWatch({ control, name: 'rounds' });

  useEffect(() => {
    if (selectedLevel === 'custom' && customTimeValue) {
      const numeric = Number(customTimeValue);
      if (!Number.isNaN(numeric) && numeric >= 100 && numeric <= 10000) {
        dispatch(setTimeLimit(numeric));
      }
    }
  }, [customTimeValue, selectedLevel, dispatch]);

  useEffect(() => {
    if (roundsValue > maxRounds) {
      setValue('rounds', maxRounds);
    }
  }, [maxRounds, roundsValue, setValue]);

  const handleSelectLevel = (levelId: string) => {
    setSelectedLevel(levelId);

    const preset = PRESET_LEVELS.find((level) => level.id === levelId);

    if (preset && levelId !== 'custom') {
      dispatch(setTimeLimit(preset.timeLimit));
      setValue('customTime', preset.timeLimit);
    }
  };

  const handleGridSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    setSelectedGridSize(value);
    dispatch(setGridSize(value));
  };

  const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ShapeType;

    setSelectedShape(value);
    dispatch(setShapeType(value));
  };

  const handleZoomChange = (value: ZoomLevel) => {
    setSelectedZoom(value);
    dispatch(setZoomLevel(value));
  };

  const handleColorChange = (key: keyof CellColors, value: string) => {
    dispatch(setCellColor({ key, value }));
  };

  const onSubmit = (data: FormData) => {
    if (selectedLevel === 'custom') {
      dispatch(setTimeLimit(data.customTime));
    }

    dispatch(setPlayerName(data.playerName));
    dispatch(setTotalRounds(data.rounds));
    dispatch(startGame());
    dispatch(closeConfig());
  };

  return (
    <form className="settings-panel" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="settings-panel__title">Game settings</h2>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Your name</span>
        <input
          type="text"
          className={`settings-panel__input ${errors.playerName ? 'settings-panel__input--error' : ''}`}
          {...register('playerName', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Min 3 characters' },
          })}
        />
        {errors.playerName && (
          <span className="settings-panel__error">{errors.playerName.message}</span>
        )}
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Difficulty</span>
        <div className="settings-panel__options">
          {PRESET_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              className={`settings-panel__option ${
                selectedLevel === level.id ? 'settings-panel__option--active' : ''
              }`}
              onClick={() => handleSelectLevel(level.id)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Time (100ms - 10 sec)</span>
        <input
          type="number"
          className={`settings-panel__input ${errors.customTime ? 'settings-panel__input--error' : ''}`}
          disabled={selectedLevel !== 'custom'}
          {...register('customTime', {
            required: selectedLevel === 'custom' ? 'Time is required' : false,
            min: { value: 100, message: 'Min 100ms' },
            max: { value: 10000, message: 'Max 10 sec' },
            valueAsNumber: true,
          })}
        />
        {errors.customTime && (
          <span className="settings-panel__error">{errors.customTime.message}</span>
        )}
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Rounds (1 - {maxRounds})</span>
        <input
          type="number"
          className={`settings-panel__input ${errors.rounds ? 'settings-panel__input--error' : ''}`}
          {...register('rounds', {
            required: 'Rounds is required',
            min: { value: 1, message: 'Min 1 round' },
            max: { value: maxRounds, message: `Max ${maxRounds} rounds` },
            valueAsNumber: true,
          })}
        />
        {errors.rounds && (
          <span className="settings-panel__error">{errors.rounds.message}</span>
        )}
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Grid size</span>
        <select
          className="settings-panel__select"
          value={selectedGridSize}
          onChange={handleGridSizeChange}
        >
          {GRID_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} × {size}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Shape</span>
        <select
          className="settings-panel__select"
          value={selectedShape}
          onChange={handleShapeChange}
        >
          {SHAPE_OPTIONS.map((shape) => (
            <option key={shape.value} value={shape.value}>
              {shape.label}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Zoom</span>
        <div className="settings-panel__radio-group">
          {ZOOM_OPTIONS.map((option) => (
            <label key={option.value} className="settings-panel__radio">
              <input
                type="radio"
                name="zoom"
                checked={selectedZoom === option.value}
                onChange={() => handleZoomChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="settings-panel__group">
        <span className="settings-panel__label">Cell colors</span>
        <div className="settings-panel__colors">
          {COLOR_OPTIONS.map((option) => (
            <label key={option.key} className="settings-panel__color">
              <input
                type="color"
                value={cellColors[option.key]}
                onChange={(e) => handleColorChange(option.key, e.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="settings-panel__start-button">
        Start game
      </button>
    </form>
  );
};

