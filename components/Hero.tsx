import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Grain ────────────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Dot Grid ─────────────────────────────────────────────────────────────────
function BackgroundGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;

    function draw() {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);
      const GAP = 32;
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.hypot(cx, cy);
      for (let y = 0; y <= H; y += GAP) {
        for (let x = 0; x <= W; x += GAP) {
          const d = Math.hypot(x - cx, y - cy);
          const t = d / maxR;
          const a = 0.016 + t * 0.055;
          ctx.beginPath();
          ctx.arc(x, y, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fill();
        }
      }
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// ─── Canvas Name Block ────────────────────────────────────────────────────────
// Renders JOSH + SEGATT with premium canvas effects:
// - JOSH: warm-white gradient fill + layered shadows (glow + depth)
// - SEGATT: transparent, gradient stroke (top-bright → bottom-faded)
// - DPR-aware (crisp on retina/4K)
function NameBlock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    if (!W || !H) return;

    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // ── Dynamic font sizing: fit SEGATT (wider word) to 80% of canvas ─────
    let fz = W * 0.17;
    ctx.font = `900 ${fz}px "Outfit", sans-serif`;
    if ('letterSpacing' in ctx) (ctx as any).letterSpacing = `${-fz * 0.035}px`;
    const testW = ctx.measureText('SEGATT').width;
    if (testW > W * 0.80) {
      fz = fz * ((W * 0.80) / testW);
    }

    ctx.font = `900 ${fz}px "Outfit", sans-serif`;
    if ('letterSpacing' in ctx) (ctx as any).letterSpacing = `${-fz * 0.038}px`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    const cx  = W / 2;
    const lineHeight = fz * 0.94;
    // Center the 2-line block vertically
    const blockH    = lineHeight * 2 + fz * 0.06;
    const startY    = (H - blockH) / 2 + lineHeight;
    const joshY     = startY;
    const segY      = startY + lineHeight + fz * 0.06;

    // ────────────────────────────────────────────────────────────────────
    // JOSH — warm white gradient fill, two-pass shadow
    // ────────────────────────────────────────────────────────────────────

    // Gradient: pure white top → warm ivory bottom (adds subtle luxury)
    const makeJoshGrad = () => {
      const g = ctx.createLinearGradient(0, joshY - fz, 0, joshY + 6);
      g.addColorStop(0.00, '#FFFFFF');
      g.addColorStop(0.45, '#F9F7F2');
      g.addColorStop(1.00, '#EDE9DF');
      return g;
    };

    // Pass A: white ambient glow
    ctx.save();
    ctx.shadowColor  = 'rgba(255,255,255,0.13)';
    ctx.shadowBlur   = 60;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = makeJoshGrad();
    ctx.fillText('JOSH', cx, joshY);
    ctx.restore();

    // Pass B: deep dark shadow for dimension
    ctx.save();
    ctx.shadowColor   = 'rgba(0,0,0,0.70)';
    ctx.shadowBlur    = 22;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 14;
    ctx.fillStyle = makeJoshGrad();
    ctx.fillText('JOSH', cx, joshY);
    ctx.restore();

    // Pass C: secondary mid shadow
    ctx.save();
    ctx.shadowColor   = 'rgba(0,0,0,0.30)';
    ctx.shadowBlur    = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 28;
    ctx.fillStyle = makeJoshGrad();
    ctx.fillText('JOSH', cx, joshY);
    ctx.restore();

    // ────────────────────────────────────────────────────────────────────
    // SEGATT — gradient stroke, no fill
    // Gradient: bright at top-left, fades to near-transparent at baseline
    // ────────────────────────────────────────────────────────────────────
    ctx.save();

    const segGrad = ctx.createLinearGradient(0, segY - fz, 0, segY + 4);
    segGrad.addColorStop(0.00, 'rgba(255,255,255,0.60)');
    segGrad.addColorStop(0.40, 'rgba(255,255,255,0.38)');
    segGrad.addColorStop(0.75, 'rgba(255,255,255,0.20)');
    segGrad.addColorStop(1.00, 'rgba(255,255,255,0.08)');

    ctx.strokeStyle = segGrad;
    ctx.lineWidth   = 1.15;
    ctx.strokeText('SEGATT', cx, segY);

    // Subtle glow on stroke
    ctx.shadowColor   = 'rgba(255,255,255,0.06)';
    ctx.shadowBlur    = 18;
    ctx.strokeText('SEGATT', cx, segY);
    ctx.restore();

  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    document.fonts.ready.then(render);
    const ro = new ResizeObserver(render);
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        // Height = ~2× the font size rows + padding
        aspectRatio: '820 / 260',
        userSelect: 'none',
      }}
      aria-label="Josh Segatt"
    />
  );
}

