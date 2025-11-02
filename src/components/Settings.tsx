import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface SettingsProps {
  onClose: () => void;
  settings: HorrorSettings;
  onSettingsChange: (settings: HorrorSettings) => void;
}

export interface HorrorSettings {
  weakNerves: boolean;
  soundEnabled: boolean;
  glitchIntensity: number;
  scaryEyes: boolean;
  hiddenMessages: boolean;
  jumpscares: boolean;
}

export default function Settings({ onClose, settings, onSettingsChange }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleWeakNervesToggle = (checked: boolean) => {
    const newSettings: HorrorSettings = {
      ...localSettings,
      weakNerves: checked,
      soundEnabled: !checked,
      glitchIntensity: checked ? 0 : 50,
      scaryEyes: !checked,
      hiddenMessages: !checked,
      jumpscares: !checked,
    };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleSettingChange = (key: keyof HorrorSettings, value: boolean | number) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="bg-card/95 border-2 border-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl horror-title text-primary glitch">
              [НАСТРОЙКИ СИСТЕМЫ]
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/20"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-destructive/10 border-2 border-destructive p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="vhs-text text-xl text-destructive mb-1">
                    ⚠️ ДЛЯ СЛАБОНЕРВНЫХ
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Отключает все страшные эффекты
                  </p>
                </div>
                <Switch
                  checked={localSettings.weakNerves}
                  onCheckedChange={handleWeakNervesToggle}
                  className="data-[state=checked]:bg-destructive"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                <div>
                  <h3 className="vhs-text text-lg text-foreground mb-1">
                    🔊 Звуковые эффекты
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Атмосферный саундтрек и звуки
                  </p>
                </div>
                <Switch
                  checked={localSettings.soundEnabled}
                  onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                  disabled={localSettings.weakNerves}
                />
              </div>

              <div className="p-4 border border-primary/20 rounded-lg">
                <div className="mb-3">
                  <h3 className="vhs-text text-lg text-foreground mb-1">
                    ⚡ Интенсивность глитчей
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Уровень: {localSettings.glitchIntensity}%
                  </p>
                </div>
                <Slider
                  value={[localSettings.glitchIntensity]}
                  onValueChange={(value) => handleSettingChange('glitchIntensity', value[0])}
                  max={100}
                  step={10}
                  disabled={localSettings.weakNerves}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                <div>
                  <h3 className="vhs-text text-lg text-foreground mb-1">
                    👁️ Следящие глаза
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Случайное появление глаз
                  </p>
                </div>
                <Switch
                  checked={localSettings.scaryEyes}
                  onCheckedChange={(checked) => handleSettingChange('scaryEyes', checked)}
                  disabled={localSettings.weakNerves}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                <div>
                  <h3 className="vhs-text text-lg text-foreground mb-1">
                    📝 Скрытые сообщения
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Случайные жуткие фразы
                  </p>
                </div>
                <Switch
                  checked={localSettings.hiddenMessages}
                  onCheckedChange={(checked) => handleSettingChange('hiddenMessages', checked)}
                  disabled={localSettings.weakNerves}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                <div>
                  <h3 className="vhs-text text-lg text-foreground mb-1">
                    💀 Скримеры
                  </h3>
                  <p className="vhs-text text-sm text-muted-foreground">
                    Внезапные пугалки
                  </p>
                </div>
                <Switch
                  checked={localSettings.jumpscares}
                  onCheckedChange={(checked) => handleSettingChange('jumpscares', checked)}
                  disabled={localSettings.weakNerves}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="vhs-text text-sm text-center text-muted-foreground">
                Настройки сохраняются автоматически
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
