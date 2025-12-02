import { useRef, useState, useEffect } from 'react';
import { Scene } from '../types';

interface AestheticCarouselProps {
  scenes: Scene[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
}

export function AestheticCarousel({
  scenes,
  currentSceneId,
  onSceneChange
}: AestheticCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);

  // Center the selected slide on mount and when currentSceneId changes
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Calculate based on actual card dimensions from Figma
    // Cards are 105.546px wide (except card 8 which is 137.209px), gap is 15.832px
    let targetScroll = 0;
    for (let i = 0; i < currentIndex; i++) {
      targetScroll += (i === 7 ? 137.209 : 105.546) + 15.832;
    }
    
    const containerCenter = container.offsetWidth / 2;
    const currentCardWidth = currentIndex === 7 ? 137.209 : 105.546;
    targetScroll = targetScroll - containerCenter + (currentCardWidth / 2);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, [currentSceneId, currentIndex]);

  // Momentum scrolling
  useEffect(() => {
    if (!isDragging && Math.abs(velocity) > 0.5) {
      const interval = setInterval(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollLeft += velocity;
        setVelocity(velocity * 0.95); // Friction
        
        if (Math.abs(velocity) < 0.5) {
          clearInterval(interval);
        }
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isDragging, velocity]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setLastX(e.pageX);
    setLastTime(Date.now());
    setVelocity(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    // Calculate velocity for momentum
    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const dx = e.pageX - lastX;
      setVelocity(-(dx / dt) * 16);
    }
    setLastX(e.pageX);
    setLastTime(now);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSlideClick = (sceneId: string) => {
    if (!isDragging && sceneId !== currentSceneId) {
      onSceneChange(sceneId);
    }
  };

  return (
    <div className="fixed bottom-[40px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      {/* Carousel container matching Figma design */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-[18.999px] p-px">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-[15.832px] overflow-x-auto scrollbar-hide ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            height: '137.46px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1px'
          }}
        >
          {scenes.map((scene, index) => {
            const isActive = scene.id === currentSceneId;
            
            // Special case for 8th item (index 7) - wider format
            const isWideFormat = index === 7;
            
            return (
              <div
                key={scene.id}
                onClick={() => handleSlideClick(scene.id)}
                className="flex-shrink-0 transition-all duration-300"
              >
                <div
                  className={`relative rounded-[10.555px] overflow-hidden ${
                    isWideFormat ? 'w-[137.209px] h-[105.546px]' : 'w-[105.546px] h-[105.546px]'
                  } ${
                    isActive ? 'ring-[3.373px] ring-[#c27aff]' : ''
                  }`}
                >
                  <img
                    src={scene.thumbnail}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
