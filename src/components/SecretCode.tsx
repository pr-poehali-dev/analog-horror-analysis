import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import Icon from './ui/icon';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

const CIPHER_TEXT = [
  'ОНИ БЫЛИ ВНУТРИ С САМОГО НАЧАЛА',
  'МАМА НИКОГДА НЕ УХОДИЛА ИЗ ДОМА',
  'СЕДЬМОЙ КОЗЛЕНОК - НЕ ТОТ, КТО ВЕРНУЛСЯ',
  'ДВЕРЬ БЫЛА ОТКРЫТА ИЗНУТРИ',
  'ВЫ СЛЫШИТЕ СТУК? ОНИ УЖЕ ЗДЕСЬ',
];

export default function SecretCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key].slice(-KONAMI_CODE.length);
      setKeys(newKeys);

      if (newKeys.join(',') === KONAMI_CODE.join(',')) {
        setUnlocked(true);
        const randomMessage = CIPHER_TEXT[Math.floor(Math.random() * CIPHER_TEXT.length)];
        setSecretMessage(randomMessage);
        setShowSecret(true);
        
        setTimeout(() => {
          setShowSecret(false);
          setKeys([]);
          setUnlocked(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keys]);

  if (!showSecret) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      <Card className="border-4 border-destructive bg-card p-8 max-w-2xl mx-4 animate-pulse">
        <div className="flex items-start gap-4 mb-6">
          <Icon name="Lock" className="text-destructive" size={48} />
          <div>
            <h2 className="text-3xl horror-title text-destructive mb-2 glitch">
              [СЕКРЕТНЫЙ ФАЙЛ РАЗБЛОКИРОВАН]
            </h2>
            <p className="vhs-text text-xl text-primary">
              УРОВЕНЬ ДОПУСКА: МАКСИМАЛЬНЫЙ
            </p>
          </div>
        </div>
        
        <div className="bg-destructive/20 border-2 border-destructive p-6">
          <p className="vhs-text text-2xl text-foreground crt-effect" data-text={secretMessage}>
            {secretMessage}
          </p>
        </div>

        <div className="mt-4 vhs-text text-lg text-muted-foreground text-center flicker">
          [ДАННОЕ СООБЩЕНИЕ БУДЕТ УНИЧТОЖЕНО ЧЕРЕЗ 5 СЕКУНД]
        </div>
      </Card>
    </div>
  );
}
