import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  User,
  Bot,
  X,
  MessageSquare,
  Landmark,
  Car,
  Briefcase,
  Building,
  ArrowRight,
  Grid,
  Home,
  Menu,
  FileText,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  FileCheck,
  Phone,
  Users,
  Clock,
  Mail,
  Globe,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// --- Firebase Configuration ---
// FIX: Safely check for environment variable to prevent local crash
const firebaseConfig =
  typeof __firebase_config !== "undefined"
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "AIzaSyCLpC-c260RMnfnzHYenSwJlCPvvUXju2U",
        authDomain: "prototypeb-832a7.firebaseapp.com",
        projectId: "prototypeb-832a7",
        storageBucket: "prototypeb-832a7.firebasestorage.app",
        messagingSenderId: "885377013883",
        appId: "1:885377013883:web:f0dccd45eeb4cd37092ade",
        measurementId: "G-9KDDVB1DVR",
      };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const rawAppId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
const appId = rawAppId.replace(/[^a-zA-Z0-9_-]/g, "_");

// --- Configuration & Data ---

const SITE_BRAND = {
  name: "PublicSphere",
  domain: ".gov",
  description: "Transparency in Every Interaction",
};

// Theme: PublicSphere (Slate/Indigo) with Blue Chat Header
const THEME = {
  primary: "bg-slate-900",
  primaryHover: "hover:bg-slate-800",
  secondary: "bg-slate-50",
  text: "text-slate-700",
  border: "border-slate-200",
  gradient: "from-slate-800 to-slate-900",
  chatHeader: "bg-blue-600 text-white",
  userBubble: "bg-indigo-600 text-white",
  botAvatar: "bg-gray-100 text-slate-600",
  launcher: "bg-slate-900 hover:bg-slate-800",
};

const SCENARIOS = {
  tax: {
    id: "tax",
    name: "Tax Office",
    brand: "TaxCentral",
    icon: "Landmark",
    heroTitle: "File Your Taxes with Confidence",
    heroSubtitle:
      "Our automated systems help you navigate the new fiscal year regulations.",
    querySuggestion: "How to file taxes?",
  },
  vehicle: {
    id: "vehicle",
    name: "Vehicle Services",
    brand: "AutoReg",
    icon: "Car",
    heroTitle: "Vehicle Services Portal",
    heroSubtitle: "Renew registrations, pay fines, and manage titles online.",
    querySuggestion: "How much is the renewal fee?",
  },
  benefits: {
    id: "benefits",
    name: "Unemployment",
    brand: "LaborAssist",
    icon: "Briefcase",
    heroTitle: "Unemployment Assistance",
    heroSubtitle:
      "Supporting the workforce during transitions with financial aid and job placement.",
    querySuggestion: "Am I eligible if I quit?",
  },
  housing: {
    id: "housing",
    name: "Housing Authority",
    brand: "CityHomes",
    icon: "Home",
    heroTitle: "Affordable Housing Initiative",
    heroSubtitle:
      "Connecting families with safe, affordable, and sustainable housing options.",
    querySuggestion: "What is the income limit?",
  },
};

const CAROUSEL_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
    title: "Fiscal Responsibility",
    subtitle: "Transparent tax allocation.",
  },
  {
    url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80",
    title: "Infrastructure",
    subtitle: "Building safer roads.",
  },
  {
    url: "https://images.unsplash.com/photo-1521791136064-7985ccfd7171?auto=format&fit=crop&q=80",
    title: "Workforce",
    subtitle: "Empowering citizens.",
  },
  {
    url: "https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80",
    title: "Housing",
    subtitle: "Initiatives for every family.",
  },
];

const ICON_MAP = {
  FileText,
  DollarSign,
  Car,
  FileCheck,
  Calendar,
  Home,
  MapPin,
  Landmark,
  Grid,
  Users,
  Phone,
  ExternalLink,
  Mail,
  Globe,
  Briefcase,
};

// --- Custom NLP API Simulation (Prototype B: Expandable Details + View Details Buttons) ---

