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
  Play,
  Coffee,
  Hotel,
  Palmtree
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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const { scrollYProgress: pageScrollProgress } = useScroll();
  
  const heroContainerRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  // Apple-style mask reveal: image starts as a box and expands to full screen
  const maskScale = useTransform(heroScrollProgress, [0, 0.5], [0.8, 1]);
  const maskRadius = useTransform(heroScrollProgress, [0, 0.5], ["40px", "0px"]);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(heroScrollProgress, [0, 0.2], [0, -50]);

  // Animation variants
  const fluidVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-bali-gold selection:text-white overflow-x-hidden noise-bg">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <div className="hidden lg:block">
        <motion.div 
          className="custom-cursor"
          animate={{ 
            x: cursorPos.x - 16, 
            y: cursorPos.y - 16,
            scale: isHovering ? 2 : 1,
            backgroundColor: isHovering ? "rgba(184, 146, 80, 0.1)" : "transparent"
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        />
        <motion.div 
          className="custom-cursor-dot"
          animate={{ x: cursorPos.x - 2, y: cursorPos.y - 2 }}
          transition={{ type: "spring", damping: 40, stiffness: 400, mass: 0.1 }}
        />
      </div>

      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-bali-gold z-[60] origin-left"
        style={{ scaleX: pageScrollProgress }}
      />

      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-bali-sand/90 backdrop-blur-2xl py-4 border-b border-bali-ink/5 text-bali-ink' : 'bg-transparent py-10 text-white'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-6 group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ x: 5 }}
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className={`absolute inset-0 border rounded-full group-hover:scale-110 group-hover:border-bali-gold transition-all duration-700 ${isScrolled ? 'border-bali-ink/10' : 'border-white/20'}`} />
              <div className={`absolute inset-2 border rounded-full group-hover:rotate-180 transition-all duration-1000 ${isScrolled ? 'border-bali-ink/5' : 'border-white/10'}`} />
              <span className="font-serif text-2xl font-bold relative z-10">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tighter leading-none">Bali Style</span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-bali-gold font-bold leading-none mt-2">Premium Rattan</span>
            </div>
          </motion.div>
          <nav className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.3em]">
            {['Каталог', 'О компании', 'HoReCa', 'Информация'].map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative group py-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ y: -2 }}
              >
                <span className="block group-hover:text-bali-gold transition-colors duration-500">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bali-gold transition-all duration-500 group-hover:w-full" />
              </motion.a>
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
        {/* Hero Section - Cinematic Reveal */}
        <section ref={heroContainerRef} className="relative h-[200vh] bg-bali-ink">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div 
              style={{ 
                scale: maskScale,
                borderRadius: maskRadius
              }}
              className="relative w-full h-full overflow-hidden"
            >
              <img 
                src="https://picsum.photos/seed/bali-hero-premium/1920/1080" 
                alt="Bali Rattan Furniture" 
                className="w-full h-full object-cover brightness-[0.6]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bali-ink/80" />
            </motion.div>

            <motion.div 
              style={{ opacity: heroTextOpacity, y: heroTextY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-8"
              >
                <span className="text-[10px] uppercase tracking-[0.8em] text-bali-gold font-bold">Bali Style Premium</span>
              </motion.div>
              <h1 className="text-[12vw] lg:text-[10vw] font-serif leading-[0.85] text-white tracking-tighter mb-12">
                Эстетика<br />
                <span className="italic text-bali-gold">Природы</span>
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <ArrowDown className="w-8 h-8 text-white/30 animate-bounce" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-48 bg-bali-ink text-white relative z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fluidVariants}
                className="text-3xl md:text-5xl font-serif leading-relaxed text-bali-cream/90"
              >
                Мы создаем не просто мебель, а <span className="italic text-bali-gold">атмосферу</span> безмятежности Бали в вашем доме. Каждый предмет — это диалог между древним мастерством и современным комфортом.
              </motion.p>
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

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bali-ink/5 border border-bali-ink/5"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.div 
                  key={cat.id}
                  variants={fluidVariants}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
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
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </motion.div>
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

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {FEATURED_PRODUCTS.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  variants={fluidVariants}
                  whileHover={{ y: -15 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-10 overflow-hidden bg-bali-sand/5">
                    <motion.img 
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
            </motion.div>
          </div>
        </section>

        {/* About Section - Architectural Layout */}
        <section id="о компании" className="py-48 bg-white text-bali-ink overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-7 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-video overflow-hidden group"
                >
                  <img 
                    src="https://picsum.photos/seed/bali-about-arch/1200/800" 
                    alt="Bali Craftsmanship" 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-bali-gold/10 mix-blend-multiply" />
                </motion.div>
                <motion.div 
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-12 -right-12 bg-bali-gold p-12 text-white hidden md:block"
                >
                  <p className="text-6xl font-serif mb-2">15+</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Лет опыта</p>
                </motion.div>
              </div>
              <div className="lg:col-span-5">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={staggerContainer}
                >
                  <motion.span variants={fluidVariants} className="text-[10px] uppercase tracking-[0.5em] text-bali-gold font-bold mb-8 block">Наследие и Качество</motion.span>
                  <motion.h2 variants={fluidVariants} className="text-6xl md:text-7xl font-serif mb-12 leading-tight">Искусство ручной работы</motion.h2>
                  <motion.p variants={fluidVariants} className="text-lg opacity-70 leading-relaxed mb-12">
                    Каждое изделие Bali Style — это результат сотен часов кропотливого труда индонезийских мастеров. Мы используем только отборный ротанг и экологичные материалы, чтобы ваша мебель служила поколениям.
                  </motion.p>
                  <motion.div variants={fluidVariants}>
                    <Button variant="outline" className="border-bali-ink/20 hover:bg-bali-ink hover:text-white rounded-none px-12 py-8 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-700">
                      Наша история
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* HoReCa Section - Immersive Grid */}
        <section id="horeca" className="py-48 bg-bali-ink text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid-line-h absolute top-1/4" />
            <div className="grid-line-h absolute top-2/4" />
            <div className="grid-line-h absolute top-3/4" />
            <div className="grid-line-v absolute left-1/4" />
            <div className="grid-line-v absolute left-2/4" />
            <div className="grid-line-v absolute left-3/4" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  className="text-[10px] uppercase tracking-[0.5em] text-bali-gold font-bold mb-8 block"
                >
                  Профессиональные решения
                </motion.span>
                <motion.h2 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={fluidVariants}
                  className="text-6xl md:text-8xl font-serif leading-none"
                >
                  HoReCa <span className="italic text-bali-gold">&</span> Projects
                </motion.h2>
              </div>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="text-lg opacity-50 max-w-sm text-right"
              >
                Создаем уникальные интерьеры для отелей, ресторанов и частных резиденций по всему миру.
              </motion.p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                { title: 'Рестораны', desc: 'Атмосферная мебель для залов и террас', icon: <Coffee className="w-8 h-8" /> },
                { title: 'Отели', desc: 'Комплексное оснащение номеров и лобби', icon: <Hotel className="w-8 h-8" /> },
                { title: 'Дизайн-бюро', desc: 'Индивидуальные проекты под ключ', icon: <Palmtree className="w-8 h-8" /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fluidVariants}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="group p-16 border border-white/5 hover:border-bali-gold/30 transition-all duration-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 group-hover:text-bali-gold transition-all duration-700">
                    {item.icon}
                  </div>
                  <h3 className="text-4xl font-serif mb-6 group-hover:text-bali-gold transition-colors">{item.title}</h3>
                  <p className="text-sm opacity-40 group-hover:opacity-70 transition-opacity leading-relaxed mb-12">{item.desc}</p>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-bali-gold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

      {/* Footer - Grand Finale */}
      <footer className="bg-bali-ink text-white pt-48 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
          <motion.h2 
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[35vw] font-serif leading-none tracking-tighter whitespace-nowrap"
          >
            BALI STYLE
          </motion.h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 border border-bali-gold rounded-full flex items-center justify-center">
                  <span className="font-serif text-xl font-bold">B</span>
                </div>
                <span className="font-serif text-2xl font-bold tracking-tighter">Bali Style</span>
              </div>
              <p className="text-sm opacity-40 leading-relaxed mb-12">
                Мы верим, что дом — это святилище. Наша мебель помогает создать пространство, где время замедляется.
              </p>
              <div className="flex gap-6">
                {['Instagram', 'Pinterest', 'Facebook'].map(social => (
                  <a key={social} href="#" className="text-[10px] uppercase tracking-widest font-bold text-bali-gold hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-bali-gold font-bold mb-12">Навигация</h4>
              <ul className="flex flex-col gap-6">
                {['Каталог', 'О компании', 'HoReCa', 'Информация', 'Контакты'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-xl font-serif hover:text-bali-gold transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-bali-gold font-bold mb-12">Контакты</h4>
              <ul className="flex flex-col gap-8">
                <li>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Телефон</p>
                  <p className="text-2xl font-serif">8 (800) 123-45-67</p>
                </li>
                <li>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Email</p>
                  <p className="text-2xl font-serif">hello@bali-style.ru</p>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-bali-gold font-bold mb-12">Шоу-рум</h4>
              <p className="text-2xl font-serif mb-4">Екатеринбург</p>
              <p className="text-sm opacity-40 leading-relaxed">
                ул. Дизайнеров, 15<br />
                Пн-Пт: 10:00 — 20:00<br />
                Сб-Вс: 11:00 — 18:00
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">
            <p>© 2026 Bali Style. Все права защищены.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
