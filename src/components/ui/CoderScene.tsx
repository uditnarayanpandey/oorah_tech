import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import './CoderScene.css';

/* ─── Animated code line (typing effect on loop) ─── */
const CodeLine = ({
  x,
  y,
  width,
  color,
  delay,
}: {
  x: number;
  y: number;
  width: number;
  color: string;
  delay: number;
}) => (
  <motion.rect
    x={x}
    y={y}
    width={width}
    height={5}
    rx={2.5}
    fill={color}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: [0, 1, 1, 0] }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
      times: [0, 0.3, 0.85, 1],
    }}
    style={{ transformOrigin: `${x}px ${y}px` }}
  />
);

/* ─── Floating symbol chip ─── */
const FloatingChip = ({
  x,
  y,
  text,
  delay,
}: {
  x: number;
  y: number;
  text: string;
  delay: number;
}) => (
  <motion.g
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  >
    <rect
      x={x}
      y={y}
      width={52}
      height={26}
      rx={8}
      fill="rgba(255,255,255,0.12)"
    />
    <text
      x={x + 26}
      y={y + 17}
      textAnchor="middle"
      fontSize={11}
      fontFamily="monospace"
      fill="rgba(255,255,255,0.7)"
    >
      {text}
    </text>
  </motion.g>
);

/* ─── Blinking cursor ─── */
const Cursor = ({ x, y }: { x: number; y: number }) => (
  <motion.rect
    x={x}
    y={y}
    width={2}
    height={9}
    rx={1}
    fill="#C8D9E6"
    animate={{ opacity: [1, 1, 0, 0] }}
    transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
  />
);

