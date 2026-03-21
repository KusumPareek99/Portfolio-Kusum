"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Epilogue:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const T = {
  bg:"#040407",s1:"#08080F",s2:"#0D0D1A",s3:"#121224",
  border:"#18183A",borderB:"#282855",
  violet:"#8B5CF6",cyan:"#22D3EE",amber:"#F59E0B",
  emerald:"#10B981",rose:"#F43F5E",pink:"#EC4899",sky:"#38BDF8",
  t1:"#F0F0FF",t2:"#8888B0",t3:"#3A3A60",
};

const PROJECTS = [
  { id:"reelx",       title:"ReelX",             subtitle:"AI Movie Recommendation Engine",
    description:"Flask-based recommendation system using cosine similarity on TF-IDF vectors. Integrated TMDB API for real-time metadata across 5,000+ titles with sub-100ms API responses.",
    year:"2025", tags:["Flask","Python","scikit-learn","React.js","TMDB API","Tailwind CSS"],
    github:"https://github.com/KusumPareek99", demo:null as string|null,
    category:"AI / ML",    featured:true,  accent:T.violet,  secondAccent:"#A78BFA",
    emoji:"🎬", stat:{value:"5K+",label:"Movies"}, bgPattern:"film",
    bgGrad:"linear-gradient(135deg, #1a0a2e 0%, #0d1628 60%, #030812 100%)" },
  { id:"shopbazaar",  title:"ShopBazaar",         subtitle:"Full-Stack E-Commerce Platform",
    description:"Complete commerce solution with multi-filter product search, JWT auth, Braintree payment gateway, and an admin dashboard for inventory and order management.",
    year:"2024", tags:["Node.js","Express.js","MongoDB","React.js","JWT","Braintree"],
    github:"https://github.com/KusumPareek99", demo:"https://shopbazaar-app.onrender.com/" as string|null,
    category:"Full Stack", featured:true,  accent:T.emerald, secondAccent:"#34D399",
    emoji:"🛍", stat:{value:"Live",label:"Deploy"}, bgPattern:"grid",
    bgGrad:"linear-gradient(135deg, #051a0d 0%, #031409 60%, #010806 100%)" },
  { id:"basketboost", title:"Basket Boost",        subtitle:"Market Basket Analysis",
    description:"Apriori association-rule mining on retail transactions. Surfaces high-confidence product bundles and renders lift/confidence matrices with interactive charts.",
    year:"2024", tags:["Python","Pandas","Mlxtend","React.js","Chart.js"],
    github:"https://github.com/KusumPareek99/basket-boost-website", demo:null as string|null,
    category:"Data Science",featured:false, accent:T.amber,   secondAccent:"#FBBF24",
    emoji:"📊", stat:{value:"Apriori",label:"ML"}, bgPattern:"dots",
    bgGrad:"linear-gradient(135deg, #1a1000 0%, #100b00 60%, #060400 100%)" },
  { id:"forecastpro", title:"Forecast Pro",         subtitle:"Real-Time Weather App",
    description:"Live weather via OpenWeather API, animated condition-aware backgrounds, 7-day forecasts, hourly breakdowns and geolocation auto-detection.",
    year:"2024", tags:["React.js","OpenWeather API","CSS Animations","Geolocation"],
    github:"https://github.com/KusumPareek99", demo:null as string|null,
    category:"Frontend",    featured:false, accent:T.sky,     secondAccent:"#7DD3FC",
    emoji:"⛅", stat:{value:"Live",label:"Weather"}, bgPattern:"waves",
    bgGrad:"linear-gradient(135deg, #001e2c 0%, #00131e 60%, #00080f 100%)" },
  { id:"intellicraft", title:"IntelliCraft",         subtitle:"GPT-3 Content Generator",
    description:"AI-powered copywriting app leveraging GPT-3 for blog drafts, creative briefs and ad copy, with prompt-engineering templates and output history.",
    year:"2023", tags:["React.js","GPT-3","OpenAI API","Node.js","Express.js"],
    github:"https://github.com/KusumPareek99", demo:null as string|null,
    category:"AI / ML",    featured:false, accent:T.pink,    secondAccent:"#F472B6",
    emoji:"🤖", stat:{value:"GPT-3",label:"Powered"}, bgPattern:"neural",
    bgGrad:"linear-gradient(135deg, #1e0014 0%, #14000d 60%, #080005 100%)" },
  { id:"traplaca",    title:"TraPlaCa",             subtitle:"Training, Placement & Career Hub",
    description:"Student platform centralising campus training, placement-prep resources, mock-interview scheduling and career pathway visualisation.",
    year:"2023", tags:["React.js","Node.js","MongoDB","Express.js","Bootstrap"],
    github:"https://github.com/KusumPareek99/trapalaca-final", demo:null as string|null,
    category:"Full Stack", featured:false, accent:"#A78BFA",  secondAccent:"#C4B5FD",
    emoji:"🎓", stat:{value:"Portal",label:"Students"}, bgPattern:"grid",
    bgGrad:"linear-gradient(135deg, #10062e 0%, #08031e 60%, #030010 100%)" },
  { id:"stackoverflow",title:"StackOverflow Clone",  subtitle:"Q&A Platform with Innovations",
    description:"Full-stack clone with real-time Q&A, upvote/downvote mechanics, tag-based search, markdown rendering and a reputation scoring system.",
    year:"2023", tags:["React.js","Node.js","MongoDB","Redux","JWT"],
    github:"https://github.com/KusumPareek99/StackOverflow-Clone", demo:null as string|null,
    category:"Full Stack", featured:false, accent:T.rose,    secondAccent:"#FB7185",
    emoji:"💬", stat:{value:"Clone+",label:"Innovated"}, bgPattern:"dots",
    bgGrad:"linear-gradient(135deg, #200206 0%, #140102 60%, #080001 100%)" },
  { id:"befit",       title:"BeFit",                subtitle:"Android Fitness Tracker",
    description:"Native Android app for logging workouts, setting personal goals, tracking progress over time with MPAndroidChart visualisations and local SQLite persistence.",
    year:"2022", tags:["Android","Java","SQLite","MPAndroidChart","XML"],
    github:"https://github.com/KusumPareek99/be-fit-app", demo:null as string|null,
    category:"Mobile",     featured:false, accent:T.emerald, secondAccent:"#6EE7B7",
    emoji:"💪", stat:{value:"Native",label:"Android"}, bgPattern:"waves",
    bgGrad:"linear-gradient(135deg, #021a0d 0%, #011008 60%, #000804 100%)" },
];

