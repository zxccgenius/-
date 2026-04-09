import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Phone, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Instagram, 
  Facebook,
  ArrowRight,
  ArrowDown,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const CATEGORIES = [
  { id: 'sets', name: 'Комплекты', image: 'https://picsum.photos/seed/bali-set/800/1000', count: '12' },
  { id: 'chairs', name: 'Кресла и стулья', image: 'https://picsum.photos/seed/bali-chair/800/1000', count: '24' },
  { id: 'tables', name: 'Столы', image: 'https://picsum.photos/seed/bali-table/800/1000', count: '08' },
  { id: 'sofas', name: 'Диваны', image: 'https://picsum.photos/seed/bali-sofa/800/1000', count: '15' },
];

const FEATURED_PRODUCTS = [
  { 
    id: 1, 
    name: 'Комплект "Бали Премиум"', 
    price: '45 900 ₽', 
    image: 'https://picsum.photos/seed/product1/600/800',
    tag: 'Хит продаж'
  },
  { 
    id: 2, 
    name: 'Кресло-качалка "Папасан"', 
    price: '18 500 ₽', 
    image: 'https://picsum.photos/seed/product2/600/800',
    tag: 'Новинка'
  },
  { 
    id: 3, 
    name: 'Обеденная группа "Убуд"', 
    price: '62 000 ₽', 
    image: 'https://picsum.photos/seed/product3/600/800',
    tag: 'В наличии'
  },
  { 
    id: 4, 
    name: 'Диван "Чангу" 2-х местный', 
    price: '32 400 ₽', 
    image: 'https://picsum.photos/seed/product4/600/800',
    tag: 'Скидка'
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-bali-gold selection:text-white">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-bali-sand/90 backdrop-blur-2xl py-4 border-b border-bali-ink/5 text-bali-ink' : 'bg-transparent py-10 text-white'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className={`absolute inset-0 border rounded-full group-hover:scale-110 group-hover:border-bali-gold transition-all duration-700 ${isScrolled ? 'border-bali-ink/10' : 'border-white/20'}`} />
              <div className={`absolute inset-2 border rounded-full group-hover:rotate-180 transition-all duration-1000 ${isScrolled ? 'border-bali-ink/5' : 'border-white/10'}`} />
              <span className="font-serif text-2xl font-bold relative z-10">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tighter leading-none">Bali Style</span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-bali-gold font-bold leading-none mt-2">Premium Rattan</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.3em]">
            {['Каталог', 'О компании', 'HoReCa', 'Информация'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group py-2">
                <span className="block group-hover:text-bali-gold transition-colors duration-500">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bali-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mb-1">Шоу-рум</span>
              <span className="text-sm font-serif font-bold tracking-tight">Екатеринбург</span>
            </div>
            <Button variant="ghost" size="icon" className={`relative hover:bg-bali-gold/10 rounded-full w-14 h-14 transition-all duration-500 ${isScrolled ? 'text-bali-ink' : 'text-white'}`}>
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-3 right-3 bg-bali-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">0</span>
            </Button>
            <button className={`lg:hidden p-3 hover:bg-bali-gold/10 rounded-full transition-all duration-500 ${isScrolled ? 'text-bali-ink' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bali-sand flex flex-col"
          >
            <div className="flex-grow flex flex-col justify-center px-12">
              <nav className="flex flex-col gap-8">
                {['Каталог', 'О компании', 'HoReCa', 'Информация'].map((item, idx) => (
                  <motion.a 
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-serif hover:text-bali-gold transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </div>
            <div className="p-12 border-t border-bali-ink/5">
              <p className="text-sm opacity-40 mb-4 uppercase tracking-widest">Связаться с нами</p>
              <p className="text-2xl font-serif">8 (800) 123-45-67</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section - Editorial Style */}
        <section ref={heroRef} className="relative h-[110vh] flex flex-col justify-end overflow-hidden bg-bali-ink">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/bali-hero-premium/1920/1080" 
              alt="Bali Rattan Furniture" 
              className="w-full h-full object-cover brightness-[0.7] scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bali-ink via-transparent to-black/40" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 pb-32">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 lg:col-span-10">
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-[1px] w-16 bg-bali-gold" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-bali-gold font-bold">Эссенция Индонезии</span>
                  </div>
                  <h1 className="text-[18vw] lg:text-[14vw] font-serif leading-[0.75] text-white mb-16 tracking-tighter">
                    Чистая<br />
                    <span className="italic text-bali-gold ml-[0.5em]">Природа</span>
                  </h1>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="flex flex-wrap gap-12 items-center"
                >
                  <Button size="lg" className="bg-bali-gold text-white hover:bg-white hover:text-bali-ink px-16 py-10 text-xs uppercase tracking-[0.3em] rounded-none transition-all duration-700 group">
                    Смотреть коллекцию
                    <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-white hover:border-white transition-all duration-500">
                      <Play className="w-5 h-5 text-white group-hover:text-bali-ink fill-current ml-1" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Смотреть фильм</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Grid lines overlay */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="container mx-auto px-6 h-full flex justify-between">
              <div className="grid-line-v opacity-20" />
              <div className="grid-line-v opacity-20 hidden md:block" />
              <div className="grid-line-v opacity-20 hidden lg:block" />
              <div className="grid-line-v opacity-20" />
            </div>
          </div>
        </section>

        {/* Categories - Editorial Grid */}
        <section id="каталог" className="py-32 bg-bali-sand relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-12 gap-6 mb-24">
              <div className="col-span-12 lg:col-span-6">
                <span className="text-bali-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Наши коллекции</span>
                <h2 className="text-6xl md:text-8xl font-serif leading-none mb-8">Искусство плетения</h2>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
                <p className="text-lg text-bali-ink/60 font-light leading-relaxed mb-8">
                  Откройте для себя нашу кураторскую подборку мебели из натурального ротанга. Каждый предмет — это уникальный шедевр, отражающий богатое культурное наследие Индонезии.
                </p>
                <div className="h-[1px] w-full bg-bali-ink/10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bali-ink/5 border border-bali-ink/5">
              {CATEGORIES.map((cat, idx) => (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[3/4] bg-bali-sand overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 p-10 z-20 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                        Коллекция {cat.count}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-bali-ink/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-4xl font-serif mb-4 group-hover:text-bali-gold transition-colors leading-none">{cat.name}</h3>
                      <div className="h-[1px] w-0 group-hover:w-full bg-bali-gold transition-all duration-700" />
                    </div>
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-bali-sand via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - High Contrast */}
        <section className="py-32 bg-bali-ink text-bali-sand overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-bali-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Хиты продаж</span>
                <h2 className="text-5xl md:text-7xl font-serif leading-tight">Вневременные предметы для современной жизни</h2>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:border-bali-gold transition-colors cursor-pointer group">
                  <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:border-bali-gold transition-colors cursor-pointer group">
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {FEATURED_PRODUCTS.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-10 overflow-hidden bg-bali-sand/5">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 left-8">
                      <Badge className="bg-bali-gold text-white border-none rounded-none px-4 py-1 text-[8px] font-bold uppercase tracking-[0.3em]">
                        {product.tag}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-bali-ink/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <Button className="bg-white text-bali-ink hover:bg-bali-gold hover:text-white rounded-none px-12 py-8 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        Быстрый просмотр
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="max-w-[70%]">
                      <h3 className="text-2xl font-serif mb-2 group-hover:text-bali-gold transition-colors leading-tight">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-bali-gold/40" />
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Натуральный ротанг</p>
                      </div>
                    </div>
                    <p className="text-xl font-serif text-bali-gold">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About - Asymmetrical Layout */}
        <section id="о компании" className="py-48 bg-bali-sand overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-bali-cream/50 -z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-12 gap-12 items-center">
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] overflow-hidden shadow-2xl"
                  >
                    <img 
                      src="https://picsum.photos/seed/bali-craft-premium/1000/1250" 
                      alt="Artisan at work" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-16 -right-16 w-3/4 aspect-square bg-bali-ink p-16 hidden lg:flex flex-col justify-center border border-white/10 shadow-2xl"
                >
                  <span className="text-bali-gold text-7xl font-serif mb-6">100%</span>
                  <p className="text-xs uppercase tracking-[0.4em] font-bold mb-4 text-white">Наследие ручной работы</p>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    Каждое плетение рассказывает историю поколений. Наши мастера на Бали сохраняют наследие, насчитывающее столетия, гарантируя, что каждое изделие является уникальным шедевром.
                  </p>
                </motion.div>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-32 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-bali-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Наша философия</span>
                  <h2 className="text-7xl md:text-9xl font-serif leading-[0.8] mb-16 tracking-tighter">Душа<br /><span className="italic">Бали</span></h2>
                  <div className="space-y-10 text-xl text-bali-ink/70 font-light leading-relaxed">
                    <p>
                      Bali Style — это больше, чем мебельный бренд. Это праздник индонезийского мастерства и природной красоты ротанга. Мы работаем напрямую с небольшими семейными мастерскими на Бали, чтобы предложить вам аутентичные, высококачественные изделия.
                    </p>
                    <p>
                      Исключая посредников, мы обеспечиваем справедливую оплату труда наших мастеров и лучшую цену для наших клиентов в России.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-20 pt-16 border-t border-bali-ink/10">
                    <div>
                      <h4 className="text-4xl font-serif mb-4">Напрямую</h4>
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Никаких посредников, только честная цена.</p>
                    </div>
                    <div>
                      <h4 className="text-4xl font-serif mb-4">Этично</h4>
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Поддержка местных сообществ на Бали.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* HoReCa - Technical/Technical Style */}
        <section id="horeca" className="py-48 bg-bali-cream border-y border-bali-ink/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
            <span className="text-[40vw] font-serif font-bold whitespace-nowrap">БИЗНЕС</span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-40">
                  <Badge className="bg-bali-ink text-white rounded-none mb-8 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em]">Корпоративные решения</Badge>
                  <h2 className="text-7xl font-serif leading-none mb-12 tracking-tighter">HoReCa и<br />Дизайн</h2>
                  <p className="text-xl text-bali-ink/60 mb-16 font-light leading-relaxed">
                    Преображаем коммерческие пространства органическим теплом ротанга. Мы предоставляем комплексные решения для индустрии гостеприимства и профессионалов в области дизайна.
                  </p>
                  <Button className="w-full lg:w-auto bg-bali-gold text-white hover:bg-bali-ink px-16 py-10 text-[10px] font-bold uppercase tracking-[0.3em] rounded-none transition-all duration-700 shadow-xl">
                    Стать партнером
                  </Button>
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-24 lg:mt-0">
                <div className="grid grid-cols-1 gap-px bg-bali-ink/10 border border-bali-ink/10 shadow-2xl">
                  {[
                    { title: 'Отели и курорты', desc: 'Кураторские наборы мебели для роскошных лобби, частных вилл и зон отдыха у бассейна.' },
                    { title: 'Рестораны и кафе', desc: 'Высокопрочные изделия, разработанные для интенсивного коммерческого использования без ущерба для стиля.' },
                    { title: 'Дизайнеры интерьеров', desc: 'Полный доступ к 3D-библиотекам, образцам материалов и персональному менеджеру проектов.' },
                    { title: 'Индивидуальные проекты', desc: 'Мебель, изготовленная на заказ по вашим специфическим архитектурным эскизам.' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-bali-cream p-16 group hover:bg-bali-ink hover:text-bali-sand transition-all duration-700 cursor-default"
                    >
                      <div className="flex justify-between items-start mb-10">
                        <span className="text-[12px] font-bold opacity-30 group-hover:text-bali-gold transition-colors tracking-widest">0{idx + 1}</span>
                        <div className="w-12 h-12 rounded-full border border-bali-ink/10 flex items-center justify-center group-hover:border-bali-gold transition-colors">
                          <ArrowRight className="w-5 h-5 -rotate-45 group-hover:text-bali-gold transition-colors" />
                        </div>
                      </div>
                      <h4 className="text-5xl font-serif mb-6 tracking-tight">{item.title}</h4>
                      <p className="text-lg opacity-50 group-hover:opacity-80 transition-opacity leading-relaxed max-w-md font-light">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info - Clean Minimal */}
        <section id="информация" className="py-32 bg-bali-sand">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-12 lg:col-span-6">
                <span className="text-bali-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Информация</span>
                <h2 className="text-6xl font-serif mb-16">Часто задаваемые вопросы</h2>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: 'Регионы доставки', a: 'Мы доставляем в Екатеринбург, Свердловскую область, ХМАО, Челябинскую, Курганскую и Пермскую области.' },
                    { q: 'Способы оплаты', a: 'Мы принимаем наличные, банковские карты и переводы для юридических лиц.' },
                    { q: 'Гарантия и возврат', a: 'На всю нашу мебель предоставляется гарантия 12 месяцев. Возврат возможен в течение 14 дней.' },
                    { q: 'Уход за мебелью', a: 'Натуральный ротанг прост в уходе. Достаточно протирать влажной тканью и избегать экстремальной влажности.' }
                  ].map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-bali-ink/10">
                      <AccordionTrigger className="text-2xl font-serif py-8 hover:text-bali-gold transition-colors text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-lg text-bali-ink/60 font-light pb-8 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <div className="bg-bali-ink text-bali-sand p-16 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-serif mb-12">Посетите наш шоу-рум</h3>
                    <div className="space-y-12">
                      <div className="flex gap-6">
                        <MapPin className="w-6 h-6 text-bali-gold shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Адрес</p>
                          <p className="text-xl font-light">ул. Примерная, 123, ТЦ "Мебель Хаус", Екатеринбург</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <Phone className="w-6 h-6 text-bali-gold shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Контакты</p>
                          <p className="text-xl font-light">8 (800) 123-45-67</p>
                          <p className="text-sm opacity-40 mt-1">Ежедневно 10:00 — 21:00</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-20 pt-12 border-t border-white/10 flex justify-between items-center">
                    <div className="flex gap-6">
                      <Instagram className="w-6 h-6 hover:text-bali-gold transition-colors cursor-pointer" />
                      <Facebook className="w-6 h-6 hover:text-bali-gold transition-colors cursor-pointer" />
                    </div>
                    <Button variant="link" className="text-bali-gold p-0 h-auto text-[10px] uppercase tracking-widest font-bold">
                      Проложить маршрут
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Architectural Style */}
      <footer className="bg-bali-sand border-t border-bali-ink/10 pt-48 pb-12 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-12 gap-16 mb-48">
            <div className="col-span-12 lg:col-span-4">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-bali-ink text-bali-sand flex items-center justify-center font-serif text-3xl font-bold">B</div>
                <span className="font-serif text-4xl font-bold tracking-tighter">Bali Style</span>
              </div>
              <p className="text-xl text-bali-ink/60 font-light leading-relaxed max-w-sm">
                Привносим вневременную элегантность индонезийского мастерства в ваш современный дом. Напрямую с Бали в Россию.
              </p>
            </div>

            <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:col-start-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 opacity-30">Навигация</h4>
              <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
                {['Каталог', 'О компании', 'HoReCa', 'Информация'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-bali-gold transition-colors duration-500">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 opacity-30">Поддержка</h4>
              <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
                {['Доставка', 'Оплата', 'Возврат', 'Приватность'].map(item => (
                  <li key={item}><a href="#" className="hover:text-bali-gold transition-colors duration-500">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 opacity-30">Рассылка</h4>
              <p className="text-sm text-bali-ink/60 mb-8 font-light">Присоединяйтесь к нашему кругу для получения эксклюзивных обновлений и раннего доступа к новым коллекциям.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Ваш Email" 
                  className="w-full bg-transparent border-b border-bali-ink/20 py-6 text-sm focus:outline-none focus:border-bali-gold transition-colors font-light"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-bali-gold hover:text-bali-ink transition-all duration-500 hover:translate-x-2">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-bali-ink/5">
            <p className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-bold">© 2026 Bali Style • Мастерство ручной работы</p>
            <div className="flex gap-16 text-[10px] uppercase tracking-[0.5em] opacity-30 font-bold">
              <a href="#" className="hover:text-bali-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-bali-gold transition-colors">Facebook</a>
              <a href="#" className="hover:text-bali-gold transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
        
        {/* Massive background text with reveal effect */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden h-[40vh] flex items-end">
          <motion.span 
            initial={{ y: "100%" }}
            whileInView={{ y: "20%" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[35vw] font-serif font-bold text-bali-ink/[0.03] leading-none whitespace-nowrap tracking-tighter"
          >
            BALI STYLE
          </motion.span>
        </div>
      </footer>
    </div>
  );
}
