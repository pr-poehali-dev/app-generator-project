import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  reward: string;
}

interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  world: string;
}

const Index = () => {
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('main');

  const quests: Quest[] = [
    {
      id: 1,
      title: 'Путешествие в Средний мир',
      description: 'Познакомься с тремя мирами Олонхо: Верхним, Средним и Нижним. Узнай, кто населяет каждый из них.',
      difficulty: 'easy',
      completed: completedQuests.includes(1),
      reward: 'Знание о структуре мира Олонхо'
    },
    {
      id: 2,
      title: 'Испытание силы Нюргуна',
      description: 'Помоги Нюргуну Боотуру победить абаасы (злых духов). Изучи его богатырские подвиги.',
      difficulty: 'medium',
      completed: completedQuests.includes(2),
      reward: 'История о богатырской силе'
    },
    {
      id: 3,
      title: 'Встреча с Туйаарымой Куо',
      description: 'Узнай историю красавицы Туйаарымы Куо и её роль в эпосе. Разгадай загадки её мудрости.',
      difficulty: 'medium',
      completed: completedQuests.includes(3),
      reward: 'Легенда о любви и верности'
    },
    {
      id: 4,
      title: 'Противостояние с Уот Усутаакы',
      description: 'Изучи эпическую битву между героями и злыми силами. Познай законы справедливости.',
      difficulty: 'hard',
      completed: completedQuests.includes(4),
      reward: 'Понимание борьбы добра и зла'
    }
  ];

  const characters: Character[] = [
    {
      id: 1,
      name: 'Нюргун Боотур',
      role: 'Главный герой',
      description: 'Могучий богатырь из племени айыы аймага, защитник Среднего мира. Обладает невероятной силой и благородным сердцем.',
      world: 'Средний мир'
    },
    {
      id: 2,
      name: 'Туйаарыма Куо',
      role: 'Героиня',
      description: 'Прекрасная дочь племени айыы, возлюбленная Нюргуна Боотура. Символ красоты, мудрости и верности.',
      world: 'Средний мир'
    },
    {
      id: 3,
      name: 'Юрюнг Айыы Тойон',
      role: 'Верховное божество',
      description: 'Создатель светлых духов айыы, хранитель справедливости и порядка в трёх мирах.',
      world: 'Верхний мир'
    },
    {
      id: 4,
      name: 'Уот Усутаакы',
      role: 'Антагонист',
      description: 'Могущественный злой дух абаасы из Нижнего мира, враг племени айыы и главный противник Нюргуна.',
      world: 'Нижний мир'
    },
    {
      id: 5,
      name: 'Сыын Дьаарыылы',
      role: 'Богатырь',
      description: 'Верный друг и соратник Нюргуна Боотура, храбрый воин племени айыы.',
      world: 'Средний мир'
    }
  ];

  const completeQuest = (questId: number) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getWorldIcon = (world: string) => {
    if (world === 'Верхний мир') return 'Sun';
    if (world === 'Нижний мир') return 'Flame';
    return 'Home';
  };

  const progressPercentage = (completedQuests.length / quests.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {activeTab === 'main' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
              Олонхо: Легенда о Нюргуне
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Погрузись в древний якутский эпос и стань частью великой истории
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Icon name="Trophy" size={20} className="mr-2" />
                {completedQuests.length} из {quests.length} квестов
              </Badge>
            </div>
          </div>

          <Card className="mb-8 border-2 border-primary/30 bg-card/50 backdrop-blur animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Твой прогресс</CardTitle>
                <span className="text-3xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card 
              className="cursor-pointer hover:scale-105 transition-transform border-2 border-secondary/50 bg-gradient-to-br from-secondary/20 to-card animate-slide-up"
              onClick={() => setActiveTab('quests')}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Icon name="Scroll" size={32} className="text-secondary" />
                  </div>
                  <div>
                    <CardTitle>Квесты</CardTitle>
                    <CardDescription>Испытания эпоса</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:scale-105 transition-transform border-2 border-primary/50 bg-gradient-to-br from-primary/20 to-card animate-slide-up"
              style={{ animationDelay: '0.1s' }}
              onClick={() => setActiveTab('encyclopedia')}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon name="Book" size={32} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle>Энциклопедия</CardTitle>
                    <CardDescription>Персонажи и миры</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:scale-105 transition-transform border-2 border-accent/50 bg-gradient-to-br from-accent/20 to-card animate-slide-up"
              style={{ animationDelay: '0.2s' }}
              onClick={() => setActiveTab('culture')}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Icon name="Sparkles" size={32} className="text-accent" />
                  </div>
                  <div>
                    <CardTitle>Культура</CardTitle>
                    <CardDescription>Традиции якутов</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'quests' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setActiveTab('main')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <h2 className="text-4xl font-bold mb-8 text-primary">Квесты Олонхо</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quests.map((quest, index) => (
              <Card 
                key={quest.id}
                className={`border-2 ${quest.completed ? 'border-green-500/50 bg-green-500/5' : 'border-border'} animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{quest.title}</CardTitle>
                      <Badge className={getDifficultyColor(quest.difficulty)}>
                        {quest.difficulty === 'easy' ? 'Лёгкий' : quest.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                      </Badge>
                    </div>
                    {quest.completed && (
                      <Icon name="CheckCircle2" size={32} className="text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{quest.description}</p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Gift" size={16} />
                    <span>Награда: {quest.reward}</span>
                  </div>
                  <Button 
                    onClick={() => completeQuest(quest.id)}
                    disabled={quest.completed}
                    className="w-full"
                  >
                    {quest.completed ? 'Завершено' : 'Начать квест'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'encyclopedia' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setActiveTab('main')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <h2 className="text-4xl font-bold mb-8 text-primary">Энциклопедия Олонхо</h2>

          <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="characters">Персонажи</TabsTrigger>
              <TabsTrigger value="worlds">Три мира</TabsTrigger>
              <TabsTrigger value="terms">Термины</TabsTrigger>
            </TabsList>

            <TabsContent value="characters" className="space-y-6">
              {characters.map((character, index) => (
                <Card 
                  key={character.id}
                  className="border-2 border-border animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{character.name}</CardTitle>
                        <CardDescription className="text-lg">{character.role}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        <Icon name={getWorldIcon(character.world)} size={16} className="mr-2" />
                        {character.world}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{character.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="worlds" className="space-y-6">
              <Card className="border-2 border-secondary animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Sun" size={40} className="text-secondary" />
                    <div>
                      <CardTitle className="text-2xl">Верхний мир (Үөhээ дойду)</CardTitle>
                      <CardDescription>Мир светлых божеств айыы</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Небесный мир, где обитают добрые божества айыы во главе с Юрюнг Айыы Тойоном. 
                    Это мир света, справедливости и гармонии, откуда приходит помощь героям Среднего мира.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Home" size={40} className="text-primary" />
                    <div>
                      <CardTitle className="text-2xl">Средний мир (Орто дойду)</CardTitle>
                      <CardDescription>Мир людей</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Земной мир, где живут люди племени айыы аймага. Здесь разворачиваются главные события эпоса, 
                    происходят битвы богатырей, заключаются браки и торжествует справедливость.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Flame" size={40} className="text-accent" />
                    <div>
                      <CardTitle className="text-2xl">Нижний мир (Аллараа дойду)</CardTitle>
                      <CardDescription>Мир злых духов абаасы</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Подземный мир, населённый злыми духами абаасы. Отсюда приходят угрозы для Среднего мира, 
                    и богатыри должны защищать людей от враждебных сил тьмы и хаоса.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms" className="space-y-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {[
                    { term: 'Олонхо', desc: 'Героический эпос якутского народа, передающийся из поколения в поколение через устные сказания олонхосутов.' },
                    { term: 'Айыы', desc: 'Светлые божества и добрые духи Верхнего мира, покровители людей и справедливости.' },
                    { term: 'Абаасы', desc: 'Злые духи Нижнего мира, враги людей и источник бед и несчастий.' },
                    { term: 'Богатырь', desc: 'Могучий воин, защитник народа, обладающий сверхъестественной силой и храбростью.' },
                    { term: 'Алааc', desc: 'Священная песнь-обращение к божествам, используемая для призыва помощи или благословения.' },
                    { term: 'Ытык', desc: 'Священный, святой. Относится к почитаемым объектам и местам в якутской культуре.' }
                  ].map((item, index) => (
                    <Card 
                      key={index}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {activeTab === 'culture' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setActiveTab('main')}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <h2 className="text-4xl font-bold mb-8 text-primary">Культура и традиции</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/50 animate-scale-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name="Music" size={32} className="text-primary" />
                  <CardTitle className="text-2xl">Олонхосуты</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мастера устного сказания, которые передают эпос Олонхо из поколения в поколение. 
                  Олонхосут не просто рассказчик — это импровизатор, певец и актёр в одном лице.
                </p>
                <Badge>Культурное наследие ЮНЕСКО</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/50 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name="Flame" size={32} className="text-secondary" />
                  <CardTitle className="text-2xl">Ысыах</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Главный якутский праздник, посвящённый встрече лета и поклонению божествам айыы. 
                  Время проведения национальных обрядов, игр и исполнения олонхо.
                </p>
                <Badge>Летнее солнцестояние</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name="Palette" size={32} className="text-accent" />
                  <CardTitle className="text-2xl">Орнаменты</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Традиционные якутские узоры символизируют связь с природой: рога оленя, листья, 
                  солнечные лучи. Используются в одежде, украшениях и предметах быта.
                </p>
                <Badge>Символы природы</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/50 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name="Heart" size={32} className="text-primary" />
                  <CardTitle className="text-2xl">Ценности эпоса</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Олонхо учит храбрости, справедливости, уважению к старшим, любви к родной земле. 
                  Эпос воспевает победу добра над злом и важность сохранения гармонии в мире.
                </p>
                <Badge>Нравственные уроки</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
