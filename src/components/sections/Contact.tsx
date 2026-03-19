"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   FONT LOADER
═══════════════════════════════════════ */
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Epilogue:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
}

/* ═══════════════════════════════════════
   INTERSECTION OBSERVER HOOK
═══════════════════════════════════════ */
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

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const T = {
  bg: "#040407", s1: "#08080F", s2: "#0D0D1A", s3: "#131325",
  border: "#18183A", borderB: "#282855",
  violet: "#8B5CF6", cyan: "#22D3EE", amber: "#F59E0B",
  emerald: "#10B981", rose: "#F43F5E",
  t1: "#F0F0FF", t2: "#8888B0", t3: "#3A3A60",
};

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */
interface FormData { name: string; email: string; subject: string; message: string; }
interface FieldErrors { name?: string; email?: string; subject?: string; message?: string; }
type Status = "idle" | "loading" | "success" | "error";

/* ═══════════════════════════════════════
   VALIDATION
═══════════════════════════════════════ */
function validateField(field: keyof FormData, value: string): string | undefined {
  switch (field) {
    case "name":    return value.trim().length < 2 ? "Name must be at least 2 characters." : undefined;
    case "email":   return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email." : undefined;
    case "subject": return value.trim().length < 4 ? "Subject must be at least 4 characters." : undefined;
    case "message": return value.trim().length < 20 ? "Message must be at least 20 characters." : undefined;
  }
}
function validateAll(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(data) as (keyof FormData)[]).forEach(k => { const e = validateField(k, data[k]); if (e) errors[k] = e; });
  return errors;
}

/* ═══════════════════════════════════════
   SOCIAL DATA
═══════════════════════════════════════ */
const SOCIALS = [
  {
    id: "github", label: "GitHub", handle: "@KusumPareek99",
    href: "https://github.com/KusumPareek99", accent: "#A78BFA",
    desc: "Projects & open-source",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>),
  },
  {
    id: "linkedin", label: "LinkedIn", handle: "Kusum Pareek",
    href: "https://linkedin.com/in/kusumpareek", accent: "#22D3EE",
    desc: "Professional network",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
  },
  {
    id: "email", label: "Email", handle: "kusumpareek7620@gmail.com",
    href: "mailto:kusumpareek7620@gmail.com", accent: T.amber,
    desc: "Direct email",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>),
  },
];

const INFO_CARDS = [
  { icon: "📍", label: "Location",  value: "Pune, Maharashtra, India" },
  { icon: "⏰", label: "Response",  value: "Within 24–48 hours"       },
  { icon: "💼", label: "Open to",   value: "Full-time & Freelance"     },
  { icon: "🌐", label: "Available", value: "Remote & On-site roles"    },
];

/* ═══════════════════════════════════════
   FIELD COMPONENT
═══════════════════════════════════════ */
interface FieldProps {
  id: keyof FormData; label: string; type?: string; placeholder: string;
  value: string; error?: string; touched: boolean; multiline?: boolean; rows?: number;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
  disabled?: boolean;
}

