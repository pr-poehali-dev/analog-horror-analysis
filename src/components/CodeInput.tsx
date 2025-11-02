import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CodeInputProps {
  onClose: () => void;
  onCodeSubmit: (code: string) => void;
}

const SECRET_CODES = {
  'ВОЛК': 'ФАЙЛ РАЗБЛОКИРОВАН: Волк был не один. Следы указывают на семь сущностей.',
  'МАМА': 'ФАЙЛ РАЗБЛОКИРОВАН: Мать козлят вернулась... но это была не она.',
  '777': 'ФАЙЛ РАЗБЛОКИРОВАН: Седьмой козленок знает правду. Но никто не выжил.',
  'ДВЕРЬ': 'ФАЙЛ РАЗБЛОКИРОВАН: Дверь открылась изнутри. Они впустили его сами.',
  'НОЧЬ': 'ФАЙЛ РАЗБЛОКИРОВАН: Это произошло в 04:44. Время, когда реальность слабеет.',
  'ПОДВАЛ': 'ФАЙЛ РАЗБЛОКИРОВАН: В подвале нашли восьмого козленка. Но их было семеро.',
  'КАМЕРА': 'ФАЙЛ РАЗБЛОКИРОВАН: Последний кадр показывает отражение оператора в окне. За его спиной.',
  'МАТЬ': 'ФАЙЛ РАЗБЛОКИРОВАН: ДНК-тест подтвердил - это их мать. Но она умерла 3 года назад.',
};

export default function CodeInput({ onClose, onCodeSubmit }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    const upperCode = code.toUpperCase().trim();
    
    if (SECRET_CODES[upperCode as keyof typeof SECRET_CODES]) {
      setResult(SECRET_CODES[upperCode as keyof typeof SECRET_CODES]);
      setIsError(false);
      onCodeSubmit(upperCode);
    } else {
      setResult('[ ОШИБКА: КОД НЕ РАСПОЗНАН ]');
      setIsError(true);
    }

    setTimeout(() => {
      setCode('');
      setResult('');
      setIsError(false);
    }, 5000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="bg-card/95 border-2 border-primary max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl horror-title text-primary glitch">
              [ВВОД СЕКРЕТНОГО КОДА]
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

          <div className="space-y-4">
            <div>
              <p className="vhs-text text-sm text-muted-foreground mb-3">
                Введите код для доступа к засекреченным файлам
              </p>
              <div className="flex gap-2">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ВВЕДИТЕ КОД..."
                  className="flex-1 bg-background border-primary vhs-text text-lg uppercase tracking-wider"
                  maxLength={20}
                />
                <Button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/80"
                  disabled={!code.trim()}
                >
                  <Icon name="Lock" size={20} />
                </Button>
              </div>
            </div>

            {result && (
              <div
                className={`p-4 rounded-lg border-2 animate-fade-in ${
                  isError
                    ? 'bg-destructive/10 border-destructive'
                    : 'bg-primary/10 border-primary'
                }`}
              >
                <p className={`vhs-text ${isError ? 'text-destructive' : 'text-primary'} crt-effect`}>
                  {result}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-primary/20">
              <h3 className="vhs-text text-sm text-muted-foreground mb-2">
                ПОДСКАЗКИ:
              </h3>
              <ul className="vhs-text text-xs text-muted-foreground/70 space-y-1">
                <li>• Коды связаны с историей козлят</li>
                <li>• Обратите внимание на детали расследования</li>
                <li>• Всего {Object.keys(SECRET_CODES).length} секретных кодов</li>
                <li>• Ключевые слова: существа, места, время, персонажи</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
