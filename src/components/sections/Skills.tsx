"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Epilogue:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
    return () => { try { document.head.removeChild(l); } catch {} };
  }, []);
}

function useInView(threshold = 0.15) {
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

const C = {
  bg:"#030306", s1:"#09090F", s2:"#0F0F1A", s3:"#151528",
  border:"#1C1C34", borderB:"#2A2A4E",
  violet:"#8B5CF6", indigo:"#6366F1", cyan:"#22D3EE",
  emerald:"#10B981", amber:"#F59E0B", rose:"#F43F5E", sky:"#38BDF8",
  t1:"#EEEEFF", t2:"#8888B0", t3:"#40405E",
};

interface SkillItem { name: string; pct: number; color: string; tag: string; years: string; }
interface SkillCategory {
  label: string; accent: string; secondAccent: string;
  icon: React.ReactNode; description: string; items: SkillItem[];
}

const SKILLS: Record<string, SkillCategory> = {
  backend: {
    label: "Backend", accent: C.violet, secondAccent: C.indigo,
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="7" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M15 10h2"/></svg>),
    description: "Production APIs, microservices & cloud-native systems",
    items: [
      { name:"Node.js",    pct:92, color:"#68A063", tag:"Expert",     years:"3yr" },
      { name:"Express.js", pct:90, color:"#9F7AEA", tag:"Expert",     years:"3yr" },
      { name:"Python",     pct:88, color:"#4B8BBE", tag:"Expert",     years:"3yr" },
      { name:"Flask",      pct:82, color:"#22D3EE", tag:"Proficient", years:"2yr" },
      { name:"TypeScript", pct:80, color:"#3178C6", tag:"Proficient", years:"2yr" },
      { name:"JavaScript", pct:94, color:"#F7DF1E", tag:"Expert",     years:"4yr" },
      { name:"REST APIs",  pct:95, color:"#10B981", tag:"Expert",     years:"3yr" },
      { name:"Java",       pct:65, color:"#ED8B00", tag:"Familiar",   years:"1yr" },
    ],
  },
  frontend: {
    label: "Frontend", accent: C.cyan, secondAccent: C.sky,
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
    description: "Reactive UIs, component systems & responsive design",
    items: [
      { name:"React.js",   pct:86, color:"#61DAFB", tag:"Proficient", years:"2yr" },
      { name:"Next.js",    pct:78, color:"#AAAAFF", tag:"Proficient", years:"1yr" },
      { name:"TypeScript", pct:80, color:"#3178C6", tag:"Proficient", years:"2yr" },
      { name:"Tailwind",   pct:88, color:"#06B6D4", tag:"Proficient", years:"2yr" },
      { name:"Material UI",pct:82, color:"#0081CB", tag:"Proficient", years:"2yr" },
      { name:"HTML / CSS", pct:96, color:"#E34F26", tag:"Expert",     years:"4yr" },
      { name:"Bootstrap",  pct:80, color:"#7952B3", tag:"Proficient", years:"2yr" },
    ],
  },
  database: {
    label: "Databases", accent: C.amber, secondAccent: "#FBBF24",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>),
    description: "Relational & document stores, query optimisation",
    items: [
      { name:"MySQL",        pct:91, color:"#4479A1", tag:"Expert",     years:"3yr" },
      { name:"MS SQL Server",pct:86, color:"#CC2927", tag:"Proficient", years:"2yr" },
      { name:"MongoDB",      pct:82, color:"#4DB33D", tag:"Proficient", years:"2yr" },
      { name:"PostgreSQL",   pct:78, color:"#336791", tag:"Proficient", years:"1yr" },
      { name:"Firebase",     pct:70, color:"#FFCA28", tag:"Familiar",   years:"1yr" },
      { name:"SQLite",       pct:73, color:"#67B7D1", tag:"Familiar",   years:"1yr" },
    ],
  },
  tools: {
    label: "Cloud & Tools", accent: C.emerald, secondAccent: "#34D399",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>),
    description: "Azure cloud, DevOps pipelines & developer tooling",
    items: [
      { name:"Azure",       pct:82, color:"#0089D0", tag:"Proficient", years:"2yr" },
      { name:"Azure DevOps",pct:78, color:"#0078D4", tag:"Proficient", years:"2yr" },
      { name:"CI/CD",       pct:80, color:"#10B981", tag:"Proficient", years:"2yr" },
      { name:"Git / GitHub",pct:93, color:"#F05032", tag:"Expert",     years:"4yr" },
      { name:"Postman",     pct:91, color:"#FF6C37", tag:"Expert",     years:"3yr" },
      { name:"Swagger",     pct:84, color:"#85EA2D", tag:"Proficient", years:"2yr" },
      { name:"VS Code",     pct:96, color:"#007ACC", tag:"Expert",     years:"4yr" },
      { name:"scikit-learn",pct:64, color:"#F89939", tag:"Familiar",   years:"1yr" },
    ],
  },
};

