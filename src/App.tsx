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
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel.tsx';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion.tsx';

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

  // Apple-style mask reveal
  const maskScale = useTransform(heroScrollProgress, [0, 0.4], [0.85, 1]);
  const maskRadius = useTransform(heroScrollProgress, [0, 0.4], ["60px", "0px"]);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(heroScrollProgress, [0, 0.2], [0, -100]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);

  // Spring physics for Apple feel
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-bali-gold selection:text-black overflow-x-hidden bg-black">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <div className="hidden lg:block">
        <motion.div 
          className="custom-cursor"
          animate={{ 
            x: cursorPos.x - 10, 
            y: cursorPos.y - 10,
            scale: isHovering ? 4 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        />
        <motion.div 
          className="custom-cursor-dot"
          animate={{ x: cursorPos.x - 3, y: cursorPos.y - 3 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </div>

      {/* Navigation - Floating Dynamic Island Style */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center gap-8 px-8 py-4 rounded-full transition-all duration-700 ${
            isScrolled 
            ? 'apple-glass shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-fit' 
            : 'bg-transparent w-full max-w-7xl'
          }`}
        >
          <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-serif text-xl font-bold">B</div>
            {!isScrolled && <span className="font-sans font-bold tracking-tight text-xl text-white">Bali Style</span>}
          </div>
          
          <nav className={`hidden lg:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-white`}>
            {['Каталог', 'О компании', 'HoReCa', 'Информация'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-bali-gold transition-colors duration-300 drop-shadow-md" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 ml-auto text-white">
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-white/10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Standard Hero Paradigm (Taste Skill) */}
        <section ref={heroContainerRef} className="relative h-[250vh] bg-black">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div 
              style={{ 
                scale: maskScale,
                borderRadius: maskRadius
              }}
              className="relative w-full h-full overflow-hidden"
            >
              <motion.img 
                style={{ scale: heroImageScale }}
                src="https://picsum.photos/seed/bali-hero-apple/1920/1080" 
                alt="Bali Rattan Furniture" 
                className="w-full h-full object-cover brightness-[0.7]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </motion.div>

            <motion.div 
              style={{ opacity: heroTextOpacity, y: heroTextY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none"
            >
              <h1 className="text-display text-white mb-8">
                Вне времени.<br />
                <span className="text-apple-silver">Вне конкуренции.</span>
              </h1>
              <p className="text-subheading text-white/60 max-w-2xl mx-auto">
                Премиальная мебель из ротанга, созданная с уважением к природе и вниманием к каждой детали.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Categories - Motion-Engine Paradigm (Taste Skill) */}
        <section id="каталог" className="py-40 bg-black px-6">
          <div className="container mx-auto">
            <div className="mb-24 text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl font-bold tracking-tight mb-6 text-white"
              >
                Выберите свой стиль.
              </motion.h2>
              <p className="text-xl text-apple-silver font-medium">Четыре уникальные коллекции, вдохновленные природой Бали.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[1200px] md:h-[800px]">
              {/* Large Bento Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-8 bento-card group cursor-pointer bg-bali-warm"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img src={CATEGORIES[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent text-white">
                  <span className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Коллекция 2026</span>
                  <h3 className="text-5xl font-bold mb-4">{CATEGORIES[0].name}</h3>
                  <Button variant="outline" className="w-fit rounded-full border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500">Смотреть всё</Button>
                </div>
              </motion.div>

              {/* Small Bento Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-4 bento-card group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img src={CATEGORIES[1].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-3xl font-bold mb-2">{CATEGORIES[1].name}</h3>
                  <p className="text-sm opacity-60">Комфорт в каждом движении</p>
                </div>
              </motion.div>

              {/* Medium Bento Card 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-4 bento-card group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img src={CATEGORIES[2].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-3xl font-bold mb-2">{CATEGORIES[2].name}</h3>
                </div>
              </motion.div>

              {/* Medium Bento Card 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-8 bento-card group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img src={CATEGORIES[3].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-4xl font-bold mb-2">{CATEGORIES[3].name}</h3>
                  <p className="text-lg opacity-60">Для уютных вечеров в кругу близких</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Showcase - High Contrast Minimal */}
        <section className="py-40 bg-black">
          <div className="container mx-auto px-6 text-white">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
              <div className="max-w-xl">
                <h2 className="text-6xl font-bold tracking-tight mb-6">Лучшее от Bali Style.</h2>
                <p className="text-xl text-apple-silver font-medium">Предметы, которые меняют восприятие пространства.</p>
              </div>
              <Button variant="link" className="text-bali-gold font-bold text-lg group">
                Смотреть весь каталог <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {FEATURED_PRODUCTS.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative aspect-square mb-8 overflow-hidden rounded-3xl bg-bali-warm">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/80 backdrop-blur-md text-apple-black border-none rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {product.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-bali-gold transition-colors">{product.name}</h3>
                    <p className="text-apple-silver font-medium">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Apple-style Feature Section */}
        <section className="py-40 bg-black text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-7xl font-bold tracking-tighter mb-10 leading-[0.9]">
                  Мастерство,<br />
                  <span className="text-apple-silver">которое чувствуется.</span>
                </h2>
                <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-lg">
                  Мы используем только отборный ротанг высшего сорта. Каждое плетение — это результат многолетнего опыта индонезийских мастеров, передаваемого из поколения в поколение.
                </p>
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <p className="text-4xl font-bold mb-2">100%</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-40">Натурально</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-2">24/7</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-40">Комфорт</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square rounded-[3rem] overflow-hidden"
              >
                <img src="https://picsum.photos/seed/bali-craft/1000/1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-tr from-bali-gold/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Apple Style Minimal */}
      <footer className="bg-black text-white py-32 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-serif font-bold">B</div>
                <span className="font-bold tracking-tight text-xl">Bali Style</span>
              </div>
              <p className="text-sm text-apple-silver leading-relaxed">
                Создаем пространства для жизни, вдохновленные природой и традициями.
              </p>
            </div>
            {['Продукты', 'Компания', 'Поддержка', 'Контакты'].map((title, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-white">{title}</h4>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <li key={i}>
                      <a href="#" className="text-sm text-apple-silver hover:text-white transition-colors">Ссылка {i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-medium text-apple-silver">
            <p>© 2026 Bali Style Inc. Все права защищены.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Карта сайта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
