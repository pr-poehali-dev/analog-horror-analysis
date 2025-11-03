import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import SecretCode from '@/components/SecretCode';
import HiddenMessages from '@/components/HiddenMessages';
import ScaryEyes from '@/components/ScaryEyes';
import Settings, { HorrorSettings, WeakNervesLevel } from '@/components/Settings';
import CodeInput from '@/components/CodeInput';
import Jumpscare from '@/components/Jumpscare';
import RandomHorrorEvents from '@/components/RandomHorrorEvents';
import InteractiveHorror from '@/components/InteractiveHorror';
import AtmosphereEnhancer from '@/components/AtmosphereEnhancer';
import FlowerMode from '@/components/FlowerMode';

export default function Index() {
  const [activeSection, setActiveSection] = useState('main');
  const [knockCount, setKnockCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
  const { isPlaying, playGlitchSound, playKnockSound, playAmbientDrone, stopAmbientDrone, playWhisper, playScream, playHeartbeat } = useSound();
  
  const [settings, setSettings] = useState<HorrorSettings>(() => {
    const saved = localStorage.getItem('horrorSettings');
    return saved ? JSON.parse(saved) : {
      weakNervesLevel: 'none' as WeakNervesLevel,
      soundEnabled: true,
      glitchIntensity: 50,
      scaryEyes: true,
      hiddenMessages: true,
      jumpscares: true,
      randomEvents: true,
      atmosphere: true,
    };
  });

  useEffect(() => {
    if (settings.soundEnabled && settings.weakNervesLevel === 'none') {
      playAmbientDrone();
    } else {
      stopAmbientDrone();
    }
    return () => stopAmbientDrone();
  }, [settings.soundEnabled, settings.weakNervesLevel]);

  const handleSettingsChange = (newSettings: HorrorSettings) => {
    setSettings(newSettings);
    localStorage.setItem('horrorSettings', JSON.stringify(newSettings));
  };

  const handleCodeSubmit = (code: string) => {
    if (!unlockedCodes.includes(code)) {
      setUnlockedCodes([...unlockedCodes, code]);
    }
  };

  const handleSectionChange = (section: string) => {
    playGlitchSound();
    setActiveSection(section);
  };

  const handleKnock = () => {
    if (settings.soundEnabled && settings.weakNervesLevel === 'none') {
      playKnockSound();
    }
    const newCount = knockCount + 1;
    setKnockCount(newCount);

    if (newCount === 3) {
      if (settings.jumpscares && settings.weakNervesLevel === 'none') {
        setShowJumpscare(true);
      } else {
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
          setKnockCount(0);
        }, 5000);
      }
    }
  };

  const characters = isFlowerMode ? [
    {
      name: 'Цветочек №1',
      status: 'ЦВЕТЁТ',
      lastSeen: '03:47:12',
      description: 'Прекрасная роза распустилась у северного окна. Аромат невероятный!'
    },
    {
      name: 'Цветочек №2',
      status: 'ЦВЕТЁТ',
      lastSeen: '03:52:34',
      description: 'Тюльпаны радуют глаз своими яркими красками.'
    },
    {
      name: 'Цветочек №3',
      status: 'ЦВЕТЁТ',
      lastSeen: '04:01:18',
      description: 'Лаванда источает успокаивающий аромат.'
    },
    {
      name: 'Цветочек №4',
      status: 'ЦВЕТЁТ',
      lastSeen: '04:15:43',
      description: 'Подсолнух тянется к солнечному свету.'
    },
    {
      name: 'Цветочек №5',
      status: 'ЦВЕТЁТ',
      lastSeen: '04:23:09',
      description: 'Ромашки создают красивый белый ковёр.'
    },
    {
      name: 'Цветочек №6',
      status: 'РАСТЁТ',
      lastSeen: '04:31:55',
      description: 'Бутоны готовятся распуститься в любой момент!'
    },
    {
      name: 'Цветочек №7',
      status: 'СЧАСТЛИВ',
      lastSeen: 'ВСЕГДА',
      description: 'Самый радостный цветок в саду. Дарит улыбки всем вокруг!'
    },
    {
      name: 'БАБОЧКА',
      status: 'ЛЕТАЕТ',
      lastSeen: 'ВЕЗДЕ',
      description: 'Красивая бабочка порхает среди цветов и опыляет их.'
    }
  ] : [
    {
      name: 'Козленок №1',
      status: 'ПРОПАЛ',
      lastSeen: '03:47:12',
      description: 'Последние данные: зафиксирован у северного окна. Аномальные показатели.'
    },
    {
      name: 'Козленок №2',
      status: 'ПРОПАЛ',
      lastSeen: '03:52:34',
      description: 'Обнаружены следы борьбы. Камера зафиксировала искажения.'
    },
    {
      name: 'Козленок №3',
      status: 'ПРОПАЛ',
      lastSeen: '04:01:18',
      description: 'Голосовые записи содержат неопознанные частоты.'
    },
    {
      name: 'Козленок №4',
      status: 'ПРОПАЛ',
      lastSeen: '04:15:43',
      description: 'Последний сигнал из подвала. Температура упала на 15°C.'
    },
    {
      name: 'Козленок №5',
      status: 'ПРОПАЛ',
      lastSeen: '04:23:09',
      description: 'Видеозапись показывает невозможную геометрию помещения.'
    },
    {
      name: 'Козленок №6',
      status: 'НЕ НАЙДЕН',
      lastSeen: '04:31:55',
      description: 'Нет данных. Все камеры отключились одновременно.'
    },
    {
      name: 'Козленок №7',
      status: 'СВИДЕТЕЛЬ',
      lastSeen: 'ВЫЖИЛ',
      description: 'Единственный выживший. Отказывается говорить о произошедшем.'
    },
    {
      name: 'СУЩНОСТЬ',
      status: 'АКТИВНА',
      lastSeen: 'ВЕЗДЕ',
      description: 'Неидентифицированная форма жизни. Маскируется под знакомые голоса.'
    }
  ];

  const timeline = isFlowerMode ? [
    { time: '08:00:00', event: 'Первые лучи солнца осветили сад', type: 'normal' },
    { time: '09:15:47', event: 'Бабочка прилетела к первому цветку', type: 'warning' },
    { time: '10:28:33', event: 'Роса высохла, цветы раскрылись', type: 'warning' },
    { time: '11:41:18', event: 'Все цветы в полном расцвете', type: 'danger' },
    { time: '12:47:12', event: 'Пчёлки начали собирать нектар', type: 'danger' },
    { time: '13:47:15', event: '[РАДУГА ПОЯВИЛАСЬ]', type: 'corrupted' },
    { time: '16:56:23', event: 'Садовник полил все растения', type: 'normal' },
    { time: '18:12:41', event: '[ЗАКАТ В САДУ]', type: 'corrupted' }
  ] : [
    { time: '02:34:12', event: 'Мама-коза покидает дом', type: 'normal' },
    { time: '03:15:47', event: 'Первый стук в дверь. Грубый голос.', type: 'warning' },
    { time: '03:28:33', event: 'Второй стук. Голос изменился.', type: 'warning' },
    { time: '03:41:18', event: 'Третий стук. Голос идентичен маме.', type: 'danger' },
    { time: '03:47:12', event: 'Дверь открыта. Начало инцидента.', type: 'danger' },
    { time: '03:47:15', event: '[ДАННЫЕ УДАЛЕНЫ]', type: 'corrupted' },
    { time: '04:56:23', event: 'Возвращение матери. Обнаружение.', type: 'normal' },
    { time: '05:12:41', event: '[ЗАПИСЬ ПОВРЕЖДЕНА]', type: 'corrupted' }
  ];

  const theories = isFlowerMode ? [
    {
      title: 'Теория фотосинтеза',
      content: 'Цветы используют солнечный свет для создания питательных веществ. Этот удивительный процесс позволяет растениям расти и цвести, радуя нас своей красотой. Каждый лепесток - это маленькое чудо природы!'
    },
    {
      title: 'Сезонные циклы',
      content: 'Цветы распускаются в разное время года, создавая непрерывный праздник красок. Весной - тюльпаны и нарциссы, летом - розы и лилии, осенью - хризантемы. Каждый сезон приносит новые краски в наш сад.'
    },
    {
      title: 'Польза для окружающей среды',
      content: '[ПОДТВЕРЖДЕНО] Цветы очищают воздух, привлекают полезных насекомых и создают уютную атмосферу. Научные исследования показывают, что растения улучшают настроение и снижают стресс. Больше цветов - больше счастья!'
    },
    {
      title: 'Симбиоз с природой',
      content: 'Цветы и насекомые существуют в гармонии друг с другом. Пчёлы собирают нектар, опыляя растения. Бабочки украшают сад своим присутствием. Это прекрасный пример взаимопомощи в природе.'
    }
  ] : [
    {
      title: 'Теория мимикрии',
      content: 'Сущность обладает способностью копировать голоса и манеры поведения. Анализ аудиозаписей показывает постепенное совершенствование имитации с каждой попыткой. Первая попытка - грубый голос. Вторая - частично скорректированный. Третья - полная копия голоса матери, неотличимая от оригинала.'
    },
    {
      title: 'Временные аномалии',
      content: 'Показания часов в доме не совпадают с внешними источниками времени. Разница составляет 47 минут. Это объясняет расхождения в свидетельских показаниях и записях камер наблюдения. Возможно искажение восприятия времени внутри дома.'
    },
    {
      title: 'Коллективная галлюцинация',
      content: '[ОПРОВЕРГНУТА] Физические улики исключают эту версию. Материальные повреждения, следы и биологический материал подтверждают реальность событий. Однако некоторые элементы всё ещё не поддаются объяснению.'
    },
    {
      title: 'Параллельная реальность',
      content: 'Математические модели указывают на возможность наложения двух реальностей в момент инцидента. "Волк" может быть проекцией сущности из параллельного измерения. Это объясняет невозможную геометрию помещений и временные парадоксы.'
    }
  ];

  const artifacts = isFlowerMode ? [
    { id: 'F-001', name: 'Лепесток розы', status: 'Приятный аромат' },
    { id: 'F-002', name: 'Семена', status: 'Готовы к посадке' },
    { id: 'F-003', name: 'Пыльца', status: 'Золотистая и лёгкая' },
    { id: 'F-004', name: 'Нектар', status: 'Сладкий и свежий' },
    { id: 'F-005', name: 'Листочек', status: 'Зелёный и здоровый' },
    { id: 'F-006', name: 'Садовые ножницы', status: 'Для ухода за цветами' }
  ] : [
    { id: 'A-001', name: 'Дверная ручка', status: 'Температура -15°C' },
    { id: 'A-002', name: 'Аудиозапись', status: 'Неизвестные частоты' },
    { id: 'A-003', name: 'Фрагмент шерсти', status: 'ДНК не совпадает' },
    { id: 'A-004', name: 'Царапины', status: 'Идут изнутри' },
    { id: 'A-005', name: 'Часы', status: 'Идут в обратную сторону' },
    { id: 'A-006', name: 'Фотография', status: 'Лишняя фигура на фоне' }
  ];

  const isFlowerMode = settings.weakNervesLevel === 'maximum';
  const isAnyProtection = settings.weakNervesLevel !== 'none';

  return (
    <div className={`min-h-screen ${isFlowerMode ? 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50' : 'bg-background'} ${!isFlowerMode && 'scanlines vhs-noise'}`}>
      {isFlowerMode && <FlowerMode />}
      {settings.weakNervesLevel === 'none' && <SecretCode />}
      {settings.hiddenMessages && <HiddenMessages isFlowerMode={isFlowerMode} />}
      {settings.scaryEyes && <ScaryEyes isFlowerMode={isFlowerMode} />}
      {settings.randomEvents && <RandomHorrorEvents enabled={settings.weakNervesLevel === 'none'} intensity={settings.glitchIntensity} />}
      {settings.atmosphere && <InteractiveHorror enabled={settings.weakNervesLevel === 'none'} />}
      {settings.atmosphere && <AtmosphereEnhancer enabled={!isAnyProtection} intensity={settings.glitchIntensity} />}
      {!isFlowerMode && <div className="tracking-lines fixed inset-0 opacity-20 pointer-events-none" />}
      
      {showSettings && (
        <Settings 
          onClose={() => setShowSettings(false)} 
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      
      {showCodeInput && (
        <CodeInput
          onClose={() => setShowCodeInput(false)}
          onCodeSubmit={handleCodeSubmit}
        />
      )}
      
      {showJumpscare && (
        <Jumpscare onComplete={() => {
          setShowJumpscare(false);
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
            setKnockCount(0);
          }, 5000);
        }} />
      )}
      
      {showWarning && (
        <div className={`fixed inset-0 ${isFlowerMode ? 'bg-pink-200/40' : 'bg-destructive/20'} z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in`}>
          <Card className={`border-4 ${isFlowerMode ? 'border-pink-400 bg-white/95' : 'border-destructive bg-card/95'} p-8 max-w-2xl mx-4 ${!isFlowerMode && 'animate-pulse'}`}>
            <div className="text-center">
              {isFlowerMode ? (
                <>
                  <h2 className="text-5xl font-bold text-pink-500 mb-4">🌸 КТО-ТО ПРИШЁЛ! 🌸</h2>
                  <p className="text-2xl text-pink-600">
                    ЭТО ТВОЙ ДРУГ С ЦВЕТАМИ!
                  </p>
                  <p className="text-xl text-pink-400 mt-4">
                    💐 ОТКРЫВАЙ СКОРЕЕ! 💐
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-5xl horror-title text-destructive mb-4 glitch">ТУК-ТУК-ТУК</h2>
                  <p className="vhs-text text-2xl text-foreground crt-effect">
                    КТО-ТО СТУЧИТСЯ В ДВЕРЬ
                  </p>
                  <p className="vhs-text text-xl text-muted-foreground mt-4 flicker">
                    НЕ ОТКРЫВАЙТЕ
                  </p>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
      
      <header className={`border-b-2 ${isFlowerMode ? 'border-pink-400 bg-white/90' : 'border-primary bg-card/90'} backdrop-blur-sm sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-end gap-2 mb-4">
            <Button
              onClick={() => setShowCodeInput(true)}
              variant="outline"
              size="sm"
              className={isFlowerMode ? 'border-pink-400 text-pink-600 hover:bg-pink-100' : 'border-primary text-primary hover:bg-primary/20'}
            >
              <Icon name="Lock" size={16} className="mr-2" />
              {isFlowerMode ? 'ОТКРЫТЬ СЕКРЕТ' : 'ВВЕСТИ КОД'}
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              size="sm"
              className={isFlowerMode ? 'border-pink-400 text-pink-600 hover:bg-pink-100' : 'border-primary text-primary hover:bg-primary/20'}
            >
              <Icon name="Settings" size={16} className="mr-2" />
              НАСТРОЙКИ
            </Button>
          </div>
          <h1 className={`text-5xl md:text-7xl mb-2 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary glitch flicker'}`}>
            {isFlowerMode ? 'ЦВЕТОЧНАЯ ПОЛЯНА' : 'СЕМЕРО КОЗЛЯТ'}
          </h1>
          <p className={`text-xl md:text-2xl ${isFlowerMode ? 'text-purple-500 font-medium' : 'vhs-text text-secondary'}`}>
            {isFlowerMode ? '[ДНЕВНИК САДОВОДА | КОЛЛЕКЦИЯ ЦВЕТОВ | ДЛЯ ВСЕХ]' : '[ЗАПИСЬ №7734 | СЕКРЕТНЫЙ АРХИВ | НЕ ДЛЯ ПУБЛИКАЦИИ]'}
          </p>
          {unlockedCodes.length > 0 && (
            <p className="vhs-text text-center text-sm text-primary mt-2 animate-pulse">
              [{unlockedCodes.length}/8 КОДОВ РАЗБЛОКИРОВАНО]
            </p>
          )}
          
          <nav className="flex flex-wrap gap-2 mt-6">
            {['main', 'characters', 'timeline', 'theories', 'artifacts'].map((section) => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className={`px-4 py-2 border-2 transition-all text-lg ${
                  isFlowerMode
                    ? activeSection === section
                      ? 'bg-pink-500 text-white border-pink-500 rounded-full'
                      : 'bg-white text-pink-600 border-pink-300 hover:border-pink-500 rounded-full'
                    : activeSection === section
                      ? 'bg-primary text-primary-foreground border-primary vhs-text'
                      : 'bg-card text-foreground border-foreground hover:border-primary vhs-text'
                }`}
              >
                {section === 'main' && (isFlowerMode ? '🌸 ГЛАВНАЯ' : '► ГЛАВНАЯ')}
                {section === 'characters' && (isFlowerMode ? '🌺 ЦВЕТЫ' : '► ПЕРСОНАЖИ')}
                {section === 'timeline' && (isFlowerMode ? '🌼 ДЕНЬ В САДУ' : '► ХРОНОЛОГИЯ')}
                {section === 'theories' && (isFlowerMode ? '🌻 ФАКТЫ О ЦВЕТАХ' : '► ТЕОРИИ')}
                {section === 'artifacts' && (isFlowerMode ? '🌷 КОЛЛЕКЦИЯ' : '► АРТЕФАКТЫ')}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'main' && (
          <div className="space-y-8 animate-fade-in">
            <Card className={`p-8 border-2 ${isFlowerMode ? 'border-pink-300 bg-white/90' : 'border-primary bg-card/80'} backdrop-blur`}>
              <div className="flex items-start gap-4 mb-4">
                <Icon name={isFlowerMode ? 'Sun' : 'AlertTriangle'} className={isFlowerMode ? 'text-yellow-500' : 'text-primary animate-pulse'} size={32} />
                <div>
                  <h2 className={`text-3xl mb-2 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary'}`}>
                    {isFlowerMode ? 'ДОБРО ПОЖАЛОВАТЬ' : 'ПРЕДУПРЕЖДЕНИЕ'}
                  </h2>
                  <p className={`text-xl ${isFlowerMode ? 'text-purple-700' : 'vhs-text text-foreground'}`}>
                    {isFlowerMode 
                      ? 'Добро пожаловать в наш волшебный сад! Здесь растут самые красивые цветы, и каждый день приносит новые радости.' 
                      : 'Следующие материалы содержат записи инцидента, произошедшего [ДАТА УДАЛЕНА]. Просмотр разрешен только персоналу с допуском уровня 4 и выше.'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className={`p-8 border-2 ${isFlowerMode ? 'border-purple-300 bg-white/90' : 'border-secondary bg-card/80'} backdrop-blur`}>
              <h2 className={`text-3xl mb-4 ${isFlowerMode ? 'font-bold text-purple-600' : 'horror-title text-secondary'}`}>
                {isFlowerMode ? 'О НАШЕМ САДЕ' : 'ОПИСАНИЕ СЛУЧАЯ'}
              </h2>
              <div className={`text-xl space-y-4 ${isFlowerMode ? 'text-gray-700' : 'vhs-text text-foreground'}`}>
                {isFlowerMode ? (
                  <>
                    <p>
                      Наш сад находится в прекрасном месте, где всегда светит солнце и поют птички. 
                      Семь чудесных цветков растут здесь, радуя всех своей красотой.
                    </p>
                    <p>
                      Каждый день к нам прилетают бабочки и пчёлки, которые помогают цветам расти ещё красивее. 
                      Они собирают нектар и опыляют растения.
                    </p>
                    <p className="text-pink-600 font-semibold">
                      РЕЗУЛЬТАТ: 7 цветущих растений, 1 счастливая бабочка, бесконечная радость!
                    </p>
                    <p className="text-purple-600">
                      Этот дневник содержит все наблюдения за нашим садом, включая фотографии цветов, 
                      записи о погоде и заметки о наших маленьких друзьях-насекомых.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Инцидент произошел в изолированном доме на окраине [РЕДАКТИРОВАНО]. 
                      Семь субъектов (далее - козлята) остались без присмотра на период 3 часа 22 минуты.
                    </p>
                    <p>
                      Неизвестная сущность (классификация: ХИЩНИК-МИМИК) проникла в помещение, 
                      используя продвинутые техники социальной инженерии и голосовой мимикрии.
                    </p>
                    <p className="text-primary">
                      РЕЗУЛЬТАТ: 6 пропавших, 1 выживший, сущность не обнаружена.
                    </p>
                    <p className="text-muted-foreground text-lg">
                      Данное досье содержит все доступные материалы, включая показания свидетелей, 
                      записи камер наблюдения и физические улики. Часть информации повреждена или утеряна 
                      при неизвестных обстоятельствах.
                    </p>
                  </>
                )}
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              {isFlowerMode ? (
                <>
                  <Card className="p-6 border-2 border-pink-300 bg-white/90 backdrop-blur text-center">
                    <div className="text-5xl font-bold text-pink-500 mb-2">7</div>
                    <div className="text-xl text-pink-700">ЦВЕТОВ</div>
                  </Card>
                  <Card className="p-6 border-2 border-purple-300 bg-white/90 backdrop-blur text-center">
                    <div className="text-5xl font-bold text-purple-500 mb-2">1</div>
                    <div className="text-xl text-purple-700">БАБОЧКА</div>
                  </Card>
                  <Card className="p-6 border-2 border-yellow-300 bg-white/90 backdrop-blur text-center">
                    <div className="text-5xl font-bold text-yellow-500 mb-2">∞</div>
                    <div className="text-xl text-yellow-700">РАДОСТЬ</div>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="p-6 border-2 border-primary bg-card/80 backdrop-blur text-center">
                    <div className="text-5xl horror-title text-primary mb-2">6</div>
                    <div className="vhs-text text-xl text-foreground">ПРОПАВШИХ</div>
                  </Card>
                  <Card className="p-6 border-2 border-secondary bg-card/80 backdrop-blur text-center">
                    <div className="text-5xl horror-title text-secondary mb-2">1</div>
                    <div className="vhs-text text-xl text-foreground">ВЫЖИВШИЙ</div>
                  </Card>
                  <Card className="p-6 border-2 border-destructive bg-card/80 backdrop-blur text-center">
                    <div className="text-5xl horror-title text-destructive mb-2 glitch">?</div>
                    <div className="vhs-text text-xl text-foreground">СУЩНОСТЬ</div>
                  </Card>
                </>
              )}
            </div>
          </div>
        )}

        {activeSection === 'characters' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className={`text-4xl mb-6 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary glitch'}`}>
              {isFlowerMode ? 'НАШИ ЦВЕТОЧКИ' : 'ДОСЬЕ СУБЪЕКТОВ'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {characters.map((char, index) => (
                <Card 
                  key={index} 
                  className={`p-6 border-2 backdrop-blur transition-all hover:scale-[1.02] ${
                    isFlowerMode
                      ? char.status === 'ЛЕТАЕТ' ? 'border-purple-400 bg-purple-50/90 animate-pulse' : 
                        char.status === 'СЧАСТЛИВ' ? 'border-yellow-400 bg-yellow-50/90' : 
                        char.status === 'РАСТЁТ' ? 'border-green-400 bg-green-50/90' : 'border-pink-400 bg-pink-50/90'
                      : char.status === 'АКТИВНА' ? 'border-destructive bg-card/80 animate-pulse' : 
                        char.status === 'СВИДЕТЕЛЬ' ? 'border-secondary bg-card/80' : 'border-primary bg-card/80'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-2xl ${isFlowerMode ? 'font-bold text-gray-800' : 'font-horror text-foreground'}`}>{char.name}</h3>
                    <Badge 
                      variant={isFlowerMode ? 'secondary' : char.status === 'АКТИВНА' ? 'destructive' : 'secondary'}
                      className={`text-lg ${isFlowerMode ? 'bg-pink-200 text-pink-800 border-pink-300' : 'vhs-text'}`}
                    >
                      {char.status}
                    </Badge>
                  </div>
                  <div className={`text-lg space-y-2 ${isFlowerMode ? '' : 'vhs-text'}`}>
                    <p className={isFlowerMode ? 'text-purple-600 font-medium' : 'text-primary'}>
                      {isFlowerMode ? 'ВРЕМЯ НАБЛЮДЕНИЯ: ' : 'ПОСЛЕДНЕЕ ОБНАРУЖЕНИЕ: '}{char.lastSeen}
                    </p>
                    <p className={isFlowerMode ? 'text-gray-700' : 'text-foreground'}>{char.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className={`text-4xl mb-6 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary glitch'}`}>
              {isFlowerMode ? 'ДЕНЬ В САДУ' : 'ВРЕМЕННАЯ ЛИНИЯ'}
            </h2>
            <div className="space-y-3">
              {timeline.map((event, index) => (
                <Card 
                  key={index}
                  className={`p-6 border-2 backdrop-blur ${
                    isFlowerMode
                      ? event.type === 'danger' ? 'border-yellow-400 bg-yellow-50/90' :
                        event.type === 'warning' ? 'border-pink-400 bg-pink-50/90' :
                        event.type === 'corrupted' ? 'border-purple-300 bg-purple-50/90' :
                        'border-blue-300 bg-blue-50/90'
                      : event.type === 'danger' ? 'border-destructive bg-card/80' :
                        event.type === 'warning' ? 'border-primary bg-card/80' :
                        event.type === 'corrupted' ? 'border-muted bg-card/80 glitch' :
                        'border-secondary bg-card/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon 
                      name={
                        isFlowerMode
                          ? event.type === 'danger' ? 'Sun' :
                            event.type === 'warning' ? 'Flower2' :
                            event.type === 'corrupted' ? 'Sparkles' :
                            'Clock'
                          : event.type === 'danger' ? 'AlertTriangle' :
                            event.type === 'warning' ? 'AlertCircle' :
                            event.type === 'corrupted' ? 'Radio' :
                            'Clock'
                      }
                      className={
                        isFlowerMode
                          ? event.type === 'danger' ? 'text-yellow-500' :
                            event.type === 'warning' ? 'text-pink-500' :
                            event.type === 'corrupted' ? 'text-purple-500 animate-pulse' :
                            'text-blue-500'
                          : event.type === 'danger' ? 'text-destructive' :
                            event.type === 'warning' ? 'text-primary' :
                            event.type === 'corrupted' ? 'text-muted animate-pulse' :
                            'text-secondary'
                      }
                      size={24}
                    />
                    <div className="flex-1">
                      <div className={`text-xl mb-1 ${isFlowerMode ? 'text-pink-600 font-medium' : 'vhs-text text-primary'}`}>{event.time}</div>
                      <div className={`text-lg ${
                        isFlowerMode
                          ? event.type === 'corrupted' ? 'text-purple-600' : 'text-gray-700'
                          : event.type === 'corrupted' ? 'text-muted glitch vhs-text' : 'text-foreground vhs-text'
                      }`}>
                        {event.event}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'theories' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className={`text-4xl mb-6 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary glitch'}`}>
              {isFlowerMode ? 'ИНТЕРЕСНЫЕ ФАКТЫ О ЦВЕТАХ' : 'ГИПОТЕЗЫ И ТЕОРИИ'}
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {theories.map((theory, index) => (
                <AccordionItem 
                  key={index} 
                  value={`theory-${index}`}
                  className={`border-2 backdrop-blur px-6 ${
                    isFlowerMode ? 'border-pink-300 bg-white/90' : 'border-primary bg-card/80'
                  }`}
                >
                  <AccordionTrigger className={`text-2xl ${
                    isFlowerMode 
                      ? 'text-purple-700 hover:text-pink-600 font-semibold' 
                      : 'vhs-text text-foreground hover:text-primary'
                  }`}>
                    {theory.title}
                  </AccordionTrigger>
                  <AccordionContent className={`text-lg pt-4 ${
                    isFlowerMode ? 'text-gray-700' : 'vhs-text text-foreground'
                  }`}>
                    {theory.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {activeSection === 'artifacts' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className={`text-4xl mb-6 ${isFlowerMode ? 'font-bold text-pink-600' : 'horror-title text-primary glitch'}`}>
              {isFlowerMode ? 'КОЛЛЕКЦИЯ НАХОДОК' : 'ВЕЩЕСТВЕННЫЕ ДОКАЗАТЕЛЬСТВА'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artifacts.map((artifact) => (
                <Card 
                  key={artifact.id}
                  className={`p-6 border-2 backdrop-blur transition-all cursor-pointer group ${
                    isFlowerMode 
                      ? 'border-pink-300 bg-white/90 hover:border-pink-500 hover:shadow-lg' 
                      : 'border-primary bg-card/80 hover:border-destructive'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Icon 
                      name={isFlowerMode ? 'Flower2' : 'FileWarning'}
                      className={isFlowerMode 
                        ? 'text-pink-500 group-hover:text-purple-500 transition-colors' 
                        : 'text-primary group-hover:text-destructive transition-colors'
                      }
                      size={32}
                    />
                    <div>
                      <div className={`text-sm mb-1 ${
                        isFlowerMode ? 'text-pink-600 font-medium' : 'vhs-text text-primary'
                      }`}>{artifact.id}</div>
                      <h3 className={`text-xl mb-2 ${
                        isFlowerMode ? 'font-bold text-gray-800' : 'font-horror text-foreground'
                      }`}>{artifact.name}</h3>
                      <div className={`text-lg ${
                        isFlowerMode ? 'text-purple-600' : 'vhs-text text-destructive'
                      }`}>{artifact.status}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t-2 border-primary bg-card/90 backdrop-blur-sm mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="vhs-text text-xl text-muted-foreground mb-2">
              [КОНЕЦ ЗАПИСИ]
            </p>
            <button
              onClick={handleKnock}
              className="vhs-text text-lg text-muted-foreground flicker hover:text-destructive transition-colors cursor-pointer border-none bg-transparent"
            >
              ЕСЛИ ВЫ СЛЫШИТЕ СТУК В ДВЕРЬ - НЕ ОТКРЫВАЙТЕ
            </button>
            {knockCount > 0 && knockCount < 3 && (
              <p className="vhs-text text-sm text-destructive mt-2 animate-pulse">
                [{knockCount}/3 СТУКА]
              </p>
            )}
          </div>
          <div className="text-center vhs-text text-sm text-muted-foreground/50">
            <p>СЕКРЕТНЫЙ КОД: ↑↑↓↓←→←→BA</p>
            <p className="mt-1">Активировать звук: {isPlaying ? '🔊 ВКЛ' : '🔇 ВЫКЛ'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}