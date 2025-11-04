import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SettingsProps {
  onClose: () => void;
  settings: HorrorSettings;
  onSettingsChange: (settings: HorrorSettings) => void;
}

export type WeakNervesLevel = 'none' | 'light' | 'medium' | 'strong' | 'maximum';

export interface HorrorSettings {
  weakNervesLevel: WeakNervesLevel;
  soundEnabled: boolean;
  glitchIntensity: number;
  scaryEyes: boolean;
  hiddenMessages: boolean;
  jumpscares: boolean;
  randomEvents: boolean;
  atmosphere: boolean;
}

export default function Settings({ onClose, settings, onSettingsChange }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleWeakNervesChange = (level: WeakNervesLevel) => {
    let newSettings: HorrorSettings = { ...localSettings, weakNervesLevel: level };

    switch (level) {
      case 'none':
        newSettings = {
          ...newSettings,
          soundEnabled: true,
          glitchIntensity: 50,
          scaryEyes: true,
          hiddenMessages: true,
          jumpscares: true,
          randomEvents: true,
          atmosphere: true,
        };
        break;
      case 'light':
        newSettings = {
          ...newSettings,
          soundEnabled: true,
          glitchIntensity: 30,
          scaryEyes: true,
          hiddenMessages: true,
          jumpscares: false,
          randomEvents: false,
          atmosphere: true,
        };
        break;
      case 'medium':
        newSettings = {
          ...newSettings,
          soundEnabled: false,
          glitchIntensity: 20,
          scaryEyes: false,
          hiddenMessages: false,
          jumpscares: false,
          randomEvents: false,
          atmosphere: true,
        };
        break;
      case 'strong':
        newSettings = {
          ...newSettings,
          soundEnabled: false,
          glitchIntensity: 0,
          scaryEyes: false,
          hiddenMessages: false,
          jumpscares: false,
          randomEvents: false,
          atmosphere: false,
        };
        break;
      case 'maximum':
        newSettings = {
          ...newSettings,
          soundEnabled: false,
          glitchIntensity: 0,
          scaryEyes: false,
          hiddenMessages: false,
          jumpscares: false,
          randomEvents: false,
          atmosphere: false,
        };
        break;
    }

    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleSettingChange = (key: keyof HorrorSettings, value: boolean | number) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const isDisabled = localSettings.weakNervesLevel !== 'none';
  const isFlowerMode = localSettings.weakNervesLevel === 'maximum';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className={`bg-card/95 border-2 ${isFlowerMode ? 'border-pink-400' : 'border-primary'} max-w-xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl ${isFlowerMode ? 'font-bold text-pink-500' : 'horror-title text-primary glitch'}`}>
              {isFlowerMode ? '🌸 НАСТРОЙКИ' : '[НАСТРОЙКИ]'}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className={`${isFlowerMode ? 'hover:bg-pink-100' : 'hover:bg-destructive/20'}`}
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className={`${isFlowerMode ? 'bg-pink-50 border border-pink-300' : 'bg-destructive/10 border border-destructive'} p-3 rounded-lg`}>
              <h3 className={`text-base mb-3 ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-destructive'}`}>
                {isFlowerMode ? '🌺 УРОВЕНЬ' : '⚠️ ЗАЩИТА'}
              </h3>
              
              <RadioGroup
                value={localSettings.weakNervesLevel}
                onValueChange={(value) => handleWeakNervesChange(value as WeakNervesLevel)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-2 border border-primary/20 rounded hover:bg-primary/5">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="flex-1 cursor-pointer">
                    <div className="text-sm font-semibold text-foreground">🟢 Выключен</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-2 border border-yellow-500/30 rounded hover:bg-yellow-500/5">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex-1 cursor-pointer">
                    <div className="text-sm font-semibold text-foreground">🟡 Обычный</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-2 border border-orange-500/30 rounded hover:bg-orange-500/5">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="flex-1 cursor-pointer">
                    <div className="text-sm font-semibold text-foreground">🟠 Средний</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-2 border border-red-500/30 rounded hover:bg-red-500/5">
                  <RadioGroupItem value="strong" id="strong" />
                  <Label htmlFor="strong" className="flex-1 cursor-pointer">
                    <div className="text-sm font-semibold text-foreground">🔴 Большой</div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-2 p-2 border ${isFlowerMode ? 'border-pink-400 bg-pink-50' : 'border-pink-500/30'} rounded hover:bg-pink-500/5`}>
                  <RadioGroupItem value="maximum" id="maximum" />
                  <Label htmlFor="maximum" className="flex-1 cursor-pointer">
                    <div className={`text-sm font-bold ${isFlowerMode ? 'text-pink-600' : 'text-foreground'}`}>🌸 Цветочный</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '🎵 Музыка' : '🔊 Звуки'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.soundEnabled}
                  onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                  disabled={isDisabled}
                />
              </div>

              <div className={`p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '✨ Эффекты' : '⚡ Глитч'}
                  </h3>
                  <span className={`text-sm font-bold ${isFlowerMode ? 'text-pink-500' : 'text-primary'}`}>
                    {localSettings.glitchIntensity}%
                  </span>
                </div>
                <Slider
                  value={[localSettings.glitchIntensity]}
                  onValueChange={(value) => handleSettingChange('glitchIntensity', value[0])}
                  max={100}
                  step={10}
                  disabled={isDisabled}
                  className="w-full"
                />
              </div>

              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '🦋 Бабочки' : '👁️ Глаза'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.scaryEyes}
                  onCheckedChange={(checked) => handleSettingChange('scaryEyes', checked)}
                  disabled={isDisabled}
                />
              </div>

              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '💌 Послания' : '📝 Сообщения'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.hiddenMessages}
                  onCheckedChange={(checked) => handleSettingChange('hiddenMessages', checked)}
                  disabled={isDisabled}
                />
              </div>

              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '🎉 Сюрпризы' : '💀 Скримеры'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.jumpscares}
                  onCheckedChange={(checked) => handleSettingChange('jumpscares', checked)}
                  disabled={isDisabled}
                />
              </div>

              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '🦋 Радости' : '🎲 События'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.randomEvents}
                  onCheckedChange={(checked) => handleSettingChange('randomEvents', checked)}
                  disabled={isDisabled}
                />
              </div>

              <div className={`flex items-center justify-between p-2 border ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'} rounded`}>
                <div>
                  <h3 className={`text-sm ${isFlowerMode ? 'text-pink-600 font-semibold' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode ? '🌈 Атмосфера' : '🌫️ Атмосфера'}
                  </h3>
                </div>
                <Switch
                  checked={localSettings.atmosphere}
                  onCheckedChange={(checked) => handleSettingChange('atmosphere', checked)}
                  disabled={isDisabled}
                />
              </div>
            </div>

            <div className={`pt-4 border-t ${isFlowerMode ? 'border-pink-200' : 'border-primary/20'}`}>
              <p className={`text-sm text-center ${isFlowerMode ? 'text-pink-400' : 'vhs-text text-muted-foreground'}`}>
                {isFlowerMode ? '💖 Настройки сохранены с любовью' : 'Настройки сохраняются автоматически'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}