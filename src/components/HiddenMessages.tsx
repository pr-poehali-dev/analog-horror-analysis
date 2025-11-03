import { useState, useEffect } from 'react';

const HIDDEN_MESSAGES = [
  'НЕ ВЕРЬТЕ СЕДЬМОМУ',
  'ОНА ВЕРНУЛАСЬ НЕ ОДНА',
  'СЛЫШИТЕ ШАГИ ЗА ДВЕРЬЮ?',
  'ВРЕМЯ ИДЕТ НЕПРАВИЛЬНО',
  'ЭТО НЕ МОЙ ГОЛОС',
  'ЗАКРОЙТЕ ОКНА',
  'ОНИ НАБЛЮДАЮТ СЕЙЧАС',
  'МАМА?',
  'ПОЧЕМУ ТЫ ЗДЕСЬ?',
  'УЖЕ СЛИШКОМ ПОЗДНО',
  'Я ЗНАЮ ГДЕ ТЫ',
  'НЕ ОБОРАЧИВАЙСЯ',
  'ТЫ СЛЫШИШЬ ЭТО?',
  'ОНО ПРИБЛИЖАЕТСЯ',
  'БЕГИ',
  'Я ВСЕГДА ЗДЕСЬ'
];

const FLOWER_MESSAGES = [
  '🌸 Ты прекрасен!',
  '💖 Всё будет хорошо!',
  '🌈 Улыбнись!',
  '✨ Верь в себя!',
  '🌺 Ты особенный!',
  '💐 Отличный день!',
  '🦋 Будь счастлив!',
  '🌻 Ты молодец!',
  '🌷 Мир прекрасен!',
  '💫 Всё получится!',
  '🌼 Люби жизнь!',
  '🎀 Ты уникален!'
];

interface HiddenMessagesProps {
  isFlowerMode?: boolean;
}

export default function HiddenMessages({ isFlowerMode = false }: HiddenMessagesProps) {
  const [messages, setMessages] = useState<Array<{text: string; x: number; y: number; id: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const messageList = isFlowerMode ? FLOWER_MESSAGES : HIDDEN_MESSAGES;
        const newMessage = {
          text: messageList[Math.floor(Math.random() * messageList.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          id: Date.now()
        };
        
        setMessages(prev => [...prev, newMessage]);

        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
        }, 3000);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isFlowerMode]);

  return (
    <>
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`fixed z-50 text-lg font-bold opacity-80 pointer-events-none ${
            isFlowerMode 
              ? 'text-pink-500 animate-bounce' 
              : 'vhs-text text-destructive glitch chromatic-aberration'
          }`}
          style={{
            left: `${msg.x}%`,
            top: `${msg.y}%`,
            animation: 'fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 2.5s',
            textShadow: isFlowerMode 
              ? '0 0 10px rgba(255, 192, 203, 0.8)' 
              : '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.5)'
          }}
        >
          {msg.text}
        </div>
      ))}
    </>
  );
}