async function mockNlpApi(query, scenarioId) {
  const delay = Math.floor(Math.random() * 800) + 400;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const text = query.toLowerCase();

  // --- Helper: Response Generator ---
  const getResponse = (context) => {
    switch (context) {
      case "tax":
        return {
          text: "I found the following resources for tax payments and filings.",
          cards: [
            {
              title: "Pay Property Tax",
              desc: "Secure online payment",
              iconName: "DollarSign",
              action: "View Details",
            },
            {
              title: "Assessment Map",
              desc: "View parcel data",
              iconName: "MapPin",
              action: "View Details",
            },
          ],
        };
      case "vehicle":
        return {
          text: "Select a service below to manage your vehicle.",
          cards: [
            {
              title: "Pay Citation",
              desc: "Clear parking tickets",
              iconName: "FileCheck",
              action: "View Details",
            },
            {
              title: "Resident Permit",
              desc: "Zone A, B, & C",
              iconName: "Car",
              action: "View Details",
            },
          ],
        };
      case "benefits":
        return {
          text: "Access community assistance resources below.",
          cards: [
            {
              title: "Food Pantry",
              desc: "Find local distribution",
              iconName: "MapPin",
              action: "View Details",
            },
            {
              title: "Cash Assistance",
              desc: "Emergency funds",
              iconName: "DollarSign",
              action: "View Details",
            },
          ],
        };
      case "housing":
        return {
          text: "Use these tools to find or apply for housing.",
          cards: [
            {
              title: "Section 8 App",
              desc: "Waitlist status",
              iconName: "Home",
              action: "View Details",
            },
            {
              title: "Available Units",
              desc: "Affordable listings",
              iconName: "Grid",
              action: "View Details",
            },
          ],
        };
      default:
        return null;
    }
  };

  // --- Handle Specific Card Details Requests ---
  if (text.startsWith("tell me more about")) {
    const topic = text.replace("tell me more about ", "").replace(/\?$/, "");
    return {
      text: `Here are the details for **${topic}**. \n\nThis service allows you to manage your requirements online. Typically, you will need to provide identification and relevant supporting documents. Processing times vary by season but usually take 3-5 business days.`,
      details: {
        process: `Intent: Detail Retrieval (${topic}) -> Database Lookup -> Summary Generation`,
        reasoning: `User requested specific information about '${topic}'. Retrieved standard operating procedure summary.`,
        sources_count: 1,
      },
    };
  }

  // --- Greeting ---
  if (
    text.match(
      /\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/,
    )
  ) {
    if (scenarioId === "home") {
      return {
        text: "Welcome to askMe on PublicSphere. I can direct you to the Tax Office, Vehicle Services, Unemployment Benefits, or Housing Authority.",
        cards: [
          {
            title: "Tax Office",
            desc: "Payments & forms",
            iconName: "Landmark",
            action: "View Details",
          },
          {
            title: "City Parking",
            desc: "Permits & tickets",
            iconName: "Car",
            action: "View Details",
          },
        ],
        details: {
          process: "System Boot -> Module Load (Router) -> UI Render",
          reasoning: "System Initialized. Ready for routing.",
          sources_count: 4,
        },
      };
    } else {
      const scen = SCENARIOS[scenarioId];
      const rich = getResponse(scenarioId);
      return {
        text: `Hello! I am the askMe assistant for ${scen.name}. How can I help you today?`,
        cards: rich.cards,
        details: {
          process: `System Boot -> Module Load (${scen.name}) -> UI Render`,
          reasoning: `Loaded ${scen.name} context module.`,
          sources_count: 1,
        },
      };
    }
  }

  // --- Routing & Context ---
  let context = scenarioId;
  if (scenarioId === "home") {
    if (text.includes("tax")) context = "tax";
    else if (text.includes("vehicle") || text.includes("car"))
      context = "vehicle";
    else if (text.includes("benefit") || text.includes("food"))
      context = "benefits";
    else if (text.includes("hous") || text.includes("rent"))
      context = "housing";
  }

  const response = getResponse(context);

  if (response) {
    if (
      text.includes("file") ||
      text.includes("return") ||
      text.includes("how to")
    ) {
      if (context === "tax") {
        response.text =
          "Filing a tax return involves gathering your income documents (W-2s, 1099s), choosing a filing method (e-filing or paper), and submitting your return to the IRS.";
        response.cards = [
          {
            title: "E-File Online",
            desc: "Fastest processing",
            iconName: "FileCheck",
            action: "View Details",
          },
          {
            title: "Download Forms",
            desc: "Paper submission",
            iconName: "FileText",
            action: "View Details",
          },
        ];
      } else if (context === "vehicle") {
        response.text =
          "Renewing takes minutes. Ensure your insurance is active, then select a service.";
        response.cards = [
          {
            title: "Renew Registration",
            desc: "Use RIN number",
            iconName: "Car",
            action: "View Details",
          },
          {
            title: "Check Insurance",
            desc: "Verify status",
            iconName: "FileCheck",
            action: "View Details",
          },
        ];
      } else if (context === "benefits") {
        response.text =
          "To apply for benefits, you must first create an account on the Claimant Portal. You will need your employment history for the last 18 months.";
        response.cards = [
          {
            title: "Claimant Portal",
            desc: "Start application",
            iconName: "Briefcase",
            action: "View Details",
          },
          {
            title: "Eligibility Guide",
            desc: "Check requirements",
            iconName: "FileText",
            action: "View Details",
          },
        ];
      } else if (context === "housing") {
        response.text =
          "The income limit is $52,400 for a family of four. This is 50% of the Area Median Income.";
        response.cards = [
          {
            title: "Income Tables",
            desc: "View PDF Chart",
            iconName: "FileText",
            action: "View Details",
          },
          {
            title: "Calculator",
            desc: "Check eligibility",
            iconName: "DollarSign",
            action: "View Details",
          },
        ];
      }
    }

    // Add logic details for Prototype B (Transparency)
    if (!response.details) {
      response.details = {
        process: `Intent Detected: ${text} -> Knowledge Base Lookup (${context}) -> Response Generation`,
        reasoning: `User queried ${context} services. Displayed dashboard with relevant tools.`,
        sources_count: 2,
      };
    }

    return response;
  }

  // Fallback
  return {
    text: "I can help you locate that service. Try these quick links:",
    cards: [
      {
        title: "Browse Services",
        desc: "View all departments",
        iconName: "Grid",
        action: "View Details",
      },
    ],
    details: {
      process: "Fallback",
      reasoning: "Generic intent match.",
      sources_count: 0,
    },
  };
}