/* ─── Main component ─── */
const CoderScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  /* Raw mouse values (-1 … 1 relative to container) */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Smoothed via spring */
  const mx = useSpring(rawX, { stiffness: 40, damping: 18 });
  const my = useSpring(rawY, { stiffness: 40, damping: 18 });

  /* Three depth layers */
  const bgX = useTransform(mx, [-1, 1], [-10, 10]);
  const bgY = useTransform(my, [-1, 1], [-6, 6]);

  const midX = useTransform(mx, [-1, 1], [-20, 20]);
  const midY = useTransform(my, [-1, 1], [-12, 12]);

  const fgX = useTransform(mx, [-1, 1], [-32, 32]);
  const fgY = useTransform(my, [-1, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);

    setIsIdle(false);
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setIsIdle(true), 3000);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setIsIdle(true), 3000);
  };

  useEffect(() => {
    idleRef.current = setTimeout(() => setIsIdle(true), 3000);
    return () => {
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="coder-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        viewBox="0 0 400 340"
        xmlns="http://www.w3.org/2000/svg"
        className="coder-svg"
        aria-hidden
      >
        {/* ── Layer 1 · Background dots (moves least) ── */}
        <motion.g style={{ x: bgX, y: bgY }}>
          {[
            [30, 30],
            [370, 50],
            [20, 200],
            [380, 270],
            [60, 310],
            [340, 20],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={4}
              fill="rgba(255,255,255,0.18)"
              animate={{ opacity: [0.18, 0.5, 0.18] }}
              transition={{
                duration: 2 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          {/* Large soft glow circle */}
          <circle cx={200} cy={160} r={130} fill="rgba(86,124,141,0.08)" />
        </motion.g>

        {/* ── Layer 2 · Floating chips (mid speed) ── */}
        <motion.g style={{ x: midX, y: midY }}>
          <FloatingChip x={18} y={60} text="{ }" delay={0} />
          <FloatingChip x={330} y={40} text="</>" delay={0.6} />
          <FloatingChip x={10} y={240} text="=>" delay={1.1} />
          <FloatingChip x={336} y={230} text="[ ]" delay={0.3} />
          <FloatingChip x={170} y={10} text="/**" delay={0.8} />
        </motion.g>

        {/* ── Layer 3 · Main illustration (moves most) ── */}
        <motion.g style={{ x: fgX, y: fgY }}>
          {/* Desk surface */}
          <rect
            x={55}
            y={205}
            width={290}
            height={10}
            rx={5}
            fill="rgba(255,255,255,0.22)"
          />

          {/* Monitor body */}
          <rect
            x={110}
            y={45}
            width={180}
            height={135}
            rx={10}
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.5}
          />

          {/* Screen */}
          <rect x={120} y={54} width={160} height={108} rx={5} fill="#0d1117" />

          {/* Monitor stand */}
          <rect
            x={190}
            y={180}
            width={20}
            height={26}
            rx={3}
            fill="rgba(255,255,255,0.15)"
          />
          {/* Monitor base */}
          <rect
            x={163}
            y={204}
            width={74}
            height={7}
            rx={3.5}
            fill="rgba(255,255,255,0.2)"
          />

          {/* ── Code on screen ── */}
          {/* Line 1 — keyword */}
          <CodeLine x={130} y={67} width={45} color="#567C8D" delay={0} />
          <CodeLine x={180} y={67} width={32} color="#C8D9E6" delay={0.15} />
          <CodeLine x={217} y={67} width={18} color="#567C8D" delay={0.25} />
          {/* Line 2 */}
          <CodeLine x={138} y={79} width={55} color="#C8D9E6" delay={0.5} />
          <CodeLine x={198} y={79} width={30} color="#415A77" delay={0.65} />
          {/* Line 3 */}
          <CodeLine x={146} y={91} width={70} color="#567C8D" delay={1.0} />
          {/* Line 4 */}
          <CodeLine x={138} y={103} width={40} color="#C8D9E6" delay={1.4} />
          <CodeLine x={183} y={103} width={52} color="#415A77" delay={1.55} />
          {/* Line 5 */}
          <CodeLine x={130} y={115} width={62} color="#567C8D" delay={1.9} />
          {/* Line 6 */}
          <CodeLine x={138} y={127} width={35} color="#C8D9E6" delay={2.2} />
          <CodeLine x={178} y={127} width={48} color="#415A77" delay={2.35} />
          {/* Line 7 */}
          <CodeLine x={130} y={139} width={28} color="#567C8D" delay={2.7} />

          {/* Blinking cursor */}
          <Cursor x={161} y={138} />

          {/* Keyboard */}
          <rect
            x={147}
            y={192}
            width={106}
            height={14}
            rx={4}
            fill="rgba(255,255,255,0.18)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
          />
          {/* Key row hints */}
          {[153, 165, 177, 189, 201, 213, 225, 237].map((kx, i) => (
            <rect
              key={i}
              x={kx}
              y={196}
              width={8}
              height={5}
              rx={1.5}
              fill="rgba(255,255,255,0.25)"
            />
          ))}

          {/* Person — head */}
          <circle cx={200} cy={252} r={22} fill="#C8D9E6" />
          {/* Face dots (eyes) */}
          <circle cx={193} cy={249} r={2.5} fill="#2F4156" />
          <circle cx={207} cy={249} r={2.5} fill="#2F4156" />
          {/* Focused expression — straight mouth */}
          <rect
            x={194}
            y={257}
            width={12}
            height={2}
            rx={1}
            fill="#2F4156"
            opacity={0.6}
          />

          {/* Body */}
          <rect x={172} y={272} width={56} height={52} rx={10} fill="#2F4156" />

          {/* Left arm — reaches toward keyboard */}
          <motion.rect
            x={148}
            y={276}
            width={26}
            height={11}
            rx={5.5}
            fill="#2F4156"
            animate={{ rotate: [0, -3, 0, 3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '172px 281px' }}
          />
          {/* Right arm */}
          <motion.rect
            x={226}
            y={276}
            width={26}
            height={11}
            rx={5.5}
            fill="#2F4156"
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            style={{ transformOrigin: '226px 281px' }}
          />

          {/* Chair back */}
          <rect
            x={166}
            y={320}
            width={68}
            height={8}
            rx={4}
            fill="rgba(255,255,255,0.15)"
          />
        </motion.g>

        {/* ── Thought bubble — appears when idle ── */}
        <AnimatePresence>
          {isIdle && (
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Bubble dots leading up */}
              <motion.circle
                cx={222}
                cy={225}
                r={3}
                fill="rgba(255,255,255,0.5)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.circle
                cx={232}
                cy={215}
                r={4.5}
                fill="rgba(255,255,255,0.5)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.15 }}
              />
              {/* Main bubble */}
              <rect
                x={238}
                y={175}
                width={82}
                height={40}
                rx={14}
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1.5}
              />
              {/* Thinking dots */}
              {[258, 279, 300].map((dotX, i) => (
                <motion.circle
                  key={i}
                  cx={dotX}
                  cy={195}
                  r={4.5}
                  fill="rgba(255,255,255,0.75)"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default CoderScene;