const CATEGORY_KEYS = Object.keys(SKILLS);

const TAG_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  Expert:     { color: C.emerald, bg: C.emerald+"18", border: C.emerald+"40" },
  Proficient: { color: C.violet,  bg: C.violet+"18",  border: C.violet+"40"  },
  Familiar:   { color: C.amber,   bg: C.amber+"18",   border: C.amber+"40"   },
};

function RadialRing({ pct, color, size = 64, stroke = 5, triggered }: { pct: number; color: string; size?: number; stroke?: number; triggered: boolean }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
        animate={triggered ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
        transition={{ duration: 1.3, ease: [0.34, 1.08, 0.64, 1], delay: 0.05 }}
        style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}/>
    </svg>
  );
}

function HBar({ pct, color, triggered, delay = 0 }: { pct: number; color: string; triggered: boolean; delay?: number }) {
  return (
    <div style={{ height:4, borderRadius:999, background:C.border, overflow:"hidden", flex:1 }}>
      <motion.div initial={{ width:"0%" }} animate={triggered ? { width:`${pct}%` } : { width:"0%" }}
        transition={{ duration:1.2, delay, ease:[0.34,1.08,0.64,1] }}
        style={{ height:"100%", borderRadius:999, background:`linear-gradient(90deg, ${color}88, ${color})`, boxShadow:`0 0 8px ${color}66` }}/>
    </div>
  );
}

function SkillRow({ sk, index, triggered }: { sk: SkillItem; index: number; triggered: boolean }) {
  const ts = TAG_STYLE[sk.tag] || TAG_STYLE.Familiar;
  return (
    <motion.div
      initial={{ opacity:0, x:-20 }} animate={triggered ? { opacity:1, x:0 } : { opacity:0, x:-20 }}
      transition={{ delay:0.06*index, type:"spring", stiffness:200, damping:24 }}
      whileHover={{ x:4 }}
      style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, background:C.s2, border:`1px solid ${C.border}`, cursor:"default", transition:"border-color 0.2s, background 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = sk.color+"55"; (e.currentTarget as HTMLElement).style.background = C.s3; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border;      (e.currentTarget as HTMLElement).style.background = C.s2; }}
    >
      <motion.div style={{ width:10, height:10, borderRadius:"50%", flexShrink:0, background:sk.color, boxShadow:`0 0 8px ${sk.color}99` }} whileHover={{ scale:1.4 }}/>
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:C.t1, flex:1 }}>{sk.name}</span>
      <div style={{ width:80, flexShrink:0 }}><HBar pct={sk.pct} color={sk.color} triggered={triggered} delay={0.06*index+0.1}/></div>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:sk.color, width:34, textAlign:"right", flexShrink:0 }}>{sk.pct}%</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.06em", color:ts.color, background:ts.bg, border:`1px solid ${ts.border}`, borderRadius:999, padding:"2px 8px", flexShrink:0 }}>{sk.tag}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.t3, flexShrink:0, width:28 }}>{sk.years}</span>
    </motion.div>
  );
}