// --- Components ---

// Image Carousel Component
const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12 group border border-white/20 bg-gray-900">
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-8">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
              {slide.title}
            </h3>
            <p className="text-white/90 text-lg drop-shadow-sm">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {CAROUSEL_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const MessageBubble = ({ message, onCardAction }) => {
  const isUser = message.role === "user";
  const [expanded, setExpanded] = useState(false);
  const data = message.data || { text: message.content };

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div
          className={`max-w-[85%] p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed ${THEME.userBubble}`}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // Prototype B Rendering
  return (
    <div className="flex justify-start mb-6 gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${THEME.botAvatar}`}
      >
        <Bot size={16} />
      </div>
      <div className="flex flex-col gap-3 max-w-[95%] w-full">
        {/* 1. Main Text Bubble */}
        <div className="relative p-4 rounded-2xl rounded-tl-none shadow-sm bg-white border border-gray-200 text-gray-800">
          <p className="text-sm leading-relaxed">{data.text}</p>
        </div>

        {/* 2. Rich UI Cards (Grid) with VIEW DETAILS */}
        {data.cards && data.cards.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {data.cards.map((card, idx) => {
              const IconComponent = ICON_MAP[card.iconName] || ExternalLink;
              return (
                <button
                  key={idx}
                  onClick={() => onCardAction(card.title)}
                  className="flex flex-col bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start justify-between w-full mb-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <IconComponent size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-1.5 py-0.5 rounded group-hover:bg-white transition-colors">
                      {card.action}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 line-clamp-1">
                    {card.title}
                  </span>
                  <span className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
                    {card.desc}
                  </span>
                  <div className="mt-2 text-[10px] font-bold text-white uppercase tracking-wide bg-indigo-600 px-3 py-1.5 rounded-full text-center w-full group-hover:bg-indigo-700 transition-colors shadow-sm">
                    {card.action || "View Details"}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Prototype B Footer (Transparency) */}
        {data.details && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Info size={12} /> Show More & Reasoning
              </span>
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {expanded && (
              <div className="px-3 pb-3 pt-1 text-xs bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-1">
                <div className="space-y-2">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Process
                    </span>
                    <p className="text-indigo-900 leading-relaxed font-mono bg-white p-2 rounded border border-gray-200">
                      {data.details.process}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">
                        Sources
                      </span>
                      <span className="text-gray-800 font-bold">
                        {data.details.sources_count}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">
                        Reasoning
                      </span>
                      <span className="text-gray-600 italic">
                        {data.details.reasoning}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeScenario, setActiveScenario] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const chatEndRef = useRef(null);

  // Auth: Anonymous Sign-in for Persistence
  useEffect(() => {
    const init = async () => {
      if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    init();
    return onAuthStateChanged(auth, setUser);
  }, []);

  // Sync Chat History from Firestore
  useEffect(() => {
    if (!user) return;

    // Path: /artifacts/{appId}/users/{userId}/messages
    const messagesRef = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "messages",
    );

    // Query filtered by current scenario
    const q = query(messagesRef, where("scenarioId", "==", activeScenario));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => d.data());

      // Sort in memory by createdAt
      msgs.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeA - timeB;
      });

      if (msgs.length === 0) {
        // Create initial welcome message if history is empty
        const welcome = {
          text:
            activeScenario === "home"
              ? `Welcome to ${SITE_BRAND.name}.`
              : `How can I help you with ${SCENARIOS[activeScenario].name}?`,
          cards: [],
          details: {
            process: "Init",
            reasoning: "System Ready",
            sources_count: 0,
          },
        };
        addDoc(messagesRef, {
          role: "assistant",
          content: welcome.text,
          data: welcome,
          scenarioId: activeScenario,
          createdAt: serverTimestamp(),
        });
      } else {
        setMessages(msgs);
      }
    });
    return () => unsubscribe();
  }, [user, activeScenario]);

  const handleSend = async (textOverride, e) => {
    if (e && e.preventDefault) e.preventDefault();
    const txt = typeof textOverride === "string" ? textOverride : inputValue;
    if (!txt.trim() || !user) return;

    if (!textOverride) setInputValue(""); // Clear input only if sent via text box
    setIsTyping(true);

    const messagesRef = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "messages",
    );

    // Save User Message
    await addDoc(messagesRef, {
      role: "user",
      content: txt,
      scenarioId: activeScenario,
      createdAt: serverTimestamp(),
    });

    // Get Bot Response (Mock NLP)
    const resp = await mockNlpApi(txt, activeScenario);

    // Save Bot Message
    await addDoc(messagesRef, {
      role: "assistant",
      content: resp.text,
      data: resp,
      scenarioId: activeScenario,
      createdAt: serverTimestamp(),
    });

    setIsTyping(false);
  };

  const handleCardAction = (topic) => {
    handleSend(`Tell me more about ${topic}`);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const scenario = activeScenario === "home" ? null : SCENARIOS[activeScenario];

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
      {/* Navbar */}
      <div
        className={`h-16 ${THEME.primary} text-white flex items-center px-6 shadow-md justify-between sticky top-0 z-30`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveScenario("home")}
        >
          <Grid /> <span className="font-bold text-xl">{SITE_BRAND.name}</span>{" "}
          <span className="opacity-50 text-sm">{SITE_BRAND.domain}</span>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium opacity-90">
          <button
            onClick={() => setActiveScenario("home")}
            className="hover:underline"
          >
            Home
          </button>
          {Object.values(SCENARIOS).map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className="hover:underline flex items-center gap-1"
            >
              {React.createElement(ICON_MAP[s.icon], { size: 14 })} {s.name}
            </button>
          ))}
        </div>
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu size={24} />
        </button>
      </div>
      {showMobileMenu && (
        <div className="md:hidden bg-slate-800 text-white p-4 absolute w-full z-20 space-y-2">
          <button
            onClick={() => {
              setActiveScenario("home");
              setShowMobileMenu(false);
            }}
            className="block w-full text-left p-2 hover:bg-slate-700 rounded"
          >
            Home
          </button>
          {Object.values(SCENARIOS).map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenario(s.id);
                setShowMobileMenu(false);
              }}
              className="block w-full text-left p-2 hover:bg-slate-700 rounded flex items-center gap-2"
            >
              {React.createElement(ICON_MAP[s.icon], { size: 14 })} {s.name}
            </button>
          ))}
        </div>
      )}
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 pb-24">
        {activeScenario === "home" ? (
          <>
            <div
              className={`rounded-3xl p-12 mb-8 text-center text-white shadow-xl ${THEME.gradient} bg-gradient-to-r`}
            >
              <h1 className="text-5xl font-bold mb-4">
                Welcome to {SITE_BRAND.name}
              </h1>
              <p className="text-xl opacity-90 mb-8">
                {SITE_BRAND.description}
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
              >
                <MessageSquare size={20} /> Open Assistant
              </button>
            </div>

            <Carousel />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(SCENARIOS).map((scen) => (
                <div
                  key={scen.id}
                  onClick={() => setActiveScenario(scen.id)}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white ${THEME.primary}`}
                  >
                    {React.createElement(ICON_MAP[scen.icon], { size: 24 })}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {scen.name}
                  </h3>
                  <p className="text-sm text-slate-500">{scen.heroSubtitle}</p>
                  <div className="mt-4 text-blue-600 font-bold text-xs uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                    Access <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats / Filler */}
            <div className="mt-20 border-t border-gray-200 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-60">
              <div>
                <div className="text-3xl font-bold text-slate-900">4.2m</div>
                <div className="text-sm text-slate-500">Citizens Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <div className="text-sm text-slate-500">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-500">Support Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">A+</div>
                <div className="text-sm text-slate-500">Security Rating</div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${THEME.secondary} ${THEME.text}`}
              >
                Official Department
              </span>
              <h1 className="text-4xl font-bold text-slate-900">
                {SCENARIOS[activeScenario].heroTitle}
              </h1>
              <p className="text-gray-600 text-lg">
                {SCENARIOS[activeScenario].heroSubtitle}
              </p>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-lg text-white font-medium ${THEME.primary}`}
                >
                  Start Service
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-slate-700 font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <MessageSquare size={16} /> Ask Assistant
                </button>
              </div>
            </div>
            <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
              {React.createElement(ICON_MAP[SCENARIOS[activeScenario].icon], {
                size: 80,
              })}
            </div>
          </div>
        )}
      </main>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        {isOpen && (
          <div className="w-[90vw] md:w-[380px] h-[550px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 mb-4 border border-gray-200">
            <div
              className={`p-4 flex justify-between items-center ${THEME.chatHeader}`}
            >
              <div className={`flex items-center gap-2 font-bold text-white`}>
                <Bot size={20} /> askMe
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white opacity-80 hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((m, i) => (
                <MessageBubble
                  key={i}
                  message={m}
                  onCardAction={handleCardAction}
                />
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border shadow-sm">
                    <span className="animate-pulse text-gray-400">...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form
              onSubmit={(e) => handleSend(null, e)}
              className="p-3 border-t bg-white"
            >
              <div className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-full text-white ${THEME.primary} disabled:opacity-50`}
                >
                  <Send size={18} />
                </button>
              </div>
              {activeScenario !== "home" && (
                <button
                  type="button"
                  onClick={() =>
                    setInputValue(SCENARIOS[activeScenario].querySuggestion)
                  }
                  className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
                >
                  Suggestion: "{SCENARIOS[activeScenario].querySuggestion}"
                </button>
              )}
            </form>
          </div>
        )}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-110 ${THEME.launcher}`}
          >
            <MessageSquare size={24} />
          </button>
        )}
      </div>{" "}
    </div>
  );
}
