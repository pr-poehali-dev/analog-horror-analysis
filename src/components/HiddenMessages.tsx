import { useState, useEffect } from 'react';

const HIDDEN_MESSAGES = [
  'НЕ ВЕРЬТЕ СЕДЬМОМУ',
  'ОНА ВЕРНУЛАСЬ НЕ ОДНА',
  'СЛЫШИТЕ ШАГИ ЗА ДВЕРЬЮ?',
  'ВРЕМЯ ИДЕТ НЕПРАВИЛЬНО',
  'ЭТО НЕ МОЙ ГОЛОС',
  'ЗАКРОЙТЕ ОКНА',
  'ОНИ НАБЛЮДАЮТ СЕЙЧАС',
  'МАМА?'
];

export default function HiddenMessages() {
  const [messages, setMessages] = useState<Array<{text: string; x: number; y: number; id: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newMessage = {
          text: HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          id: Date.now()
        };
        
        setMessages(prev => [...prev, newMessage]);

        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
        }, 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {messages.map(msg => (
        <div
          key={msg.id}
          className="fixed z-50 vhs-text text-destructive text-sm opacity-70 glitch pointer-events-none"
          style={{
            left: `${msg.x}%`,
            top: `${msg.y}%`,
            animation: 'fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 1.5s'
          }}
        >
          {msg.text}
        </div>
      ))}
    </>
  );
}
