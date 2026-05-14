'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Trophy, Zap, Heart, Users, Sparkles, TrendingUp, Wallet, HelpCircle } from 'lucide-react';

// --- DATA: 56 Coaching Questions (8 Domains) ---
const DOMAINS = {
  ADVANCEMENT: {
    title: "Advancement",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#6366F1", 
    buttonLabel: "LET'S GO.",
    questions: [
      "What is one adaptable plan you can create for your biggest goal today?",
      "Where is your execution discipline currently slipping?",
      "Looking ahead 3 years, what foresight would your future self give you now?",
      "What is one 'long-term' goal you can start acting on immediately?",
      "How can you refine your current workflow to be 10% more efficient?",
      "What are you planning for that no longer serves your growth?",
      "Who is a mentor that could help you see further into your advancement?"
    ],
    tip: "Progress is rarely a straight line; focus on the direction, not just the speed."
  },
  ACHIEVEMENT: {
    title: "Achievement",
    icon: <Trophy className="w-5 h-5" />,
    color: "#D97706", 
    buttonLabel: "CLAIM THE WIN.",
    questions: [
      "What does 'winning' look like for you in this current season of life?",
      "Which of your current credentials or recognitions are you most proud of?",
      "Are you playing the right 'game' in your career or business?",
      "What rule of your industry do you need to understand better to succeed?",
      "How can you leverage your influence to create a positive social impact?",
      "What is a win you've had recently that you haven't celebrated yet?",
      "What specific milestone will prove you've reached your next level?"
    ],
    tip: "Recognition is the fuel, but contribution is the engine of true achievement."
  },
  CREATION_CHOICE: {
    title: "Creation/Choice",
    icon: <Sparkles className="w-5 h-5" />,
    color: "#4338CA", 
    buttonLabel: "BREAK SOME BARRIERS.",
    questions: [
      "If you were to reinvent yourself tomorrow, what would be the first change?",
      "What past limitation is currently keeping you from a new possibility?",
      "What is a 'new pathway' you've been afraid to walk down?",
      "How are you currently choosing your environment rather than reacting to it?",
      "What would you create today if you knew failure was impossible?",
      "In which area of your life do you feel the most 'trapped' and how can you choose out?",
      "What is a bold new option you can create for your career this month?"
    ],
    tip: "Choice is a muscle. The more you use it, the stronger your freedom becomes."
  },
  RESOURCE_GAINING: {
    title: "Resource Gaining",
    icon: <Wallet className="w-5 h-5" />,
    color: "#B45309", 
    buttonLabel: "BUILD THE BASE.",
    questions: [
      "How stable is your current financial foundation on a scale of 1-10?",
      "What is one 'material' need that, if met, would unlock your productivity?",
      "Are your current resources aligned with your 'higher-level' pursuits?",
      "What is one way you can create more sustainability in your income?",
      "What 'resource' (time, money, or energy) are you currently wasting?",
      "How can you invest in yourself today to increase your future value?",
      "What does 'enough' look like for your material security?"
    ],
    tip: "Resources are tools for your mission; don't mistake the tools for the destination."
  },
  VITALITY: {
    title: "Vitality",
    icon: <Zap className="w-5 h-5" />,
    color: "#4F46E5", 
    buttonLabel: "ACTIVATE POWER.",
    questions: [
      "What is your current energy level, and what is the biggest drain on it?",
      "How clear has your mind been lately? What's clouding it?",
      "What is one physical habit you can adjust for better performance?",
      "Are you managing your energy or just your time?",
      "What does 'sustainable health' mean to your specific lifestyle?",
      "When was the last time you felt truly physically vibrant?",
      "What is one thing you can do for your longevity today?"
    ],
    tip: "Your body is the vehicle for all your dreams. Treat it with premium respect."
  },
  DREAMS_PASSIONS: {
    title: "Dreams/Passions",
    icon: <HelpCircle className="w-5 h-5" />,
    color: "#F59E0B", 
    buttonLabel: "IGNITE THE FIRE.",
    questions: [
      "What activity makes you lose track of time entirely?",
      "Does your current work align with your deepest personal values?",
      "What was your childhood dream, and how can you honor it today?",
      "What is a meaningful life path you've been ignoring?",
      "How are you sustaining your deep motivation during tough times?",
      "What is one contribution you want to be remembered for?",
      "If money were no object, how would you spend your Tuesday afternoons?"
    ],
    tip: "Passion is a fire that needs regular stoking through meaningful action."
  },
  PEOPLE: {
    title: "People",
    icon: <Users className="w-5 h-5" />,
    color: "#312E81", 
    buttonLabel: "GROW TOGETHER.",
    questions: [
      "Who in your network is currently challenging you to grow?",
      "Which relationship in your life needs the most cultivation right now?",
      "Are you surrounding yourself with people who represent your future or your past?",
      "Who is one person you can support today to strengthen your connection?",
      "What is a 'key relationship' you've been neglecting?",
      "How can you better leverage your professional network for mutual growth?",
      "What boundary do you need to set with a person in your life?"
    ],
    tip: "You are the average of the five people you spend the most time with. Choose wisely."
  },
  CONNECTION: {
    title: "Connection",
    icon: <Heart className="w-5 h-5" />,
    color: "#92400E", 
    buttonLabel: "DEEPEN THE BOND.",
    questions: [
      "How can you develop more 'presence' in your interactions today?",
      "Where can you apply more 'impactful communication' in your work?",
      "Who do you need to have a deep, honest conversation with?",
      "How are you currently showing up for those you care about?",
      "What is one way you can increase your influence through empathy?",
      "How can you deepen your connection to yourself this week?",
      "When you speak, do people feel heard or just spoken to?"
    ],
    tip: "Communication is about being understood; connection is about being felt."
  }
};

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [leverAngle, setLeverAngle] = useState(0);
  const [balls, setBalls] = useState<any[]>([]);

  useEffect(() => {
    const initialBalls = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 35 + Math.random() * 35,
      color: Object.values(DOMAINS)[Math.floor(Math.random() * 8)].color,
      rotation: Math.random() * 360,
    }));
    setBalls(initialBalls);
  }, []);

  const spinGacha = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLeverAngle(prev => prev + 720);

    const domainKeys = Object.keys(DOMAINS);
    const randomKey = domainKeys[Math.floor(Math.random() * domainKeys.length)];
    const domain = (DOMAINS as any)[randomKey];
    const randomQuestion = domain.questions[Math.floor(Math.random() * domain.questions.length)];

    setTimeout(() => {
      setResult({
        domain: domain.title,
        icon: domain.icon,
        color: domain.color,
        buttonLabel: domain.buttonLabel,
        question: randomQuestion,
        tip: domain.tip
      });
      setShowResult(true);
      setIsSpinning(false);
    }, 1800);
  }, [isSpinning]);

  const handleClose = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <div 
      className="min-h-screen bg-[#0F172A] relative flex flex-col items-center justify-start py-12 px-6 text-white"
    >
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700;900&display=swap" rel="stylesheet" />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="relative z-10 text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-500 mb-2 drop-shadow-sm px-4 leading-snug">
          Spin for today's coaching focus
        </h1>
        <div className="w-12 h-1 bg-amber-500/50 mx-auto rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-[340px] aspect-[3/4.4] mb-12">
        <div className="w-full h-full bg-white rounded-[50px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] border-[12px] border-[#1E1B4B] overflow-hidden flex flex-col relative">
          
          <div className="relative h-[58%] bg-[#F8FAFC] border-b-[12px] border-[#1E1B4B] overflow-hidden">
            <div className="absolute top-6 left-6 z-20 bg-[#1E1B4B] text-[#FDE68A] text-[10px] font-black px-3 py-1 rounded-md rotate-[-3deg] shadow-lg">
              各 200 円
            </div>
            <div className="absolute top-6 right-6 z-20 bg-white/90 border-2 border-[#1E1B4B] text-[#1E1B4B] text-[8px] font-black px-2 py-1 rounded-md shadow-sm">
              DESIGNED BY LYM X ECI ☺
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-white/10 z-10 pointer-events-none"></div>
            <div className="absolute left-4 right-4 top-4 bottom-4 rounded-[40px] bg-slate-200/30 overflow-hidden shadow-inner">
              {balls.map((ball) => (
                <div
                  key={ball.id}
                  className={`absolute w-12 h-12 rounded-full shadow-2xl border-b-[6px] border-black/10 flex items-center justify-center transition-all duration-700 ease-in-out ${isSpinning ? 'animate-bounce' : ''}`}
                  style={{
                    left: `${ball.x}%`,
                    top: `${ball.y}%`,
                    backgroundColor: ball.color,
                    transform: `rotate(${ball.rotation}deg)`,
                    transitionDelay: `${ball.id * 20}ms`
                  }}
                >
                  <div className="w-10 h-10 rounded-full border border-white/20"></div>
                  <div className="absolute top-2 left-2 w-3 h-2 bg-white/40 rounded-full blur-[1px]"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#1E1B4B] p-4 flex flex-col items-center justify-between relative">
            
            <div className="flex w-full items-center justify-around mt-1">
               <div className="w-10 h-14 bg-indigo-900/50 rounded-xl border border-indigo-700/50 flex flex-col items-center justify-center gap-1 shadow-inner">
                 <div className="w-5 h-1 bg-indigo-400 rounded"></div>
                 <div className="w-3 h-1 bg-indigo-200 rounded"></div>
                 <div className="text-[8px] font-bold text-indigo-200 mt-1 uppercase tracking-tighter">Slot</div>
               </div>

               <div className="relative pt-6">
                 {!isSpinning && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-500 tracking-[0.2em] whitespace-nowrap animate-pulse uppercase z-20">
                      Turn to Start
                    </div>
                  )}

                 <div 
                   className="relative cursor-pointer group active:scale-95 transition-transform z-10" 
                   onClick={spinGacha}
                 >
                    <div 
                      className="w-24 h-24 bg-indigo-950 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-indigo-900 transition-transform duration-[1800ms] ease-out"
                      style={{ transform: `rotate(${leverAngle}deg)` }}
                    >
                      <div className="w-16 h-4 bg-amber-500 rounded-full absolute shadow-inner"></div>
                      <div className="w-4 h-16 bg-amber-500 rounded-full absolute shadow-inner"></div>
                      <div className="w-10 h-10 bg-white rounded-full border-4 border-amber-500 z-20 flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-[#1E1B4B] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                 </div>
               </div>

               <div className="w-10 h-10 bg-indigo-50 border-4 border-indigo-200 rounded-full shadow-inner flex flex-col items-center justify-center relative">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <div className="absolute -bottom-4 text-[8px] font-bold text-indigo-300 uppercase">Return</div>
               </div>
            </div>

            <div className="w-32 h-10 bg-black rounded-t-[20px] border-t-8 border-x-8 border-slate-950 flex items-center justify-center overflow-hidden shadow-inner mt-4">
               {isSpinning ? (
                 <div className="w-8 h-8 bg-white rounded-full animate-bounce shadow-[0_0_20px_rgba(255,255,255,0.6)]"></div>
               ) : (
                 <div className="w-20 h-1 bg-white/5 rounded-full"></div>
               )}
            </div>
          </div>
        </div>
      </div>

      {showResult && result && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-[#0F172A]/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="fixed inset-0 cursor-pointer" onClick={handleClose}></div>

          <div className="relative my-auto bg-white w-full max-w-md rounded-[50px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-b-[12px] border-amber-500 animate-in zoom-in-95 duration-500">
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-all z-50 shadow-md group"
            >
              <X className="w-6 h-6 text-slate-400 group-hover:scale-110 group-active:scale-90 transition-transform" />
            </button>

            <div className="h-6 w-full" style={{ backgroundColor: result.color }}></div>
            
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-5 rounded-[24px] text-white shadow-2xl scale-110" style={{ backgroundColor: result.color }}>
                  {result.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E1B4B] tracking-tight leading-none">{result.domain}</h2>
                  <p className="text-[11px] text-amber-600 font-bold uppercase tracking-[0.2em] mt-2">Coaching Focus</p>
                </div>
              </div>

              <div className="flex flex-col items-center mb-8 bg-slate-50 p-8 rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#1E1B4B] leading-snug">
                    "{result.question}"
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/80 rounded-[30px] p-6 border-2 border-amber-100 shadow-sm mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[12px] font-bold text-amber-700 uppercase tracking-widest">Wisdom</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed text-[12px]">
                  {result.tip}
                </p>
              </div>

              <button 
                onClick={handleClose}
                className="w-full py-5 bg-[#1E1B4B] hover:bg-[#2D2A70] text-amber-400 font-bold rounded-[30px] transition-all shadow-[0_15px_30px_-5px_rgba(30,27,75,0.4)] active:scale-95 text-lg uppercase tracking-wider"
              >
                {result.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 text-center pb-8 group mt-auto">
        <div className="flex justify-center gap-3 mb-6 transition-all group-hover:gap-4">
           {Object.values(DOMAINS).map((d, i) => (
             <div 
               key={i} 
               className="w-2.5 h-2.5 rounded-full shadow-lg" 
               style={{ backgroundColor: (d as any).color }}
             ></div>
           ))}
        </div>
        <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase text-indigo-300/60 transition-colors group-hover:text-indigo-200 px-4 max-w-xs mx-auto leading-relaxed">
          Live Your Mark. © & Executive Coach International © 2026
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-bounce {
          animation: bounce 0.5s infinite cubic-bezier(0.45, 0, 0.55, 1);
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .animate-pulse {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