function Field({ id, label, type = "text", placeholder, value, error, touched, multiline, rows = 4, onChange, onBlur, disabled }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const hasError = touched && !!error;
  const isValid  = touched && !error && value.trim().length > 0;

  const borderColor = hasError ? T.rose : isValid ? T.emerald : focused ? T.violet : T.border;
  const shadowColor = hasError ? T.rose+"22" : isValid ? T.emerald+"18" : focused ? T.violet+"20" : "transparent";

  const commonStyle: React.CSSProperties = {
    width:"100%", background: focused ? T.s3 : T.s2,
    border:`1.5px solid ${borderColor}`, borderRadius:12,
    padding: multiline ? "14px 16px" : "13px 16px",
    fontFamily:"'Epilogue',sans-serif", fontSize:14, color:T.t1,
    outline:"none", resize: multiline ? "none" as const : undefined,
    boxSizing:"border-box" as const,
    transition:"border-color 0.22s,background 0.22s,box-shadow 0.22s",
    boxShadow:`0 0 0 3px ${shadowColor}`,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:500,
          color: hasError ? T.rose : focused ? T.violet : T.t2, letterSpacing:"0.08em",
          textTransform:"uppercase", transition:"color 0.2s" }}>{label}</label>
        <AnimatePresence mode="wait">
          {hasError && (
            <motion.span key="err" initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:8}}
              style={{ fontFamily:"'Epilogue',sans-serif", fontSize:11, color:T.rose }}>⚠ {error}</motion.span>
          )}
          {isValid && (
            <motion.span key="ok" initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.7}}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.emerald }}>✓ Looks good</motion.span>
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea id={id} value={value} placeholder={placeholder} rows={rows} disabled={disabled}
          onChange={e=>onChange(id,e.target.value)} onFocus={()=>setFocused(true)}
          onBlur={()=>{setFocused(false);onBlur(id);}} style={commonStyle as React.CSSProperties}/>
      ) : (
        <input id={id} type={type} value={value} placeholder={placeholder} disabled={disabled}
          onChange={e=>onChange(id,e.target.value)} onFocus={()=>setFocused(true)}
          onBlur={()=>{setFocused(false);onBlur(id);}} style={commonStyle}/>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   SUCCESS OVERLAY
═══════════════════════════════════════ */
function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.92}}
      transition={{type:"spring",stiffness:180,damping:22}}
      style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        textAlign:"center",padding:"60px 32px",gap:20 }}>
      <div style={{ position:"relative",width:96,height:96 }}>
        {[0,1,2].map(i=>(
          <motion.div key={i} initial={{scale:0.6,opacity:0.7}} animate={{scale:2.2,opacity:0}}
            transition={{duration:1.8,delay:i*0.5,repeat:Infinity,ease:"easeOut"}}
            style={{ position:"absolute",inset:0,borderRadius:"50%",
              background:`radial-gradient(circle,${T.emerald}33,transparent 70%)` }}/>
        ))}
        <motion.div initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}}
          transition={{type:"spring",stiffness:240,damping:18,delay:0.1}}
          style={{ position:"relative",width:96,height:96,borderRadius:"50%",
            background:T.emerald+"18",border:`2px solid ${T.emerald}`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:44 }}>✓</motion.div>
      </div>
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
        <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,color:T.t1,margin:"0 0 8px" }}>
          Message Sent! 🎉</h3>
        <p style={{ fontFamily:"'Epilogue',sans-serif",fontSize:14,color:T.t2,lineHeight:1.7,margin:"0 0 4px" }}>
          Thanks for reaching out! I&apos;ll reply within <strong style={{color:T.violet}}>24–48 hours</strong>.</p>
        <p style={{ fontFamily:"'Epilogue',sans-serif",fontSize:13,color:T.t3,margin:0 }}>
          Check your inbox for a confirmation email.</p>
      </motion.div>
      <motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
        onClick={onReset} whileHover={{scale:1.04}} whileTap={{scale:0.97}}
        style={{ fontFamily:"'Epilogue',sans-serif",fontWeight:600,fontSize:13,color:T.t2,
          background:"transparent",border:`1px solid ${T.border}`,borderRadius:10,
          padding:"10px 22px",cursor:"pointer" }}>Send another message</motion.button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   SOCIAL CARD