// ─── Amber rule with draw-in animation ───────────────────────────────────────
function AmberRule() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,193,7,0.6) 50%, transparent 100%)',
          transformOrigin: '0% 50%',
        }}
      />
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticBtn({
  children,
  onClick,
  primary = false,
  id,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useSpring(0, { stiffness: 220, damping: 22 });
  const my = useSpring(0, { stiffness: 220, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.28);
    my.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      id={id}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: mx, y: my }}
      whileTap={{ scale: 0.96 }}
      className={`relative group overflow-hidden flex items-center gap-2 rounded-full font-semibold transition-colors
        ${primary
          ? 'px-8 py-[13px] text-[13px] text-black'
          : 'px-8 py-[13px] text-[13px]'
        }`}
    >
      {primary ? (
        <>
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FFD54F, #FFC107)',
              boxShadow:
                '0 0 0 1px rgba(255,193,7,0.4), 0 8px 28px rgba(255,193,7,0.28)',
            }}
          />
          <span className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/28 to-transparent" />
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
      ) : (
        <>
          <span
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.09)' }}
          />
          <span
            className="relative z-10 flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            {children}
          </span>
        </>
      )}
    </motion.button>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes availPulse {
          0%, 100% { opacity: 1; }
          50%  { opacity: 0.38; }
        }
      `}</style>

      <section
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: 'calc(100vh - 80px)', padding: '3rem 2rem' }}
      >
        {/* ── Backgrounds ──────────────────────────────────────── */}
        <BackgroundGrid />

        {/* Vignette — darkens edges, leaves centre clear */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 62% 62% at 50% 50%, transparent 18%, rgba(5,5,5,0.68) 100%)',
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage: GRAIN,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            opacity: 0.022,
          }}
        />

        {/* ── Content ──────────────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-center text-center"
          style={{ zIndex: 10, width: '100%', maxWidth: '860px', gap: '0' }}
        >
          {/* Canvas name */}
          <motion.div variants={FADE_IN} style={{ width: '100%' }}>
            <NameBlock />
          </motion.div>

          {/* Amber rule */}
          <motion.div
            variants={FADE_IN}
            style={{ width: '100%', marginTop: '28px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
          >
            <AmberRule />
          </motion.div>

          {/* Role tag */}
          <motion.p
            variants={FADE_UP}
            style={{
              fontFamily: '"Roboto Mono", monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.42em',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: '18px',
            }}
          >
            Senior Tech Architect · Builder · Porto
          </motion.p>

          {/* Description */}
          <motion.p
            variants={FADE_UP}
            style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: '43ch',
              color: 'rgba(255,255,255,0.33)',
              marginBottom: '36px',
            }}
          >
            From concept to production —{' '}
            <span style={{ color: 'rgba(255,255,255,0.70)' }}>
              engineering and design as one relentless practice.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP}
            className="flex items-center gap-3 flex-wrap justify-center"
          >
            <MagneticBtn
              id="hero-cta-primary"
              primary
              onClick={() => navigate('/contact')}
            >
              Start a Project <ArrowRight size={14} />
            </MagneticBtn>
            <MagneticBtn
              id="hero-cta-secondary"
              onClick={() => navigate('/lab')}
            >
              View Work <ExternalLink size={13} />
            </MagneticBtn>
          </motion.div>

          {/* Availability */}
          <motion.div
            variants={FADE_IN}
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px rgba(74,222,128,0.65)',
                flexShrink: 0,
                animation: 'availPulse 2.2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: '"Roboto Mono", monospace',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                color: 'rgba(255,255,255,0.22)',
              }}
            >
              Available for Projects
            </span>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
