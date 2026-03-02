import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-brand-hero pt-40 flex flex-col lg:flex-row overflow-hidden">
      {/* Left side: AI Developer (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-start lg:pt-32 px-6 lg:pl-[60px] lg:pr-10 py-12 lg:py-0 text-center lg:text-left z-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-brand-black lowercase mb-3 leading-tight tracking-tight">
          ai developer
        </h1>
        <p className="text-sm lg:text-base text-brand-textSecondary leading-relaxed max-w-sm mx-auto lg:mx-0 opacity-80 mb-8">
          AI Developer building high-performance web applications with intelligent automation. Delivering production-ready solutions that combine speed, quality, and cutting-edge AI integration.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Link
            to="/lab"
            className="group relative inline-flex items-center px-8 py-3.5 bg-brand-black text-white text-sm font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span className="relative z-10">Let's talk</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-textTertiary to-brand-black opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Center: Portrait (20%) */}
      <div className="w-full lg:w-[20%] relative flex items-center justify-center lg:items-end h-[350px] lg:h-auto z-20">
        <div className="relative w-[280px] lg:w-[400px] lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 pointer-events-none">
          {/* Main Portrait */}
          <img
            src="/hero-portrait.jpg"
            alt="Portrait of Builder"
            className="w-full object-cover"
            style={{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)' }}
          />

        </div>
      </div>

      {/* Right side: Builder (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-start lg:pt-32 px-6 lg:pr-[60px] lg:pl-10 py-12 lg:py-0 text-center lg:text-right relative z-10">
        <h1 className="text-4xl lg:text-5xl font-mono text-brand-black mb-3 leading-tight tracking-tight">
          &lt;builder&gt;
        </h1>
        <p className="text-sm lg:text-base text-brand-textSecondary leading-relaxed max-w-sm mx-auto lg:ml-auto lg:mr-0 relative z-10 opacity-80">
          Full-stack developer who ships fast without compromising quality. Next.js, TypeScript, Python, serverless architecture. Clean code, optimized performance, measurable results.
        </p>

        {/* Faded Code Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end select-none pr-10 lg:pr-20 opacity-30">
          <div className="font-mono text-[12px] text-brand-codeGray text-left transform translate-x-10 translate-y-10">
            <div className="mb-1">&lt;html&gt;</div>
            <div className="ml-4 mb-1">height: 184px;</div>
            <div className="ml-4 mb-1">class='jedi'</div>
            <div className="ml-4 mb-1">S3 HTML5</div>
            <div className="ml-4 mb-1">color: #000;</div>
            <div className="ml-4 mb-1">jQuery</div>
          </div>
        </div>
      </div>

      {/* Decorative extension of image boundaries */}
      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[40px] bg-gradient-to-t from-brand-hero to-transparent z-40" />
    </section>
  );
};

export default Hero;
