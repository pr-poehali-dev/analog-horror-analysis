import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('main');

  const characters = [
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

  const timeline = [
    { time: '02:34:12', event: 'Мама-коза покидает дом', type: 'normal' },
    { time: '03:15:47', event: 'Первый стук в дверь. Грубый голос.', type: 'warning' },
    { time: '03:28:33', event: 'Второй стук. Голос изменился.', type: 'warning' },
    { time: '03:41:18', event: 'Третий стук. Голос идентичен маме.', type: 'danger' },
    { time: '03:47:12', event: 'Дверь открыта. Начало инцидента.', type: 'danger' },
    { time: '03:47:15', event: '[ДАННЫЕ УДАЛЕНЫ]', type: 'corrupted' },
    { time: '04:56:23', event: 'Возвращение матери. Обнаружение.', type: 'normal' },
    { time: '05:12:41', event: '[ЗАПИСЬ ПОВРЕЖДЕНА]', type: 'corrupted' }
  ];

  const theories = [
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

  const artifacts = [
    { id: 'A-001', name: 'Дверная ручка', status: 'Температура -15°C' },
    { id: 'A-002', name: 'Аудиозапись', status: 'Неизвестные частоты' },
    { id: 'A-003', name: 'Фрагмент шерсти', status: 'ДНК не совпадает' },
    { id: 'A-004', name: 'Царапины', status: 'Идут изнутри' },
    { id: 'A-005', name: 'Часы', status: 'Идут в обратную сторону' },
    { id: 'A-006', name: 'Фотография', status: 'Лишняя фигура на фоне' }
  ];

  return (
    <div className="min-h-screen bg-background scanlines vhs-noise">
      <div className="tracking-lines fixed inset-0 opacity-20 pointer-events-none" />
      
      <header className="border-b-2 border-primary bg-card/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-5xl md:text-7xl horror-title text-primary mb-2 glitch flicker">
            СЕМЕРО КОЗЛЯТ
          </h1>
          <p className="vhs-text text-xl md:text-2xl text-secondary">
            [ЗАПИСЬ №7734 | СЕКРЕТНЫЙ АРХИВ | НЕ ДЛЯ ПУБЛИКАЦИИ]
          </p>
          
          <nav className="flex flex-wrap gap-2 mt-6">
            {['main', 'characters', 'timeline', 'theories', 'artifacts'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 border-2 transition-all vhs-text text-lg ${
                  activeSection === section
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-foreground hover:border-primary'
                }`}
              >
                {section === 'main' && '► ГЛАВНАЯ'}
                {section === 'characters' && '► ПЕРСОНАЖИ'}
                {section === 'timeline' && '► ХРОНОЛОГИЯ'}
                {section === 'theories' && '► ТЕОРИИ'}
                {section === 'artifacts' && '► АРТЕФАКТЫ'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'main' && (
          <div className="space-y-8 animate-fade-in">
            <Card className="p-8 border-2 border-primary bg-card/80 backdrop-blur">
              <div className="flex items-start gap-4 mb-4">
                <Icon name="AlertTriangle" className="text-primary animate-pulse" size={32} />
                <div>
                  <h2 className="text-3xl horror-title text-primary mb-2">ПРЕДУПРЕЖДЕНИЕ</h2>
                  <p className="vhs-text text-xl text-foreground">
                    Следующие материалы содержат записи инцидента, произошедшего [ДАТА УДАЛЕНА]. 
                    Просмотр разрешен только персоналу с допуском уровня 4 и выше.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 border-secondary bg-card/80 backdrop-blur">
              <h2 className="text-3xl horror-title text-secondary mb-4">ОПИСАНИЕ СЛУЧАЯ</h2>
              <div className="vhs-text text-xl space-y-4 text-foreground">
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
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
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
            </div>
          </div>
        )}

        {activeSection === 'characters' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl horror-title text-primary mb-6 glitch">ДОСЬЕ СУБЪЕКТОВ</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {characters.map((char, index) => (
                <Card 
                  key={index} 
                  className={`p-6 border-2 bg-card/80 backdrop-blur transition-all hover:scale-[1.02] ${
                    char.status === 'АКТИВНА' ? 'border-destructive animate-pulse' : 
                    char.status === 'СВИДЕТЕЛЬ' ? 'border-secondary' : 'border-primary'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-horror text-foreground">{char.name}</h3>
                    <Badge 
                      variant={char.status === 'АКТИВНА' ? 'destructive' : 'secondary'}
                      className="vhs-text text-lg"
                    >
                      {char.status}
                    </Badge>
                  </div>
                  <div className="vhs-text text-lg space-y-2">
                    <p className="text-primary">ПОСЛЕДНЕЕ ОБНАРУЖЕНИЕ: {char.lastSeen}</p>
                    <p className="text-foreground">{char.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl horror-title text-primary mb-6 glitch">ВРЕМЕННАЯ ЛИНИЯ</h2>
            <div className="space-y-3">
              {timeline.map((event, index) => (
                <Card 
                  key={index}
                  className={`p-6 border-2 bg-card/80 backdrop-blur ${
                    event.type === 'danger' ? 'border-destructive' :
                    event.type === 'warning' ? 'border-primary' :
                    event.type === 'corrupted' ? 'border-muted glitch' :
                    'border-secondary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon 
                      name={
                        event.type === 'danger' ? 'AlertTriangle' :
                        event.type === 'warning' ? 'AlertCircle' :
                        event.type === 'corrupted' ? 'Radio' :
                        'Clock'
                      }
                      className={
                        event.type === 'danger' ? 'text-destructive' :
                        event.type === 'warning' ? 'text-primary' :
                        event.type === 'corrupted' ? 'text-muted animate-pulse' :
                        'text-secondary'
                      }
                      size={24}
                    />
                    <div className="flex-1">
                      <div className="vhs-text text-primary text-xl mb-1">{event.time}</div>
                      <div className={`vhs-text text-lg ${
                        event.type === 'corrupted' ? 'text-muted glitch' : 'text-foreground'
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
            <h2 className="text-4xl horror-title text-primary mb-6 glitch">ГИПОТЕЗЫ И ТЕОРИИ</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {theories.map((theory, index) => (
                <AccordionItem 
                  key={index} 
                  value={`theory-${index}`}
                  className="border-2 border-primary bg-card/80 backdrop-blur px-6"
                >
                  <AccordionTrigger className="vhs-text text-2xl text-foreground hover:text-primary">
                    {theory.title}
                  </AccordionTrigger>
                  <AccordionContent className="vhs-text text-lg text-foreground pt-4">
                    {theory.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {activeSection === 'artifacts' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl horror-title text-primary mb-6 glitch">ВЕЩЕСТВЕННЫЕ ДОКАЗАТЕЛЬСТВА</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artifacts.map((artifact) => (
                <Card 
                  key={artifact.id}
                  className="p-6 border-2 border-primary bg-card/80 backdrop-blur hover:border-destructive transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <Icon 
                      name="FileWarning" 
                      className="text-primary group-hover:text-destructive transition-colors" 
                      size={32}
                    />
                    <div>
                      <div className="vhs-text text-primary text-sm mb-1">{artifact.id}</div>
                      <h3 className="text-xl font-horror text-foreground mb-2">{artifact.name}</h3>
                      <div className="vhs-text text-lg text-destructive">{artifact.status}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t-2 border-primary bg-card/90 backdrop-blur-sm mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="vhs-text text-xl text-muted-foreground mb-2">
            [КОНЕЦ ЗАПИСИ]
          </p>
          <p className="vhs-text text-lg text-muted-foreground flicker">
            ЕСЛИ ВЫ СЛЫШИТЕ СТУК В ДВЕРЬ - НЕ ОТКРЫВАЙТЕ
          </p>
        </div>
      </footer>
    </div>
  );
}