function SkillCard({ sk, index, triggered }: { sk: SkillItem; index: number; triggered: boolean }) {
  const [hov, setHov] = useState(false);
  const ts = TAG_STYLE[sk.tag] || TAG_STYLE.Familiar;
  return (
    <motion.div
      initial={{ opacity:0, y:24, scale:0.93 }} animate={triggered ? { opacity:1, y:0, scale:1 } : { opacity:0, y:24, scale:0.93 }}
      transition={{ delay:0.05*index, type:"spring", stiffness:180, damping:22 }}
      whileHover={{ y:-6, transition:{ type:"spring", stiffness:300, damping:20 } }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ background:hov?C.s3:C.s2, border:`1px solid ${hov?sk.color+"55":C.border}`, borderRadius:16, padding:"18px 16px", cursor:"default", position:"relative", overflow:"hidden",
        boxShadow:hov?`0 16px 48px ${sk.color}1A, 0 0 0 1px ${sk.color}22`:`0 0px 0px ${sk.color}00, 0 0 0 0px ${sk.color}00`, transition:"background 0.25s, border-color 0.3s, box-shadow 0.3s" }}>
      <motion.div animate={{ opacity:hov?1:0 }} style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:`radial-gradient(circle, ${sk.color}22, transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ position:"relative", width:64, height:64, marginBottom:14 }}>
        <RadialRing pct={sk.pct} color={sk.color} triggered={triggered}/>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:13, color:sk.color, lineHeight:1 }}>{sk.pct}</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:7, color:C.t3 }}>%</span>
        </div>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:C.t1, marginBottom:6 }}>{sk.name}</div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:ts.color, background:ts.bg, border:`1px solid ${ts.border}`, borderRadius:999, padding:"2px 8px" }}>{sk.tag}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.t3 }}>{sk.years}</span>
      </div>
      <div style={{ marginTop:12 }}><HBar pct={sk.pct} color={sk.color} triggered={triggered} delay={0.05*index+0.2}/></div>
    </motion.div>
  );
}

function CategoryPanel({ catKey, view, sectionInView }: { catKey: string; view: string; sectionInView: boolean }) {
  const cat = SKILLS[catKey];
  const { ref, inView } = useInView(0.1);
  const triggered = sectionInView && inView;
  const avg     = Math.round(cat.items.reduce((s, i) => s + i.pct, 0) / cat.items.length);
  const experts = cat.items.filter(i => i.tag === "Expert").length;

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:32 }} animate={triggered ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, ease:[0.25,0.4,0.25,1] }}
      style={{ background:C.s1, border:`1px solid ${C.border}`, borderRadius:20, overflow:"hidden" }}>
      <div style={{ height:3, background:`linear-gradient(90deg, ${cat.accent}, ${cat.secondAccent}, transparent)` }}/>
      <div style={{ padding:"20px 22px 0", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, background:cat.accent+"16", border:`1px solid ${cat.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", color:cat.accent }}>{cat.icon}</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18, color:C.t1, lineHeight:1.1 }}>{cat.label}</div>
            <div style={{ fontFamily:"'Epilogue',sans-serif", fontSize:12, color:C.t2, marginTop:2 }}>{cat.description}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:12, flexShrink:0, padding:"10px 14px", borderRadius:12, background:C.s2, border:`1px solid ${C.border}` }}>
          {[{ n:cat.items.length, l:"skills" }, { n:`${avg}%`, l:"avg" }, { n:experts, l:"experts" }].map(s => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, background:`linear-gradient(135deg, ${cat.accent}, ${cat.secondAccent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:C.t3, letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"16px 22px 22px" }}>
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
              style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))", gap:10 }}>
              {cat.items.map((sk, i) => <SkillCard key={sk.name} sk={sk} index={i} triggered={triggered}/>)}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
              style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {cat.items.slice().sort((a,b) => b.pct-a.pct).map((sk, i) => <SkillRow key={sk.name} sk={sk} index={i} triggered={triggered}/>)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function OverviewSidebar({ sectionInView, activeFilter }: { sectionInView: boolean; activeFilter: string }) {
  const { ref, inView } = useInView(0.1);
  const triggered = sectionInView && inView;
  const allSkills  = CATEGORY_KEYS.flatMap(k => SKILLS[k].items);
  const totalAvg   = Math.round(allSkills.reduce((s,i) => s+i.pct, 0) / allSkills.length);
  const expertCount = allSkills.filter(i => i.tag === "Expert").length;
  const top5 = [...allSkills].sort((a,b) => b.pct-a.pct).slice(0,5);

  return (
    <motion.div ref={ref} initial={{ opacity:0, x:24 }} animate={triggered ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, ease:[0.25,0.4,0.25,1], delay:0.15 }}
      style={{ display:"flex", flexDirection:"column", gap:14, position:"sticky", top:24 }}>
      <div style={{ background:C.s1, border:`1px solid ${C.border}`, borderRadius:18, padding:20 }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:C.t3, textTransform:"uppercase", marginBottom:16 }}>Overall</div>
        {[
          { n:allSkills.length,  l:"Total Technologies",  accent:C.violet  },
          { n:`${totalAvg}%`,    l:"Average Proficiency", accent:C.cyan    },
          { n:expertCount,       l:"Expert-level Skills", accent:C.emerald },
          { n:CATEGORY_KEYS.length, l:"Domains Covered",  accent:C.amber  },
        ].map(s => (
          <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontFamily:"'Epilogue',sans-serif", fontSize:12, color:C.t2 }}>{s.l}</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, background:`linear-gradient(135deg, ${s.accent}, ${C.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</span>
          </div>
        ))}
      </div>

      <div style={{ background:C.s1, border:`1px solid ${C.border}`, borderRadius:18, padding:20 }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:C.t3, textTransform:"uppercase", marginBottom:14 }}>Top 5 Skills</div>
        {top5.map((sk, i) => (
          <div key={sk.name} style={{ marginBottom: i < 4 ? 12 : 0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.t3, width:14 }}>#{i+1}</span>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, color:C.t1 }}>{sk.name}</span>
              </div>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:sk.color }}>{sk.pct}%</span>
            </div>
            <HBar pct={sk.pct} color={sk.color} triggered={triggered} delay={i*0.08}/>
          </div>
        ))}
      </div>

      <div style={{ background:C.s1, border:`1px solid ${C.border}`, borderRadius:18, padding:20 }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:C.t3, textTransform:"uppercase", marginBottom:14 }}>By Category</div>
        {CATEGORY_KEYS.map(k => {
          const cat    = SKILLS[k];
          const catAvg = Math.round(cat.items.reduce((s,i) => s+i.pct, 0) / cat.items.length);
          const isActive = activeFilter === "all" || activeFilter === k;
          return (
            <div key={k} style={{ marginBottom:12, opacity:isActive?1:0.4, transition:"opacity 0.3s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:500, fontSize:12, color:isActive?cat.accent:C.t3, transition:"color 0.3s" }}>{cat.label}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:cat.accent }}>{catAvg}%</span>
              </div>
              <HBar pct={catAvg} color={cat.accent} triggered={triggered} delay={0.1}/>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ControlBar({ filter, setFilter, view, setView }: { filter: string; setFilter: (v: string) => void; view: string; setView: (v: string) => void }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:32 }}>
      <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
        {[{ key:"all", label:"All", accent:C.violet }, ...CATEGORY_KEYS.map(k => ({ key:k, label:SKILLS[k].label, accent:SKILLS[k].accent }))].map(f => {
          const isActive = filter === f.key;
          return (
            <motion.button key={f.key} onClick={() => setFilter(f.key)} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:600, fontSize:13, color:isActive?f.accent:C.t2, background:isActive?f.accent+"14":"transparent", border:`1px solid ${isActive?f.accent+"55":C.border}`, borderRadius:999, padding:"8px 16px", cursor:"pointer", position:"relative", transition:"all 0.22s" }}>
              {f.label}
              {isActive && (
                <motion.div layoutId="filter-pill" style={{ position:"absolute", inset:0, borderRadius:999, border:`1px solid ${f.accent}44`, background:f.accent+"0C" }} transition={{ type:"spring", stiffness:300, damping:30 }}/>
              )}
            </motion.button>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:4, background:C.s2, border:`1px solid ${C.border}`, borderRadius:10, padding:4 }}>
        {[
          { v:"grid", icon:<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
          { v:"list", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{width:14,height:14}}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> },
        ].map(({ v, icon }) => (
          <motion.button key={v} onClick={() => setView(v)} whileTap={{ scale:0.9 }}
            style={{ width:34, height:34, borderRadius:7, background:view===v?C.s3:"transparent", border:`1px solid ${view===v?C.borderB:"transparent"}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:view===v?C.t1:C.t3, transition:"all 0.18s" }}>
            {icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ inView }: { inView: boolean }) {
  const total = CATEGORY_KEYS.reduce((s, k) => s + SKILLS[k].items.length, 0);
  return (
    <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.65, ease:[0.25,0.4,0.25,1] }} style={{ marginBottom:48 }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:C.violet, background:C.violet+"0C", border:`1px solid ${C.violet}28`, borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
        <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:2.2, repeat:Infinity }} style={{ width:6, height:6, borderRadius:"50%", background:C.violet, display:"inline-block" }}/>
        {total} TECHNOLOGIES · 4 DOMAINS
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, margin:0, fontSize:"clamp(2rem,5vw,3.8rem)", lineHeight:1.05, color:C.t1 }}>
          Technical{" "}
          <span style={{ background:`linear-gradient(135deg, ${C.violet}, ${C.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Arsenal</span>
        </h2>
        <p style={{ fontFamily:"'Epilogue',sans-serif", fontSize:14, color:C.t2, maxWidth:360, lineHeight:1.65, margin:0 }}>Production-grade tools I use to build APIs, UIs, databases and cloud infrastructure.</p>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  useFonts();
  const [filter, setFilter] = useState("all");
  const [view, setView]     = useState("grid");
  const { ref: sectionRef, inView: sectionInView } = useInView(0.05);
  const visibleKeys = filter === "all" ? CATEGORY_KEYS : CATEGORY_KEYS.filter(k => k === filter);

  return (
    <section ref={sectionRef} style={{ background:C.bg, minHeight:"100vh", padding:"80px 24px 100px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-8%", right:"-4%", width:"38%", height:"48%", background:`radial-gradient(ellipse, ${C.violet}0B 0%, transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-6%", left:"-4%", width:"34%", height:"44%", background:`radial-gradient(ellipse, ${C.cyan}07 0%, transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }}/>
      <motion.div initial={{ scaleX:0 }} animate={sectionInView ? { scaleX:1 } : {}} transition={{ duration:1.4, ease:[0.25,0.4,0.25,1] }}
        style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1, background:`linear-gradient(90deg, transparent, ${C.violet}, ${C.cyan}, transparent)`, transformOrigin:"left" }}/>

      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <SectionHeader inView={sectionInView}/>
        <ControlBar filter={filter} setFilter={setFilter} view={view} setView={setView}/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:24, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <AnimatePresence mode="wait">
              <motion.div key={filter} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }} style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {visibleKeys.map(k => <CategoryPanel key={k} catKey={k} view={view} sectionInView={sectionInView}/>)}
              </motion.div>
            </AnimatePresence>
          </div>
          <OverviewSidebar sectionInView={sectionInView} activeFilter={filter}/>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { div[style*="gridTemplateColumns: 1fr 280px"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