═══════════════════════════════════════ */
function SocialCard({ s, index, inView }: { s: typeof SOCIALS[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a href={s.href} target={s.id!=="email"?"_blank":undefined} rel="noopener noreferrer"
      initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
      transition={{delay:0.1+index*0.08,type:"spring",stiffness:160,damping:22}}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      whileHover={{x:6}}
      style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderRadius:14,
        background:hov?T.s3:T.s2, border:`1px solid ${hov?s.accent+"55":T.border}`,
        textDecoration:"none", boxShadow:hov?`0 8px 32px ${s.accent}14`:`0 0px 0px ${s.accent}00`,
        transition:"background 0.22s,border-color 0.25s,box-shadow 0.25s",cursor:"pointer" }}>
      <motion.div animate={hov?{scale:1.1,rotate:-4}:{scale:1,rotate:0}}
        transition={{type:"spring",stiffness:280,damping:20}}
        style={{ width:44,height:44,borderRadius:12,flexShrink:0,background:s.accent+"16",
          border:`1px solid ${s.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",
          color:s.accent }}>{s.icon}</motion.div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:T.t1,marginBottom:2}}>{s.label}</div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:s.accent,
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.handle}</div>
        <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:11,color:T.t3}}>{s.desc}</div>
      </div>
      <motion.div animate={{x:hov?3:0,opacity:hov?1:0.4}} style={{color:s.accent,flexShrink:0}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </motion.div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
function ContactForm({ inView }: { inView: boolean }) {
  const [formData, setFormData] = useState<FormData>({ name:"",email:"",subject:"",message:"" });
  const [touched, setTouched] = useState<Partial<Record<keyof FormData,boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const errors = validateAll(formData);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name:true,email:true,subject:true,message:true });
    if (hasErrors) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); }
      else { setStatus("error"); setStatusMsg(data.message||"Something went wrong."); }
    } catch {
      setStatus("error"); setStatusMsg("Network error. Please try again.");
    }
  };

  const handleReset = useCallback(() => {
    setFormData({ name:"",email:"",subject:"",message:"" });
    setTouched({}); setStatus("idle"); setStatusMsg("");
  }, []);

  const isDisabled = status === "loading";

  return (
    <motion.div initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}}
      transition={{delay:0.15,duration:0.65,ease:[0.25,0.4,0.25,1]}}
      style={{ background:T.s1,border:`1px solid ${T.border}`,borderRadius:22,overflow:"hidden",
        boxShadow:"0 4px 48px rgba(0,0,0,0.5)" }}>
      <div style={{ height:3,background:`linear-gradient(90deg,${T.violet},${T.cyan},transparent)` }}/>
      <AnimatePresence mode="wait">
        {status==="success" ? (
          <SuccessOverlay key="success" onReset={handleReset}/>
        ) : (
          <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:0.98}}
            style={{ padding:"32px 28px" }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:7,
                fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:"0.18em",color:T.violet,
                background:T.violet+"10",border:`1px solid ${T.violet}28`,borderRadius:999,
                padding:"4px 12px",marginBottom:12 }}>
                <motion.span animate={{opacity:[1,0.3,1]}} transition={{duration:2,repeat:Infinity}}
                  style={{width:5,height:5,borderRadius:"50%",background:T.violet,display:"inline-block"}}/>
                SEND A MESSAGE
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:26,color:T.t1,margin:0,lineHeight:1.1 }}>
                Let&apos;s{" "}
                <span style={{ background:`linear-gradient(135deg,${T.violet},${T.cyan})`,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>work together</span>
              </h3>
            </div>

            <AnimatePresence>
              {status==="error" && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
                  style={{ marginBottom:20,padding:"12px 16px",background:T.rose+"10",
                    border:`1px solid ${T.rose}44`,borderRadius:10,fontFamily:"'Epilogue',sans-serif",
                    fontSize:13,color:T.rose,display:"flex",gap:8,alignItems:"flex-start" }}>
                  <span>⚠</span><span>{statusMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate style={{ display:"flex",flexDirection:"column",gap:18 }}>
              <div className="name-email-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <Field id="name" label="Full Name" placeholder="Jane Smith" value={formData.name}
                  error={errors.name} touched={!!touched.name} onChange={handleChange} onBlur={handleBlur} disabled={isDisabled}/>
                <Field id="email" label="Email" type="email" placeholder="jane@example.com" value={formData.email}
                  error={errors.email} touched={!!touched.email} onChange={handleChange} onBlur={handleBlur} disabled={isDisabled}/>
              </div>
              <Field id="subject" label="Subject" placeholder="Project idea / hiring…" value={formData.subject}
                error={errors.subject} touched={!!touched.subject} onChange={handleChange} onBlur={handleBlur} disabled={isDisabled}/>
              <Field id="message" label="Message" multiline rows={5} placeholder="Tell me about your project…"
                value={formData.message} error={errors.message} touched={!!touched.message}
                onChange={handleChange} onBlur={handleBlur} disabled={isDisabled}/>

              <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.t3,textAlign:"right",marginTop:-10 }}>
                {formData.message.length} / 2000 chars
              </div>

              {/* Submit */}
              <motion.button type="submit" disabled={isDisabled}
                whileHover={!isDisabled?{scale:1.02}:{}} whileTap={!isDisabled?{scale:0.98}:{}}
                style={{ width:"100%",background:`linear-gradient(135deg,${T.violet},#6D28D9)`,
                  border:`1px solid ${T.violet}55`,borderRadius:14,padding:"15px 24px",
                  fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:T.t1,
                  cursor:isDisabled?"not-allowed":"pointer",display:"flex",alignItems:"center",
                  justifyContent:"center",gap:10,boxShadow:`0 8px 32px ${T.violet}33`,
                  position:"relative",overflow:"hidden",opacity:isDisabled?0.7:1 }}>
                <AnimatePresence mode="wait">
                  {isDisabled ? (
                    <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      style={{display:"flex",alignItems:"center",gap:10}}>
                      <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}}
                        style={{ width:18,height:18,borderRadius:"50%",border:`2px solid ${T.violet}33`,borderTopColor:T.t1 }}/>
                      Sending…
                    </motion.div>
                  ) : (
                    <motion.div key="send" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      style={{display:"flex",alignItems:"center",gap:8}}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <p style={{ fontFamily:"'Epilogue',sans-serif",fontSize:11,color:T.t3,textAlign:"center",margin:"16px 0 0" }}>
              🔒 Your info is safe. I&apos;ll never share your email.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════ */
export default function ContactSection() {
  useFonts();
  const { ref: sectionRef, inView: sectionInView } = useInView(0.05);
  const { ref: leftRef,    inView: leftInView    } = useInView(0.1);
  const { ref: headerRef,  inView: headerInView  } = useInView(0.2);

  const particles = [
    {x:6,y:12,c:T.violet,d:5.5,dl:0},{x:92,y:22,c:T.cyan,d:4.8,dl:0.8},
    {x:88,y:68,c:T.violet,d:6.2,dl:1.4},{x:4,y:72,c:T.amber,d:5.0,dl:0.5},
    {x:50,y:5,c:T.cyan,d:5.8,dl:1.8},{x:95,y:45,c:T.emerald,d:4.6,dl:1.0},
  ];

  return (
    <section ref={sectionRef} style={{ background:T.bg,minHeight:"100vh",padding:"80px 16px 80px",
      position:"relative",overflow:"hidden" }}>

      {/* BG glows */}
      <div style={{position:"absolute",top:"-8%",right:"-4%",width:"40%",height:"50%",
        background:`radial-gradient(ellipse,${T.violet}0B,transparent 70%)`,borderRadius:"50%",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-6%",left:"-4%",width:"34%",height:"44%",
        background:`radial-gradient(ellipse,${T.cyan}07,transparent 70%)`,borderRadius:"50%",pointerEvents:"none"}}/>

      {particles.map((p,i)=>(
        <motion.div key={i} animate={{y:[0,-18,0],opacity:[0.3,0.7,0.3]}}
          transition={{duration:p.d,delay:p.dl,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:3,height:3,
            borderRadius:"50%",background:p.c,filter:"blur(0.5px)",pointerEvents:"none"}}/>
      ))}

      {/* Top rule */}
      <motion.div initial={{scaleX:0}} animate={sectionInView?{scaleX:1}:{}}
        transition={{duration:1.4,ease:[0.25,0.4,0.25,1]}}
        style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,
          background:`linear-gradient(90deg,transparent,${T.violet},${T.cyan},transparent)`,transformOrigin:"left"}}/>

      <div style={{maxWidth:1200,margin:"0 auto"}}>

        {/* Header */}
        <div ref={headerRef}>
          <motion.div initial={{opacity:0,y:30}} animate={headerInView?{opacity:1,y:0}:{}}
            transition={{duration:0.65,ease:[0.25,0.4,0.25,1]}} style={{marginBottom:52}}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,
              fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.2em",color:T.violet,
              background:T.violet+"0C",border:`1px solid ${T.violet}28`,borderRadius:999,
              padding:"5px 14px",marginBottom:16 }}>
              <motion.span animate={{opacity:[1,0.3,1]}} transition={{duration:2.2,repeat:Infinity}}
                style={{width:6,height:6,borderRadius:"50%",background:T.violet,display:"inline-block"}}/>
              AVAILABLE FOR OPPORTUNITIES
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,margin:0,
                fontSize:"clamp(2rem,5vw,3.8rem)",lineHeight:1.05,color:T.t1}}>
                Get in{" "}
                <span style={{background:`linear-gradient(135deg,${T.violet},${T.cyan})`,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Touch</span>
              </h2>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:14,color:T.t2,
                maxWidth:380,lineHeight:1.7,margin:0}}>
                Whether you have a project, an opportunity, or just want to say hello — my inbox is always open.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.45fr",gap:28,alignItems:"start"}}>

          {/* LEFT */}
          <div ref={leftRef} style={{display:"flex",flexDirection:"column",gap:22}}>

            {/* Availability */}
            <motion.div initial={{opacity:0,x:-24}} animate={leftInView?{opacity:1,x:0}:{}}
              transition={{duration:0.6,ease:[0.25,0.4,0.25,1]}}
              style={{padding:"18px 20px",background:T.emerald+"0E",border:`1px solid ${T.emerald}33`,
                borderRadius:16,display:"flex",alignItems:"center",gap:12}}>
              <motion.div animate={{scale:[1,1.3,1]}} transition={{duration:2,repeat:Infinity}}
                style={{width:10,height:10,borderRadius:"50%",background:T.emerald,flexShrink:0,
                  boxShadow:`0 0 10px ${T.emerald}88`}}/>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:T.emerald,marginBottom:2}}>
                  Open to Work</div>
                <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:12,color:T.t2}}>
                  Available for full-time SDE roles & freelance projects</div>
              </div>
            </motion.div>

            {/* Info cards */}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {INFO_CARDS.map((card,i)=>(
                <motion.div key={card.label} initial={{opacity:0,y:16}} animate={leftInView?{opacity:1,y:0}:{}}
                  transition={{delay:0.35+i*0.07,type:"spring",stiffness:150,damping:22}}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,
                    background:T.s2,border:`1px solid ${T.border}`}}>
                  <span style={{fontSize:20,flexShrink:0}}>{card.icon}</span>
                  <div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:"0.1em",
                      color:T.t3,textTransform:"uppercase",marginBottom:2}}>{card.label}</div>
                    <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:13,fontWeight:500,color:T.t1}}>{card.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <motion.div initial={{scaleX:0}} animate={leftInView?{scaleX:1}:{}}
              transition={{duration:0.8,delay:0.4}}
              style={{height:1,background:`linear-gradient(90deg,${T.violet}40,transparent)`,transformOrigin:"left"}}/>

            {/* Socials */}
            <div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:"0.22em",
                color:T.t3,textTransform:"uppercase",marginBottom:12}}>Find me online</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {SOCIALS.map((s,i)=><SocialCard key={s.id} s={s} index={i} inView={leftInView}/>)}
              </div>
            </div>

            {/* Resume */}
            <motion.a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              initial={{opacity:0,y:16}} animate={leftInView?{opacity:1,y:0}:{}}
              transition={{delay:0.55,type:"spring",stiffness:150}}
              whileHover={{scale:1.02,borderColor:T.violet+"88"}} whileTap={{scale:0.98}}
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                padding:"13px 24px",borderRadius:14,background:T.s2,border:`1px solid ${T.border}`,
                fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:T.t1,
                textDecoration:"none",transition:"border-color 0.22s"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </motion.a>
          </div>

          {/* RIGHT: Form */}
          <ContactForm inView={true}/>
        </div>

        {/* Footer strip */}
        <motion.div initial={{opacity:0}} animate={sectionInView?{opacity:1}:{}} transition={{delay:0.7}}
          style={{marginTop:48,paddingTop:32,borderTop:`1px solid ${T.border}`,
            display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:13,color:T.t3}}>
            © 2025 Kusum Pareek · Built with Next.js + Framer Motion</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.t3,
            display:"flex",alignItems:"center",gap:6}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:T.emerald,display:"inline-block"}}/>
            All systems operational
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .name-email-grid {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder { color: #3A3A60; }
        input, textarea { -webkit-appearance: none; }
        input, textarea, select, button { font-size: 16px; }
      `}</style>
    </section>
  );
}