const CATEGORIES = ["All", "Full Stack", "AI / ML", "Frontend", "Data Science", "Mobile"];

type Project = typeof PROJECTS[number];

function BgPattern({ type, accent }: { type: string; accent: string }) {
  const id = `${type}-${accent.replace("#","")}-pat`;
  if (type === "grid") return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.25}} xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0L0 0L0 28" fill="none" stroke={accent} strokeWidth="0.5"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
  );
  if (type === "dots") return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.35}} xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={accent} opacity="0.7"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${id})`}/>
    </svg>
  );
  if (type === "waves") return (
    <svg viewBox="0 0 300 100" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.18}} xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3].map(i => <path key={i} d={`M0 ${25+i*18} Q75 ${12+i*18} 150 ${25+i*18} Q225 ${38+i*18} 300 ${25+i*18}`} fill="none" stroke={accent} strokeWidth="1.5" opacity={0.8 - i*0.15}/>)}
    </svg>
  );
  if (type === "neural") return (
    <svg viewBox="0 0 300 140" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.22}} xmlns="http://www.w3.org/2000/svg">
      {([[20,20],[20,70],[20,120],[110,10],[110,45],[110,80],[110,115],[200,35],[200,105],[280,70]] as [number,number][]).map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="4.5" fill={accent} opacity="0.8"/>
      ))}
      {([[20,20,110,10],[20,20,110,45],[20,70,110,45],[20,70,110,80],[20,120,110,80],[20,120,110,115],
        [110,10,200,35],[110,45,200,35],[110,80,200,105],[110,115,200,105],[200,35,280,70],[200,105,280,70]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="0.8" opacity="0.45"/>
      ))}
    </svg>
  );
  if (type === "film") return (
    <svg viewBox="0 0 300 140" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.18}} xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="10" width="298" height="120" rx="5" fill="none" stroke={accent} strokeWidth="1.2"/>
      {[10,24,38,248,262,276].map((x,i)=><rect key={i} x={x} y="18" width="8" height="104" rx="2" fill={accent} opacity="0.5"/>)}
      {[58,90,122,154,186].map((x,i)=><rect key={i} x={x} y="38" width="26" height="64" rx="3" fill={accent} opacity="0.2"/>)}
    </svg>
  );
  return null;
}

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 26 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]),  { stiffness: 220, damping: 26 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); setHov(false); }, [rawX, rawY]);

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={onLeave}
      style={{ ...style, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 900 }}>
      {children}
    </motion.div>
  );
}

function Tag({ label, accent }: { label: string; accent: string }) {
  return (
    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:500,
      color:accent, background:accent+"14", border:`1px solid ${accent}33`,
      borderRadius:6, padding:"3px 9px", display:"inline-block", whiteSpace:"nowrap" }}>{label}</span>
  );
}

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const GlobeIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

function IconLink({ href, icon, label, accent }: { href: string|null; icon: React.ReactNode; label: string; accent: string }) {
  const disabled = !href;
  return (
    <motion.a
      href={href ?? undefined}
      target="_blank" rel="noopener noreferrer"
      whileHover={!disabled ? { y: -2, color: accent } : {}}
      onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined}
      style={{
        display:"inline-flex", alignItems:"center", gap:5,
        fontFamily:"'JetBrains Mono',monospace", fontSize:11,
        color: disabled ? T.t3 : T.t2,
        textDecoration:"none", cursor: disabled ? "not-allowed" : "pointer",
        transition:"color 0.2s", userSelect:"none",
      }}
    >
      {icon}
      <span style={{ opacity: disabled ? 0.45 : 1 }}>{label}</span>
      {!disabled && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      )}
    </motion.a>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [hov, setHov] = useState(false);
  const { ref, inView } = useInView(0.15);

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:index*0.12, type:"spring", stiffness:90, damping:20 }}>
      <TiltCard style={{ borderRadius:22, display:"block" } as React.CSSProperties}>
        <motion.article onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
          className="featured-card-inner"
          style={{
            display:"grid", gridTemplateColumns:"1fr 1fr",
            background:T.s1, border:`1px solid ${hov ? project.accent+"55" : T.border}`,
            borderRadius:22, overflow:"hidden",
            boxShadow: hov ? `0 32px 80px ${project.accent}1E, 0 0 0 1px ${project.accent}30` : "0 4px 32px rgba(0,0,0,0.5)",
            transition:"border-color 0.3s, box-shadow 0.3s",
          }}>
          <div style={{ position:"relative", overflow:"hidden", minHeight:300, background:project.bgGrad }}>
            <BgPattern type={project.bgPattern} accent={project.accent}/>
            <motion.div animate={hov ? { scale:1.15, rotate:-6, y:-8 } : { scale:1, rotate:0, y:0 }}
              transition={{ type:"spring", stiffness:200, damping:20 }}
              style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:88, userSelect:"none" }}>
              {project.emoji}
            </motion.div>
            <div style={{ position:"absolute", top:16, left:16, fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.14em",
              color:project.accent, background:project.accent+"1A", border:`1px solid ${project.accent}44`, borderRadius:999, padding:"4px 12px" }}>
              {project.category}
            </div>
            <div style={{ position:"absolute", bottom:16, right:16, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:project.accent+"99" }}>{project.year}</div>
            <div style={{ position:"absolute", bottom:16, left:16, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:project.accent,
              background:T.bg+"CC", border:`1px solid ${project.accent}33`, borderRadius:8, padding:"3px 10px", backdropFilter:"blur(8px)" }}>
              {project.stat.value} · {project.stat.label}
            </div>
            <motion.div animate={{ opacity: hov ? 1 : 0 }} style={{ position:"absolute", inset:0,
              background:`radial-gradient(ellipse at 50% 110%, ${project.accent}22, transparent 65%)`, pointerEvents:"none" }}/>
          </div>

          <div style={{ padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:20 }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em",
                color:project.accent, background:project.accent+"12", border:`1px solid ${project.accent}33`, borderRadius:999, padding:"4px 10px", marginBottom:16 }}>
                <span style={{fontSize:8}}>★</span> FEATURED PROJECT
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:T.t1, margin:"0 0 4px", lineHeight:1.08 }}>{project.title}</h3>
              <p style={{ fontFamily:"'Epilogue',sans-serif", fontSize:12, color:project.accent, margin:"0 0 14px", fontWeight:500 }}>{project.subtitle}</p>
              <p style={{ fontFamily:"'Epilogue',sans-serif", fontSize:13.5, color:T.t2, lineHeight:1.75, margin:"0 0 20px" }}>{project.description}</p>
            </div>
            <div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
                {project.tags.map(t => <Tag key={t} label={t} accent={project.accent}/>)}
              </div>
              <div style={{ height:1, background:T.border, marginBottom:16 }}/>
              <div style={{ display:"flex", gap:22, alignItems:"center" }}>
                <IconLink href={project.github} icon={<GithubIcon/>} label="Source Code" accent={project.accent}/>
                <IconLink href={project.demo}   icon={<GlobeIcon/>}  label={project.demo ? "Live Demo" : "No Demo"} accent={project.accent}/>
              </div>
            </div>
          </div>
        </motion.article>
      </TiltCard>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hov, setHov] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28, scale:0.95 }} animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ delay:index*0.06, type:"spring", stiffness:160, damping:22 }} style={{ height:"100%" }}>
      <TiltCard style={{ borderRadius:18, height:"100%" } as React.CSSProperties}>
        <motion.article onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
          animate={hov ? { y:-6 } : { y:0 }}
          transition={{ type:"spring", stiffness:280, damping:22 }}
          style={{
            background: hov ? T.s2 : T.s1, border:`1px solid ${hov ? project.accent+"50" : T.border}`,
            borderRadius:18, overflow:"hidden", height:"100%", display:"flex", flexDirection:"column",
            boxShadow: hov ? `0 20px 56px ${project.accent}18, 0 0 0 1px ${project.accent}28` : "0 4px 20px rgba(0,0,0,0.4)",
            transition:"background 0.25s, border-color 0.3s, box-shadow 0.3s",
          }}>
          <div style={{ height:160, position:"relative", overflow:"hidden", background:project.bgGrad, flexShrink:0 }}>
            <BgPattern type={project.bgPattern} accent={project.accent}/>
            <motion.div animate={hov ? { scale:1.2, y:-6, rotate:-4 } : { scale:1, y:0, rotate:0 }}
              transition={{ type:"spring", stiffness:240, damping:22 }}
              style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, userSelect:"none" }}>
              {project.emoji}
            </motion.div>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:64, background:`linear-gradient(to top, ${T.s1}, transparent)` }}/>
            <div style={{ position:"absolute", top:10, left:12, right:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.12em",
                color:project.accent, background:project.accent+"1A", border:`1px solid ${project.accent}33`, borderRadius:999, padding:"3px 9px" }}>{project.category}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:T.t3 }}>{project.year}</span>
            </div>
            <div style={{ position:"absolute", bottom:10, right:12, fontFamily:"'JetBrains Mono',monospace", fontSize:9,
              color:project.accent, background:T.bg+"CC", border:`1px solid ${project.accent}30`, borderRadius:7, padding:"2px 9px", backdropFilter:"blur(8px)" }}>
              {project.stat.value} · {project.stat.label}
            </div>
            <motion.div animate={{ opacity: hov ? 1 : 0 }} style={{ position:"absolute", inset:0,
              background:`radial-gradient(ellipse at 50% 110%, ${project.accent}20, transparent 65%)`, pointerEvents:"none" }}/>
          </div>

          <div style={{ padding:"18px 18px 20px", display:"flex", flexDirection:"column", flex:1 }}>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:17, color:T.t1, margin:"0 0 3px" }}>{project.title}</h3>
            <p style={{ fontFamily:"'Epilogue',sans-serif", fontSize:11, color:project.accent, margin:"0 0 10px", fontWeight:500 }}>{project.subtitle}</p>
            <p style={{ fontFamily:"'Epilogue',sans-serif", fontSize:12.5, color:T.t2, lineHeight:1.7, margin:"0 0 14px", flex:1 }}>{project.description}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
              {project.tags.slice(0,4).map(t => <Tag key={t} label={t} accent={project.accent}/>)}
              {project.tags.length > 4 && (
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:T.t3, border:`1px solid ${T.border}`, borderRadius:6, padding:"3px 8px" }}>+{project.tags.length-4}</span>
              )}
            </div>
            <motion.div animate={{ backgroundColor: hov ? project.accent+"40" : T.border }} style={{ height:1, marginBottom:12 }}/>
            <div style={{ display:"flex", gap:16 }}>
              <IconLink href={project.github} icon={<GithubIcon/>} label="Code" accent={project.accent}/>
              <IconLink href={project.demo}   icon={<GlobeIcon/>}  label="Demo" accent={project.accent}/>
            </div>
          </div>
        </motion.article>
      </TiltCard>
    </motion.div>
  );
}

function FilterBar({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
    return acc;
  }, {});

  return (
    <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
      {CATEGORIES.map(cat => {
        const on = active === cat;
        return (
          <motion.button key={cat} onClick={() => setActive(cat)} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
            style={{
              position:"relative", fontFamily:"'Epilogue',sans-serif", fontWeight:600, fontSize:13,
              color: on ? T.violet : T.t2,
              background: on ? T.violet+"12" : "transparent",
              border:`1px solid ${on ? T.violet+"55" : T.border}`,
              borderRadius:999, padding:"8px 16px",
              cursor:"pointer", transition:"color 0.2s, background 0.2s, border-color 0.2s",
              display:"flex", alignItems:"center", gap:7,
            }}>
            {on && (
              <motion.div layoutId="filter-indicator" style={{ position:"absolute", inset:0, borderRadius:999,
                background:T.violet+"0A", border:`1px solid ${T.violet}44` }}
                transition={{ type:"spring", stiffness:300, damping:30 }}/>
            )}
            <span style={{ position:"relative" }}>{cat}</span>
            <span style={{ position:"relative", fontFamily:"'JetBrains Mono',monospace", fontSize:9, lineHeight:1,
              background: on ? T.violet+"22" : T.border, color: on ? T.violet : T.t3, borderRadius:999, padding:"2px 7px", transition:"all 0.2s" }}>
              {counts[cat]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, ease:[0.25,0.4,0.25,1] }} style={{ marginBottom:48 }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8,
        fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:T.violet,
        background:T.violet+"0C", border:`1px solid ${T.violet}28`, borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
        <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ width:6, height:6, borderRadius:"50%", background:T.violet, display:"inline-block" }}/>
        {PROJECTS.length} PROJECTS · SELECTED WORK
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, margin:0,
          fontSize:"clamp(2rem,5vw,3.8rem)", lineHeight:1.05, color:T.t1 }}>
          Things I've{" "}
          <span style={{ background:`linear-gradient(135deg, ${T.violet}, ${T.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Shipped</span>
        </h2>
        <div style={{ display:"flex", gap:10 }}>
          {[
            { n:PROJECTS.length,                        l:"Projects"  },
            { n:PROJECTS.filter(p=>p.featured).length,  l:"Featured"  },
            { n:PROJECTS.filter(p=>p.demo).length,      l:"Live Apps" },
          ].map(s => (
            <div key={s.l} style={{ padding:"10px 16px", borderRadius:12, background:T.s1, border:`1px solid ${T.border}`, textAlign:"center" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20,
                background:`linear-gradient(135deg, ${T.violet}, ${T.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:T.t3, letterSpacing:"0.12em", textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  useFonts();
  const [filter, setFilter] = useState("All");
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  const filtered  = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const featured  = filtered.filter(p => p.featured);
  const regular   = filtered.filter(p => !p.featured);

  const dots = [
    { x:7,  y:10, c:T.violet,  d:5.5, dl:0   },
    { x:90, y:18, c:T.cyan,    d:4.8, dl:0.8  },
    { x:87, y:68, c:T.violet,  d:6.2, dl:1.4  },
    { x:5,  y:72, c:T.amber,   d:5.0, dl:0.5  },
    { x:50, y:4,  c:T.cyan,    d:5.8, dl:1.8  },
    { x:93, y:42, c:T.emerald, d:4.6, dl:1.1  },
  ];

  return (
    <section id="projects" style={{ background:T.bg, minHeight:"100vh", padding:"80px 16px 80px", position:"relative", overflow:"hidden" }}>
      <div style={{position:"absolute",top:"-6%",right:"-4%",width:"38%",height:"50%",background:`radial-gradient(ellipse,${T.violet}0B 0%,transparent 70%)`,borderRadius:"50%",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-6%",left:"-4%",width:"34%",height:"44%",background:`radial-gradient(ellipse,${T.cyan}07 0%,transparent 70%)`,borderRadius:"50%",pointerEvents:"none"}}/>
      {dots.map((d,i) => (
        <motion.div key={i} animate={{ y:[0,-20,0], opacity:[0.3,0.7,0.3] }}
          transition={{ duration:d.d, delay:d.dl, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", left:`${d.x}%`, top:`${d.y}%`, width:3, height:3, borderRadius:"50%", background:d.c, filter:"blur(0.5px)", pointerEvents:"none" }}/>
      ))}
      <motion.div initial={{ scaleX:0 }} animate={headerInView ? { scaleX:1 } : {}}
        transition={{ duration:1.4, ease:[0.25,0.4,0.25,1] }}
        style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1,
          background:`linear-gradient(90deg,transparent,${T.violet},${T.cyan},transparent)`, transformOrigin:"left" }}/>

      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div ref={headerRef}><SectionHeader inView={headerInView}/></div>
        <motion.div initial={{ opacity:0, y:16 }} animate={headerInView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.2, duration:0.5 }} style={{ marginBottom:36 }}>
          <FilterBar active={filter} setActive={setFilter}/>
        </motion.div>

        <AnimatePresence mode="wait">
          {featured.length > 0 && (
            <motion.div key={`f-${filter}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.22 }} style={{ marginBottom:36 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.22em", color:T.t3, textTransform:"uppercase",
                marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
                <span>Featured</span><div style={{ flex:1, height:1, background:T.border }}/>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {featured.map((p,i) => <FeaturedCard key={p.id} project={p} index={i}/>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={`r-${filter}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
            {regular.length > 0 && (
              <>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.22em", color:T.t3, textTransform:"uppercase",
                  marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
                  <span>All Projects</span><div style={{ flex:1, height:1, background:T.border }}/><span>{regular.length} items</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:16 }}>
                  {regular.map((p,i) => <ProjectCard key={p.id} project={p} index={i}/>)}
                </div>
              </>
            )}
            {filtered.length === 0 && (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                style={{ textAlign:"center", padding:"80px 20px", border:`1px dashed ${T.border}`, borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:14 }}>🔍</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:20, color:T.t1, marginBottom:8 }}>No projects in this category</div>
                <div style={{ fontFamily:"'Epilogue',sans-serif", fontSize:14, color:T.t2 }}>Try selecting a different filter above</div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        /* Featured card: stack image above content on mobile */
        @media (max-width: 740px) {
          .featured-card-inner {
            grid-template-columns: 1fr !important;
          }
          .featured-card-inner > div:first-child {
            min-height: 220px !important;
          }
        }
        @media (max-width: 480px) {
          .featured-card-inner > div:first-child {
            min-height: 180px !important;
          }
          .featured-card-inner > div:last-child {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
