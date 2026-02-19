// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Send,
//   User,
//   Bot,
//   X,
//   MessageSquare,
//   Landmark,
//   Car,
//   Briefcase,
//   Building,
//   ArrowRight,
//   Grid,
//   Home,
//   Menu,
//   FileText,
//   Info,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   HelpCircle,
//   ExternalLink,
//   MapPin,
//   Calendar,
//   DollarSign,
//   FileCheck,
//   Phone,
//   Users,
//   Clock,
//   Mail,
//   Globe,
// } from "lucide-react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInAnonymously,
//   onAuthStateChanged,
//   signInWithCustomToken,
// } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";

// // --- Firebase Configuration ---
// // Safely check for environment variable to prevent local crash.
// // Replace the object below with your ACTUAL Firebase config for local development.
// const firebaseConfig =
//   typeof __firebase_config !== "undefined"
//     ? JSON.parse(__firebase_config)
//     : {
//         apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//         authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//         projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//         storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//         appId: import.meta.env.VITE_FIREBASE_APP_ID,
//         measurementId: "G-9KDDVB1DVR",
//       };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const rawAppId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
// const appId = rawAppId.replace(/[^a-zA-Z0-9_-]/g, "_");

// // --- Configuration & Data ---

// const SITE_BRAND = {
//   name: "PublicSphere",
//   domain: ".gov",
//   description: "Transparency in Every Interaction",
// };

// // Theme: PublicSphere (Slate/Indigo) with Blue Chat Header
// const THEME = {
//   primary: "bg-slate-900",
//   primaryHover: "hover:bg-slate-800",
//   secondary: "bg-slate-50",
//   text: "text-slate-700",
//   border: "border-slate-200",
//   gradient: "from-slate-800 to-slate-900",
//   chatHeader: "bg-blue-600 text-white",
//   userBubble: "bg-indigo-600 text-white",
//   botAvatar: "bg-gray-100 text-slate-600",
//   launcher: "bg-slate-900 hover:bg-slate-800",
// };

// const SCENARIOS = {
//   tax: {
//     id: "tax",
//     name: "Tax Office",
//     brand: "TaxCentral",
//     icon: "Landmark",
//     heroTitle: "File Your Taxes with Confidence",
//     heroSubtitle:
//       "Our automated systems help you navigate the new fiscal year regulations.",
//     querySuggestion: "How to file taxes?",
//   },
//   vehicle: {
//     id: "vehicle",
//     name: "Vehicle Services",
//     brand: "AutoReg",
//     icon: "Car",
//     heroTitle: "Vehicle Services Portal",
//     heroSubtitle: "Renew registrations, pay fines, and manage titles online.",
//     querySuggestion: "How much is the renewal fee?",
//   },
//   benefits: {
//     id: "benefits",
//     name: "Unemployment",
//     brand: "LaborAssist",
//     icon: "Briefcase",
//     heroTitle: "Unemployment Assistance",
//     heroSubtitle:
//       "Supporting the workforce during transitions with financial aid and job placement.",
//     querySuggestion: "Am I eligible if I quit?",
//   },
//   housing: {
//     id: "housing",
//     name: "Housing Authority",
//     brand: "CityHomes",
//     icon: "Home",
//     heroTitle: "Affordable Housing Initiative",
//     heroSubtitle:
//       "Connecting families with safe, affordable, and sustainable housing options.",
//     querySuggestion: "What is the income limit?",
//   },
// };

// const CAROUSEL_SLIDES = [
//   {
//     url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
//     title: "Fiscal Responsibility",
//     subtitle: "Transparent tax allocation.",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80",
//     title: "Infrastructure",
//     subtitle: "Building safer roads.",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1521791136064-7985ccfd7171?auto=format&fit=crop&q=80",
//     title: "Workforce",
//     subtitle: "Empowering citizens.",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80",
//     title: "Housing",
//     subtitle: "Initiatives for every family.",
//   },
// ];

// const ICON_MAP = {
//   FileText,
//   DollarSign,
//   Car,
//   FileCheck,
//   Calendar,
//   Home,
//   MapPin,
//   Landmark,
//   Grid,
//   Users,
//   Phone,
//   ExternalLink,
//   Mail,
//   Globe,
//   Briefcase,
// };

// const PROTOTYPES = [
//   { id: "B", name: "Expandable Details", icon: <ChevronDown size={16} /> },
// ];

// // --- Custom NLP API Simulation (Prototype B: Rich Dashboard + Transparency) ---

// async function mockNlpApi(query, scenarioId) {
//   const delay = Math.floor(Math.random() * 800) + 400;
//   await new Promise((resolve) => setTimeout(resolve, delay));
//   const text = query.toLowerCase();

//   // --- Helper: Rich Response Generator ---
//   const getRichResponse = (context) => {
//     switch (context) {
//       case "tax":
//         return {
//           text: "I found the following resources for tax payments and filings.",
//           cards: [
//             {
//               title: "Pay Property Tax",
//               desc: "Secure online payment",
//               iconName: "DollarSign",
//               action: "View Details",
//             },
//             {
//               title: "Assessment Map",
//               desc: "View parcel data",
//               iconName: "MapPin",
//               action: "View Details",
//             },
//           ],
//           topics: [
//             "Download Exemption Forms",
//             "Payment Plan Options",
//             "Dispute an Assessment",
//           ],
//         };
//       case "vehicle":
//         return {
//           text: "Select a service below to manage your vehicle.",
//           cards: [
//             {
//               title: "Pay Citation",
//               desc: "Clear parking tickets",
//               iconName: "FileCheck",
//               action: "View Details",
//             },
//             {
//               title: "Resident Permit",
//               desc: "Zone A, B, & C",
//               iconName: "Car",
//               action: "View Details",
//             },
//           ],
//           topics: [
//             "Report Abandoned Vehicle",
//             "Street Sweeping Schedule",
//             "Contest a Ticket",
//           ],
//         };
//       case "benefits":
//         return {
//           text: "Access community assistance resources below.",
//           cards: [
//             {
//               title: "Food Pantry",
//               desc: "Find local distribution",
//               iconName: "MapPin",
//               action: "View Details",
//             },
//             {
//               title: "Cash Assistance",
//               desc: "Emergency funds",
//               iconName: "DollarSign",
//               action: "View Details",
//             },
//           ],
//           topics: [
//             "Job Training Programs",
//             "Child Care Subsidy",
//             "Senior Services",
//           ],
//         };
//       case "housing":
//         return {
//           text: "Use these tools to find or apply for housing.",
//           cards: [
//             {
//               title: "Section 8 App",
//               desc: "Waitlist status",
//               iconName: "Home",
//               action: "View Details",
//             },
//             {
//               title: "Available Units",
//               desc: "Affordable listings",
//               iconName: "Grid",
//               action: "View Details",
//             },
//           ],
//           topics: [
//             "Landlord Registration",
//             "Tenant Rights Handbook",
//             "Emergency Shelter List",
//           ],
//         };
//       default:
//         return null;
//     }
//   };

//   // --- Handle Specific Card Details Requests ---
//   if (text.startsWith("tell me more about")) {
//     const topic = text.replace("tell me more about ", "").replace(/\?$/, "");
//     return {
//       text: `Here are the details for **${topic}**. \n\nThis service allows you to manage your requirements online. Typically, you will need to provide identification and relevant supporting documents. Processing times vary by season but usually take 3-5 business days.`,
//       details: {
//         process: `Intent: Detail Retrieval (${topic}) -> Database Lookup -> Summary Generation`,
//         reasoning: `User requested specific information about '${topic}'. Retrieved standard operating procedure summary.`,
//         sources_count: 1,
//       },
//     };
//   }

//   // --- Greeting ---
//   if (
//     text.match(
//       /\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/,
//     )
//   ) {
//     if (scenarioId === "home") {
//       return {
//         text: "Welcome to PublicSphere.",
//         // No details/transparency/cards for greeting
//       };
//     } else {
//       const scen = SCENARIOS[scenarioId];
//       return {
//         text: `Hello! I am the askMe assistant for ${scen.name}. How can I help you today?`,
//       };
//     }
//   }

//   // --- Routing & Context ---
//   let context = scenarioId;

//   // FIX: Robust Context Matching for Home Page or Cross-Department Queries
//   if (
//     scenarioId === "home" ||
//     text.includes("tax") ||
//     text.includes("vehicle") ||
//     text.includes("benefit") ||
//     text.includes("housing") ||
//     text.includes("child")
//   ) {
//     if (
//       text.includes("child") ||
//       text.includes("care") ||
//       text.includes("benefit") ||
//       text.includes("food") ||
//       text.includes("unemployment")
//     ) {
//       context = "benefits";
//     } else if (
//       text.includes("tax") ||
//       text.includes("file") ||
//       text.includes("return")
//     ) {
//       context = "tax";
//     } else if (
//       text.includes("vehicle") ||
//       text.includes("car") ||
//       text.includes("park") ||
//       text.includes("ticket")
//     ) {
//       context = "vehicle";
//     } else if (text.includes("hous") || text.includes("rent")) {
//       context = "housing";
//     }
//   }

//   const response = getRichResponse(context);

//   if (response) {
//     // --- Detailed Logic for Specific Queries (Rich Dashboard Style) ---

//     // Tax
//     if (
//       context === "tax" &&
//       (text.includes("file") ||
//         text.includes("return") ||
//         text.includes("how to"))
//     ) {
//       response.text =
//         "Filing a tax return involves three main steps. First, gather your income documents like [W-2s](https://www.irs.gov/forms-pubs/about-form-w-2) from employers and [1099s](https://www.irs.gov/forms-pubs/about-form-1099). Next, choose a filing method such as [e-filing](https://www.irs.gov/filing/e-file-options) or mailing paper forms. Finally, submit your return and track your [refund status](https://www.irs.gov/refunds) online.";
//       response.cards = [
//         {
//           title: "E-File Online",
//           desc: "Fastest processing",
//           iconName: "FileCheck",
//           action: "Start",
//         },
//         {
//           title: "Download Forms",
//           desc: "Paper submission",
//           iconName: "FileText",
//           action: "PDF",
//         },
//       ];
//       response.topics = [
//         "Check Refund Status",
//         "Filing Extensions",
//         "Audit Support",
//       ];

//       response.details = {
//         process:
//           "Intent: Tax Process -> Step Extraction (Form 1040) -> Sequence Generation -> Output",
//         reasoning:
//           "Synthesized standard filing procedure from IRS 1040 Instructions.",
//         sources_count: 3,
//       };
//     }

//     // Vehicle
//     else if (
//       context === "vehicle" &&
//       (text.includes("renew") || text.includes("registration"))
//     ) {
//       response.text =
//         "To renew your registration, verify your insurance status and ensure your emissions test is valid. You can then complete the renewal online using your RIN number.";
//       response.cards = [
//         {
//           title: "Renew Registration",
//           desc: "Use RIN number",
//           iconName: "Car",
//           action: "View Details",
//         },
//         {
//           title: "Check Insurance",
//           desc: "Verify status",
//           iconName: "FileCheck",
//           action: "View Details",
//         },
//       ];
//       response.topics = [
//         "Fee Schedule",
//         "Emissions Info",
//         "Lost Sticker Replacement",
//       ];

//       response.details = {
//         process:
//           "Intent: Renewal Steps -> Pre-requisite Check (Insurance) -> Portal Guide -> Output",
//         reasoning: "Standard renewal procedure verification.",
//         sources_count: 2,
//       };
//     }

//     // Benefits / Childcare (FIXED)
//     else if (context === "benefits") {
//       if (text.includes("child") || text.includes("care")) {
//         response.text =
//           "For **Child Care Assistance**, you must meet income eligibility requirements. You can apply for a subsidy online or find a licensed provider using the tools below.";
//         response.cards = [
//           {
//             title: "Apply for Subsidy",
//             desc: "Child Care",
//             iconName: "Users",
//             action: "View Details",
//           },
//           {
//             title: "Find Provider",
//             desc: "Search Database",
//             iconName: "MapPin",
//             action: "Search",
//           },
//         ];
//         response.topics = [
//           "Eligibility Calculator ",
//           "Provider Quality Ratings",
//           "Payment Schedule",
//         ];

//         response.details = {
//           process:
//             "Intent: Child Care -> Program Lookup (CCDBG) -> Resource Mapping -> Output",
//           reasoning:
//             "Identified 'Child Care' intent within Benefits context. Retrieved specific subsidy programs.",
//           sources_count: 2,
//         };
//       } else if (text.includes("apply") || text.includes("claim")) {
//         response.text =
//           "To apply for benefits, you must first create an account on the Claimant Portal. You will need your employment history for the last 18 months.";
//         response.cards = [
//           {
//             title: "Claimant Portal",
//             desc: "Start application",
//             iconName: "Briefcase",
//             action: "View Details",
//           },
//           {
//             title: "Eligibility Guide",
//             desc: "Check requirements",
//             iconName: "FileText",
//             action: "View Details",
//           },
//         ];
//         response.topics = [
//           "Weekly Certification",
//           "Appeal Process",
//           "Job Search Log",
//         ];

//         response.details = {
//           process:
//             "Intent: Application Steps -> Guide Retrieval (Claimant Portal) -> Step Summarization -> Output",
//           reasoning:
//             "Step-by-step extraction from LaborAssist Intake Protocol.",
//           sources_count: 2,
//         };
//       }
//     }

//     // Housing
//     else if (
//       context === "housing" &&
//       (text.includes("limit") || text.includes("income"))
//     ) {
//       response.text =
//         "The income limit is $52,400 for a family of four. This is 50% of the Area Median Income.";
//       response.cards = [
//         {
//           title: "Income Tables",
//           desc: "View PDF Chart",
//           iconName: "FileText",
//           action: "View Details",
//         },
//         {
//           title: "Calculator",
//           desc: "Check eligibility",
//           iconName: "DollarSign",
//           action: "View Details",
//         },
//       ];
//       response.topics = [
//         "Fair Market Rents",
//         "Utility Allowances",
//         "Portability",
//       ];

//       response.details = {
//         process:
//           "Intent: Financial Limits -> Table Lookup (HUD 2024 AMI) -> Calculation (Family size 4) -> Output",
//         reasoning: "Direct lookup: 2024 HUD AMI Table for Region 1.",
//         sources_count: 2,
//       };
//     }

//     // Generic fallback for context but unknown intent
//     else if (!response.details) {
//       response.details = {
//         process: `Intent Detected: ${text} -> Knowledge Base Lookup (${context}) -> Rich Response Generation`,
//         reasoning: `User queried ${context} services. Displayed dashboard with relevant tools and topics.`,
//         sources_count: 2,
//       };
//     }

//     return response;
//   }

//   // Fallback
//   return {
//     text: "I can help you locate that service. Try these quick links:",
//     cards: [
//       {
//         title: "Browse Services",
//         desc: "View all departments",
//         iconName: "Grid",
//         action: "View Details",
//       },
//     ],
//     topics: ["Tax Office", "City Parking", "Community Aid", "Housing Help"],
//     details: {
//       process: "Fallback",
//       reasoning: "Generic intent match.",
//       sources_count: 0,
//     },
//   };
// }

// // --- Components ---

// // Image Carousel Component
// const Carousel = () => {
//   const [current, setCurrent] = useState(0);

//   const next = useCallback(() => {
//     setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
//   }, []);

//   const prev = useCallback(() => {
//     setCurrent(
//       (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length,
//     );
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(next, 5000);
//     return () => clearInterval(timer);
//   }, [next]);

//   return (
//     <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12 group border border-white/20 bg-gray-900">
//       {/* Slides */}
//       {CAROUSEL_SLIDES.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//             index === current
//               ? "opacity-100 z-10"
//               : "opacity-0 z-0 pointer-events-none"
//           }`}
//         >
//           <img
//             src={slide.url}
//             alt={slide.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-8">
//             <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
//               {slide.title}
//             </h3>
//             <p className="text-white/90 text-lg drop-shadow-sm">
//               {slide.subtitle}
//             </p>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={prev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-20"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={next}
//         className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-20"
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//         {CAROUSEL_SLIDES.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             className={`h-2 rounded-full transition-all duration-300 ${
//               idx === current
//                 ? "bg-white w-8"
//                 : "bg-white/50 w-2 hover:bg-white/80"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Helper for parsing markdown links in bubbles
// const parseMarkdownLinks = (text) => {
//   if (!text) return null;
//   const parts = text.split(/(\[.*?\]\(.*?\))/g);
//   return parts.map((part, index) => {
//     const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
//     if (match) {
//       return (
//         <a
//           key={index}
//           href={match[2]}
//           className="text-indigo-600 font-bold hover:underline"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {match[1]}
//         </a>
//       );
//     }
//     // Handle **bold** text manually if needed, or simple text
//     const boldParts = part.split(/(\*\*.*?\*\*)/g);
//     return boldParts.map((subPart, subIndex) => {
//       if (subPart.startsWith("**") && subPart.endsWith("**")) {
//         return (
//           <strong key={`${index}-${subIndex}`}>{subPart.slice(2, -2)}</strong>
//         );
//       }
//       return <span key={`${index}-${subIndex}`}>{subPart}</span>;
//     });
//   });
// };

// const MessageBubble = ({ message, onCardAction }) => {
//   const isUser = message.role === "user";
//   const [expanded, setExpanded] = useState(false);
//   const data = message.data || { text: message.content };

//   if (isUser) {
//     return (
//       <div className="flex justify-end mb-6">
//         <div
//           className={`max-w-[85%] p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed ${THEME.userBubble}`}
//         >
//           {message.content}
//         </div>
//       </div>
//     );
//   }

//   // Prototype B Rendering (Rich Dashboard + Expandable Details)
//   return (
//     <div className="flex justify-start mb-6 gap-3">
//       <div
//         className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${THEME.botAvatar}`}
//       >
//         <Bot size={16} />
//       </div>
//       <div className="flex flex-col gap-3 max-w-[95%] w-full">
//         {/* 1. Main Text Bubble */}
//         <div className="relative p-4 rounded-2xl rounded-tl-none shadow-sm bg-white border border-gray-200 text-gray-800">
//           <div className="text-sm leading-relaxed">
//             {parseMarkdownLinks(data.text)}
//           </div>
//         </div>

//         {/* 2. Rich UI Cards (Grid) with VIEW DETAILS */}
//         {data.cards && data.cards.length > 0 && (
//           <div className="grid grid-cols-2 gap-3">
//             {data.cards.map((card, idx) => {
//               const IconComponent = ICON_MAP[card.iconName] || ExternalLink;
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => onCardAction(card.title)}
//                   className="flex flex-col bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
//                 >
//                   <div className="flex items-start justify-between w-full mb-2">
//                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
//                       <IconComponent size={18} />
//                     </div>
//                     <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-1.5 py-0.5 rounded group-hover:bg-white transition-colors">
//                       {card.action}
//                     </span>
//                   </div>
//                   <span className="text-xs font-bold text-gray-800 line-clamp-1">
//                     {card.title}
//                   </span>
//                   <span className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
//                     {card.desc}
//                   </span>
//                   <div className="mt-2 text-[10px] font-bold text-white uppercase tracking-wide bg-indigo-600 px-3 py-1.5 rounded-full text-center w-full group-hover:bg-indigo-700 transition-colors shadow-sm">
//                     {card.action || "View Details"}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {/* 3. Textual Topic List */}
//         {data.topics && data.topics.length > 0 && (
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//             <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100">
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
//                 Related Topics
//               </span>
//             </div>
//             <div className="divide-y divide-gray-100">
//               {data.topics.map((topic, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => onCardAction(topic)}
//                   className="w-full text-left px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center justify-between group transition-colors"
//                 >
//                   {topic}
//                   <ArrowRight
//                     size={12}
//                     className="text-gray-300 group-hover:text-indigo-500 transition-colors"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* 4. Prototype B Footer (Transparency) - Only if details exist */}
//         {/* {data.details && (
//           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-1">
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="w-full flex items-center justify-between px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-gray-500 hover:bg-gray-50 transition-colors"
//             >
//               <span className="flex items-center gap-1.5">
//                 <Info size={12} /> Show More & Reasoning
//               </span>
//               {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
//             </button>
//             {expanded && (
//               <div className="px-3 pb-3 pt-1 text-xs bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-1">
//                 <div className="space-y-2">
//                   <div>
//                     <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">
//                       Process
//                     </span>
//                     <p className="text-indigo-900 leading-relaxed font-mono bg-white p-2 rounded border border-gray-200">
//                       {data.details.process}
//                     </p>
//                   </div>
//                   <div className="flex gap-4">
//                     <div>
//                       <span className="block text-[10px] text-gray-400 uppercase font-bold">
//                         Sources
//                       </span>
//                       <span className="text-gray-800 font-bold">
//                         {data.details.sources_count}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="block text-[10px] text-gray-400 uppercase font-bold">
//                         Reasoning
//                       </span>
//                       <span className="text-gray-600 italic">
//                         {data.details.reasoning}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// // --- MAIN APP ---

// export default function App() {
//   const [activeScenario, setActiveScenario] = useState("home");
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // NEW: Session ID to isolate chats per page load
//   const [sessionId] = useState(() => Math.random().toString(36).substring(7));
//   const chatEndRef = useRef(null);

//   // Auth: Anonymous Sign-in for Persistence
//   useEffect(() => {
//     const init = async () => {
//       if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
//         await signInWithCustomToken(auth, __initial_auth_token);
//       } else {
//         await signInAnonymously(auth);
//       }
//     };
//     init();
//     return onAuthStateChanged(auth, setUser);
//   }, []);

//   // Sync Chat History from Firestore
//   useEffect(() => {
//     if (!user) return;

//     // Path: /artifacts/{appId}/users/{userId}/messages
//     const messagesRef = collection(
//       db,
//       "artifacts",
//       appId,
//       "users",
//       user.uid,
//       "messages",
//     );

//     // Query filtered by current scenario
//     const q = query(messagesRef, where("scenarioId", "==", activeScenario));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const allMsgs = snapshot.docs.map((d) => d.data());
//       // Filter for current session ID only
//       const msgs = allMsgs
//         .filter((m) => m.sessionId === sessionId)
//         .sort((a, b) => {
//           return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
//         });

//       if (msgs.length === 0) {
//         // Create initial welcome message if history is empty for this session
//         const welcome = {
//           text:
//             activeScenario === "home"
//               ? "Welcome to PublicSphere."
//               : `How can I help you with ${SCENARIOS[activeScenario].name}?`,
//           // Removed details object to hide transparency footer initially
//         };
//         addDoc(messagesRef, {
//           role: "assistant",
//           content: welcome.text,
//           data: welcome,
//           scenarioId: activeScenario,
//           sessionId: sessionId,
//           createdAt: serverTimestamp(),
//         });
//       } else {
//         setMessages(msgs);
//       }
//     });
//     return () => unsubscribe();
//   }, [user, activeScenario, sessionId]);

//   const handleSend = async (e, textOverride) => {
//     // FIX: Core fix for form submission preventing reload
//     if (e && e.preventDefault) e.preventDefault();

//     const txt = typeof textOverride === "string" ? textOverride : inputValue;
//     if (!txt.trim() || !user) return;

//     if (!textOverride) setInputValue("");
//     setIsTyping(true);

//     try {
//       const messagesRef = collection(
//         db,
//         "artifacts",
//         appId,
//         "users",
//         user.uid,
//         "messages",
//       );

//       // Save User Message
//       await addDoc(messagesRef, {
//         role: "user",
//         content: txt,
//         scenarioId: activeScenario,
//         sessionId: sessionId,
//         createdAt: serverTimestamp(),
//       });

//       // Get Bot Response (Mock NLP)
//       const resp = await mockNlpApi(txt, activeScenario);

//       // Save Bot Message
//       await addDoc(messagesRef, {
//         role: "assistant",
//         content: resp.text,
//         data: resp,
//         scenarioId: activeScenario,
//         sessionId: sessionId,
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleCardAction = (topic) => {
//     handleSend(null, `Tell me more about ${topic}`);
//   };

//   // Scroll to bottom on new message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isOpen, isTyping]);

//   const scenario = activeScenario === "home" ? null : SCENARIOS[activeScenario];

//   return (
//     <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
//       {/* Navbar */}
//       <div
//         className={`h-16 ${THEME.primary} text-white flex items-center px-6 shadow-md justify-between sticky top-0 z-30`}
//       >
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => setActiveScenario("home")}
//         >
//           <Grid /> <span className="font-bold text-xl">{SITE_BRAND.name}</span>{" "}
//           <span className="opacity-50 text-sm">{SITE_BRAND.domain}</span>
//         </div>
//         <div className="hidden md:flex gap-4 text-sm font-medium opacity-90">
//           <button
//             onClick={() => setActiveScenario("home")}
//             className="hover:underline"
//           >
//             Home
//           </button>
//           {Object.values(SCENARIOS).map((s) => (
//             <button
//               key={s.id}
//               onClick={() => setActiveScenario(s.id)}
//               className="hover:underline flex items-center gap-1"
//             >
//               {React.createElement(ICON_MAP[s.icon], { size: 14 })} {s.name}
//             </button>
//           ))}
//         </div>
//         <button
//           className="md:hidden p-2 hover:bg-white/10 rounded"
//           onClick={() => setShowMobileMenu(!showMobileMenu)}
//         >
//           <Menu size={24} />
//         </button>
//       </div>

//       {showMobileMenu && (
//         <div className="md:hidden bg-slate-800 text-white p-4 absolute w-full z-20 space-y-2">
//           <button
//             onClick={() => {
//               setActiveScenario("home");
//               setShowMobileMenu(false);
//             }}
//             className="block w-full text-left p-2 hover:bg-slate-700 rounded"
//           >
//             Home
//           </button>
//           {Object.values(SCENARIOS).map((s) => (
//             <button
//               key={s.id}
//               onClick={() => {
//                 setActiveScenario(s.id);
//                 setShowMobileMenu(false);
//               }}
//               className="block w-full text-left p-2 hover:bg-slate-700 rounded flex items-center gap-2"
//             >
//               {React.createElement(ICON_MAP[s.icon], { size: 14 })} {s.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto p-6 pb-24">
//         {activeScenario === "home" ? (
//           <>
//             <div
//               className={`rounded-3xl p-12 mb-8 text-center text-white shadow-xl ${THEME.gradient} bg-gradient-to-r`}
//             >
//               <h1 className="text-5xl font-bold mb-4">
//                 Welcome to {SITE_BRAND.name}
//               </h1>
//               <p className="text-xl opacity-90 mb-8">
//                 {SITE_BRAND.description}
//               </p>
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
//               >
//                 <MessageSquare size={20} /> Open Assistant
//               </button>
//             </div>

//             <Carousel />

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {Object.values(SCENARIOS).map((scen) => (
//                 <div
//                   key={scen.id}
//                   onClick={() => setActiveScenario(scen.id)}
//                   className="group bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all relative overflow-hidden"
//                 >
//                   <div
//                     className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white ${THEME.primary}`}
//                   >
//                     {React.createElement(ICON_MAP[scen.icon], { size: 24 })}
//                   </div>
//                   <h3 className="font-bold text-lg text-slate-900 mb-2">
//                     {scen.name}
//                   </h3>
//                   <p className="text-sm text-slate-500">{scen.heroSubtitle}</p>
//                   <div className="mt-4 text-blue-600 font-bold text-xs uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
//                     Access <ArrowRight size={14} />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Stats / Filler */}
//             <div className="mt-20 border-t border-gray-200 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-60">
//               <div>
//                 <div className="text-3xl font-bold text-slate-900">4.2m</div>
//                 <div className="text-sm text-slate-500">Citizens Served</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-slate-900">99.9%</div>
//                 <div className="text-sm text-slate-500">Uptime</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-slate-900">24/7</div>
//                 <div className="text-sm text-slate-500">Support Access</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-slate-900">A+</div>
//                 <div className="text-sm text-slate-500">Security Rating</div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-sm p-12 border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
//             <div className="flex-1 space-y-6">
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${THEME.secondary} ${THEME.text}`}
//               >
//                 Official Department
//               </span>
//               <h1 className="text-4xl font-bold text-slate-900">
//                 {SCENARIOS[activeScenario].heroTitle}
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 {SCENARIOS[activeScenario].heroSubtitle}
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   className={`px-6 py-3 rounded-lg text-white font-medium ${THEME.primary}`}
//                 >
//                   Start Service
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(true)}
//                   className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-slate-700 font-medium hover:bg-gray-50 flex items-center gap-2"
//                 >
//                   <MessageSquare size={16} /> Ask Assistant
//                 </button>
//               </div>
//             </div>
//             <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
//               {React.createElement(ICON_MAP[SCENARIOS[activeScenario].icon], {
//                 size: 80,
//               })}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Chat Widget */}
//       <div className="fixed bottom-6 right-6 z-40">
//         {isOpen && (
//           <div className="w-[90vw] md:w-[380px] h-[550px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 mb-4 border border-gray-200">
//             <div
//               className={`p-4 flex justify-between items-center ${THEME.chatHeader}`}
//             >
//               <div className={`flex items-center gap-2 font-bold text-white`}>
//                 <Bot size={20} /> askMe
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-white opacity-80 hover:opacity-100"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//               {messages.map((m, i) => (
//                 <MessageBubble
//                   key={i}
//                   message={m}
//                   onCardAction={handleCardAction}
//                 />
//               ))}
//               {isTyping && (
//                 <div className="flex justify-start mb-4">
//                   <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border shadow-sm">
//                     <span className="animate-pulse text-gray-400">...</span>
//                   </div>
//                 </div>
//               )}
//               <div ref={chatEndRef} />
//             </div>
//             <form
//               onSubmit={(e) => handleSend(e, null)}
//               className="p-3 border-t bg-white"
//             >
//               <div className="flex gap-2">
//                 <input
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   disabled={!inputValue.trim()}
//                   className={`p-2 rounded-full text-white ${THEME.primary} disabled:opacity-50`}
//                 >
//                   <Send size={18} />
//                 </button>
//               </div>
//               {activeScenario !== "home" && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setInputValue(SCENARIOS[activeScenario].querySuggestion)
//                   }
//                   className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
//                 >
//                   Suggestion: "{SCENARIOS[activeScenario].querySuggestion}"
//                 </button>
//               )}
//             </form>
//           </div>
//         )}
//         {!isOpen && (
//           <button
//             onClick={() => setIsOpen(true)}
//             className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-110 ${THEME.launcher}`}
//           >
//             <MessageSquare size={24} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

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
  Trash2,
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
const firebaseConfig =
  typeof __firebase_config !== "undefined"
    ? JSON.parse(__firebase_config)
    : {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
  description: "The Unified Citizen Services Portal",
};

const THEME = {
  primary: "bg-blue-700",
  primaryHover: "hover:bg-blue-800",
  secondary: "bg-blue-50",
  text: "text-blue-700",
  border: "border-blue-200",
  gradient: "from-blue-700 to-sky-600",
  chatHeader: "bg-blue-600 text-white",
  userBubble: "bg-blue-600 text-white",
  botAvatar: "bg-blue-600 text-white",
  launcher: "bg-blue-600 hover:bg-blue-700",
};

const SCENARIOS = {
  tax: {
    id: "tax",
    name: "Tax Office",
    brand: "TaxCentral",
    icon: <Landmark size={20} />,
    heroTitle: "Annual Tax Assessment",
    heroSubtitle:
      "Review your obligations and submit required fiscal documentation.",
    querySuggestion: "How to file taxes?",
  },
  vehicle: {
    id: "vehicle",
    name: "Vehicle Services",
    brand: "AutoReg",
    icon: <Car size={20} />,
    heroTitle: "Vehicle Services Portal",
    heroSubtitle: "Renew registrations, pay fines, and manage titles online.",
    querySuggestion: "Renew vehicle registration",
  },
  benefits: {
    id: "benefits",
    name: "Unemployment",
    brand: "LaborAssist",
    icon: <Briefcase size={20} />,
    heroTitle: "Unemployment Assistance",
    heroSubtitle:
      "Supporting the workforce during transitions with financial aid and job placement.",
    querySuggestion: "Apply for child care benefits",
  },
  housing: {
    id: "housing",
    name: "Housing Authority",
    brand: "CityHomes",
    icon: <Home size={20} />,
    heroTitle: "Affordable Housing Initiative",
    heroSubtitle:
      "Connecting families with safe, affordable, and sustainable housing options.",
    querySuggestion: "How to apply for housing?",
  },
};

const CAROUSEL_SLIDES = [
  {
    url: "https://i.ibb.co/q37JWdzN/family-financial-budget-household-planning-income-allocation-expense-tracking-savings-strategy-econo.webp",
    title: "Fiscal Responsibility",
    subtitle: "Transparent local tax allocation.",
  },
  {
    url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80",
    title: "Infrastructure",
    subtitle: "Building safer, smarter roads.",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    title: "Public Assemblies",
    subtitle: "Engaging our community through dialogue.",
  },
  {
    url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80",
    title: "Community Welfare",
    subtitle: "Supporting families and local youth programs.",
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
  Trash2,
};

// --- Helper: Markdown Parser ---
const parseMarkdown = (text) => {
  if (!text) return null;
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={`link-${index}`}
          href={linkMatch[2]}
          className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
    }
    const boldParts = part.split(/(\*\*.+?\*\*)/g);
    return boldParts.map((bPart, bIndex) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return (
          <strong
            key={`bold-${index}-${bIndex}`}
            className="font-extrabold text-slate-900"
          >
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`text-${index}-${bIndex}`}>{bPart}</span>;
    });
  });
};

// --- Custom NLP API Simulation (Prototype B: Expandable Details) ---

async function mockNlpApi(query, scenarioId) {
  const delay = Math.floor(Math.random() * 400) + 400;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const text = query.toLowerCase().trim();

  // --- 1. Handling Detailed Expansion (View Details Clicks) ---

  if (text === "apply for subsidy") {
    return {
      text: "Childcare subsidies help cover care costs, with application processes varying by region (e.g., [National Childcare Scheme (NCS)](https://www.ncs.gov.ie/en/) in Ireland, [Services Australia](https://www.servicesaustralia.gov.au/child-care-subsidy) in Australia). Key requirements usually include proof of income, employment/study status, and child’s details (PPSN/DOB), typically processed online via government portals.\n\n**Common Steps to Apply**\n• **Check Eligibility:** Assess income limits and required hours of care.\n• **Gather Documents:** Prepare pay stubs, employment letters, and proof of residency.\n• **Submit Application:** Use official government portals.\n• **Confirm Provider:** Ensure your childcare provider is registered/contracted with the scheme.\n\n**Regional Examples**\n• **Ireland (NCS):** Offers universal and income-assessed subsidies.\n• **Australia (CCS):** Requires a claim via Centrelink.\n\n**Important:** Apply as soon as possible, as some schemes cannot backdate payments more than 28 days.",
      details: {
        process: "Detail retrieval",
        reasoning: "Synthesized multi-regional subsidy application guidelines.",
        sources_count: 5,
      },
    };
  }

  if (text === "benefit finder") {
    return {
      text: "Find licensed childcare providers using government-approved search tools like [Starting Blocks](https://www.startingblocks.gov.au/) (AU) or local Family Information Services (UK) to check quality ratings and inspection reports.\n\n**Key Resources for Finding Providers**\n• **Government Portals:** Check state department websites for licensed centers or national sites like [Gov.uk](https://www.gov.uk/).\n• **Search Engines:** Use platforms such as Childcare.co.uk to find local nannies and nurseries.\n\n**Steps to Take When Selecting a Provider**\n1. **Verify Credentials:** Ensure the provider is registered and authorized.\n2. **Conduct Tours:** Visit the facility to assess safety and interaction.\n3. **Check Reviews:** Look at feedback from other parents.\n\n**What to Look for During a Visit**\n• **Interaction:** Providers should be actively engaged with the children.\n• **Safety:** Ensure the premises are secure and well-maintained.",
      details: {
        process: "Provider search logic",
        reasoning:
          "Extracted safety and quality benchmarks from accreditation standards.",
        sources_count: 4,
      },
    };
  }

  // --- 2. Handling Topic Clicks ---

  if (text === "eligibility calculator") {
    return {
      text: "UK childcare support includes 15-30 hours of free care, Tax-Free Childcare, or Universal Credit, based on income and working status. Eligible working parents in England usually need to earn over the National Minimum Wage for 16 hours/week and under £100k adjusted net income. Use the [GOV.UK calculator](https://www.gov.uk/childcare-calculator) to compare options.\n\n**Key Eligibility & Information**\n• **Age Groups:** 9 months up to 4 years old.\n• **Income Thresholds:** Earn at least minimum wage and under £100,000.\n• **Working Status:** Both parents must be working (or one in a single-parent family).\n\n**Types of Support**\n• **15/30 Hours Free:** For 3-4 year olds.\n• **Tax-Free Childcare:** Up to £2,000 a year per child.\n• **Universal Credit:** Covers up to 85% of costs.",
      details: {
        process: "Eligibility synthesis",
        reasoning: "Parsed UK 2025/26 tax year childcare thresholds.",
        sources_count: 3,
      },
    };
  }

  if (text === "provider quality ratings") {
    return {
      text: "Childcare Quality Rating and Improvement Systems (QRIS) are state-specific tools that measure, improve, and communicate the quality of early childhood programs, often using a star-rating system.\n\n**Key Aspects of Quality Ratings**\n• **Purpose:** QRIS helps parents identify high-quality care beyond basic licensing.\n• **Rating Criteria:** Based on staff qualifications, curriculum, and safety features.\n• **Star Ratings:** Typically 1-to-5 stars denote levels of standard met.\n\n**How to Find and Use Ratings**\n• **Search Online:** Use the Child Care Aware® of America website.\n• **Check Local Records:** View inspection visits and violations for the past three years.",
      details: {
        process: "QRIS Data retrieval",
        reasoning: "Cross-referenced US state-level accreditation benchmarks.",
        sources_count: 4,
      },
    };
  }

  if (text === "payment schedule") {
    return {
      text: "Childcare subsidy payments follow specific cycles. Most government schemes pay in arrears, meaning funds are released after care has been provided and attendance has been verified.\n\n**Standard Timelines**\n• **Frequency:** Payments are typically processed every 2 or 4 weeks.\n• **Method:** Subsidies are usually paid directly to the registered provider.\n• **Annual Reviews:** Eligibility and payment tiers are reviewed annually; ensure your income data is updated.",
      details: {
        process: "Financial schedule logic",
        reasoning: "Analyzed standard government disbursement protocols.",
        sources_count: 2,
      },
    };
  }

  // --- 3. Base Intent Matching (Short Answer Leads) ---

  const getRichResponse = (context) => {
    switch (context) {
      case "benefits":
        return {
          text: "Childcare subsidies and benefit schemes provide financial support to help working families manage the cost of early education. Eligibility is primarily determined by household income, working hours, and the age of your child.",
          cards: [
            {
              title: "Apply for Subsidy",
              desc: "Ages 0-5. Apply for financial assistance online.",
              iconName: "Users",
              action: "View Details",
              color: "blue",
            },
            {
              title: "Benefit Finder",
              desc: "Locate and compare licensed providers near you.",
              iconName: "MapPin",
              action: "View Details",
              color: "green",
            },
          ],
          topics: [
            "Eligibility Calculator",
            "Provider Quality Ratings",
            "Payment Schedule",
          ],
          details: {
            process: "Benefits Routing",
            reasoning:
              "Identified childcare intent. Retrieved summary and primary intake/search cards.",
            sources_count: 3,
          },
        };
      case "housing":
        return {
          text: "To apply for housing assistance, start by verifying your eligibility based on [regional income limits](https://www.huduser.gov/portal/datasets/il.html). You can manage Section 8 applications and browse affordable listings via the portals below.",
          cards: [
            {
              title: "Section 8 Info",
              desc: "Program requirements and waitlists.",
              iconName: "Home",
              action: "View Details",
              color: "blue",
            },
            {
              title: "Affordable Map",
              desc: "Search current affordable city listings.",
              iconName: "MapPin",
              action: "View Details",
              color: "green",
            },
          ],
          topics: [
            "Income Limit Chart",
            "Required Documentation",
            "Emergency Housing",
          ],
          details: {
            process: "Housing DB Lookup",
            reasoning: "Matched query against Area Median Income tables.",
            sources_count: 2,
          },
        };
      case "tax":
        return {
          text: "Digital filing is the recommended path for local tax returns. Most residents can complete their submission within 20 minutes using our secure e-file portal.",
          cards: [
            {
              title: "E-File Portal",
              desc: "Secure digital submission and tracking.",
              iconName: "FileCheck",
              action: "View Details",
              color: "blue",
            },
            {
              title: "Tax Help",
              desc: "Interactive filing assistance and FAQs.",
              iconName: "HelpCircle",
              action: "View Details",
              color: "green",
            },
          ],
          topics: ["Download Forms", "Payment Plan Options", "Tax Calendar"],
          details: {
            process: "Tax Procedure Retrieval",
            reasoning: "Analyzed current deadlines and filing protocols.",
            sources_count: 3,
          },
        };
      case "vehicle":
        return {
          text: "You can renew your vehicle registration and manage parking citations entirely online. Please ensure your insurance and emissions status are current.",
          cards: [
            {
              title: "Renew Now",
              desc: "Digital registration renewal portal.",
              iconName: "Car",
              action: "View Details",
              color: "blue",
            },
            {
              title: "Pay Citation",
              desc: "Secure ticket and fine payment processing.",
              iconName: "FileCheck",
              action: "View Details",
              color: "green",
            },
          ],
          topics: [
            "Permit Zone Lookup",
            "Lost Title Process",
            "Plate Replacement",
          ],
          details: {
            process: "Vehicle Portal Routing",
            reasoning: "Verified state transit authority requirements.",
            sources_count: 1,
          },
        };
      default:
        return null;
    }
  };

  if (
    text.includes("waste") ||
    text.includes("trash") ||
    text.includes("recycling")
  ) {
    return {
      text: "Waste collection schedules are determined by municipal zones. Enter your address in the locator below to find your specific pickup days.",
      cards: [
        {
          title: "Find My Zone",
          desc: "Address-based zone lookup tool.",
          iconName: "MapPin",
          action: "View Details",
          color: "blue",
        },
      ],
      topics: ["Bulk Pickup Request", "Holiday Changes", "Hazardous Waste"],
      details: {
        process: "Zone lookup",
        reasoning: "Accessed Sanitation Dept 2026 Zone Mapping.",
        sources_count: 1,
      },
    };
  }

  if (text.match(/\b(hi|hello|hey)\b/)) {
    return {
      text: "Welcome to PublicSphere. I can assist you with city services today. What can I help you find?",
    };
  }

  let context = scenarioId;
  if (text.includes("child") || text.includes("benefit")) context = "benefits";
  else if (text.includes("hous")) context = "housing";
  else if (text.includes("tax")) context = "tax";
  else if (text.includes("vehicle")) context = "vehicle";

  const response = getRichResponse(context);
  if (response) return response;

  return {
    text: "I can assist you with local government services. Please choose a department or describe your request in more detail.",
    cards: [
      {
        title: "Service Directory",
        desc: "Browse all city departments and tools.",
        iconName: "Grid",
        action: "View Details",
        color: "blue",
      },
    ],
    topics: ["Tax Office", "Transit Services", "Social Aid", "Housing Help"],
    details: {
      process: "Fallback",
      reasoning: "Generic intent matched based on limited query scope.",
      sources_count: 0,
    },
  };
}

// --- Components ---

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length),
    [],
  );
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[380px] overflow-hidden bg-slate-900 rounded-[1.5rem] shadow-xl">
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-bold text-white mb-2">
              {slide.title}
            </h3>
            <p className="text-white/80 text-lg">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_SLIDES.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-white" : "bg-white/30"}`}
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
      <div className="flex w-full justify-end mb-6">
        <div className="flex max-w-[85%] flex-row-reverse gap-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${THEME.botAvatar} shadow-sm mt-auto`}
          >
            <User size={14} />
          </div>
          <div
            className={`relative p-4 rounded-2xl rounded-tr-none shadow-sm ${THEME.primary} text-white text-sm leading-relaxed`}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="flex max-w-[95%] flex-row gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200 ${THEME.text} shadow-sm mt-auto`}
        >
          <Bot size={14} />
        </div>
        <div className="flex flex-col gap-3 w-full bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-lg overflow-hidden">
          {/* Main Text Content (The "Short Answer" or "Description") */}
          <div className="p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {parseMarkdown(data.text)}
          </div>

          {/* Action Cards Grid (Styled per reference image) */}
          {data.cards && data.cards.length > 0 && (
            <div className="grid grid-cols-2 gap-4 px-5 py-2">
              {data.cards.map((card, idx) => {
                const headerBg =
                  card.color === "green" ? "bg-green-500" : "bg-blue-500";
                const IconComponent = ICON_MAP[card.iconName] || Briefcase;

                return (
                  <div
                    key={idx}
                    className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transform transition-transform hover:scale-[1.02]"
                  >
                    <div
                      className={`${headerBg} h-16 flex items-center justify-center text-white`}
                    >
                      <IconComponent size={32} strokeWidth={2.5} />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {card.desc}
                      </p>
                      <button
                        onClick={() => onCardAction(card.title)}
                        className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-colors shadow-sm"
                      >
                        {card.action || "View Details"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Related Topics (Arrows per reference image) */}
          {data.topics && data.topics.length > 0 && (
            <div className="bg-slate-50/50 px-5 py-3 border-y border-gray-100 mt-2">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Related Topics
              </div>
              <div className="space-y-1">
                {data.topics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => onCardAction(topic)}
                    className="w-full text-left py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-between group transition-colors"
                  >
                    {topic}{" "}
                    <ArrowRight
                      size={10}
                      className="text-gray-300 group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prototype B Reasoning Footer */}
          {/* {data.details && (
            <div className="bg-white">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-5 py-3 text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Info size={12} /> Show Reasoning
                </span>
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {expanded && (
                <div className="px-5 pb-5 pt-1 text-xs animate-in slide-in-from-top-1 duration-300">
                  <div className="space-y-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <div>
                      <span className="block text-[10px] text-blue-500 uppercase font-bold mb-1">
                        Processing Logic
                      </span>
                      <p className="text-gray-700 leading-relaxed font-mono text-[10px]">
                        {data.details.process}
                      </p>
                    </div>
                    <div className="flex gap-4 border-t border-blue-100 pt-2">
                      <div>
                        <span className="block text-[10px] text-blue-500 uppercase font-bold">
                          Sources
                        </span>
                        <span className="text-gray-800 font-bold">
                          {data.details.sources_count}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-blue-500 uppercase font-bold">
                          Confidence
                        </span>
                        <span className="text-gray-700 italic">
                          High (Procedural)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeScenario, setActiveScenario] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const chatEndRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      if (typeof __initial_auth_token !== "undefined" && __initial_auth_token)
        await signInWithCustomToken(auth, __initial_auth_token);
      else await signInAnonymously(auth);
    };
    init();
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    const messagesRef = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "messages",
    );
    const q = query(messagesRef, where("scenarioId", "==", activeScenario));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMsgs = snapshot.docs.map((d) => d.data());
      const msgs = allMsgs
        .filter((m) => m.sessionId === sessionId)
        .sort(
          (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0),
        );
      if (msgs.length === 0) {
        const welcome = {
          text:
            activeScenario === "home"
              ? "Welcome to PublicSphere. How can I assist you with city services today?"
              : `Welcome to the ${SCENARIOS[activeScenario].name} assistant.`,
        };
        addDoc(messagesRef, {
          role: "assistant",
          content: welcome.text,
          data: welcome,
          scenarioId: activeScenario,
          sessionId,
          createdAt: serverTimestamp(),
        });
      } else {
        setMessages(msgs);
      }
    });
    return () => unsubscribe();
  }, [user, activeScenario, sessionId]);

  const handleSend = async (e, textOverride) => {
    if (e && e.preventDefault) e.preventDefault();
    const txt = typeof textOverride === "string" ? textOverride : inputValue;
    if (!txt.trim() || !user) return;
    if (!textOverride) setInputValue("");
    setIsTyping(true);
    try {
      const ref = collection(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "messages",
      );
      await addDoc(ref, {
        role: "user",
        content: txt,
        scenarioId: activeScenario,
        sessionId,
        createdAt: serverTimestamp(),
      });
      const resp = await mockNlpApi(txt, activeScenario);
      await addDoc(ref, {
        role: "assistant",
        content: resp.text,
        data: resp,
        scenarioId: activeScenario,
        sessionId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 flex flex-col">
      <nav
        className={`h-16 ${THEME.primary} border-b border-blue-800 sticky top-0 z-50 flex items-center shadow-lg`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between text-white">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveScenario("home")}
          >
            <Grid size={22} />
            <span className="font-extrabold text-2xl tracking-tighter uppercase">
              PublicSphere
              <span className="text-blue-100 font-normal opacity-80 lowercase">
                .gov
              </span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setActiveScenario("home")}
              className="text-[11px] font-black uppercase tracking-widest hover:text-blue-100"
            >
              Home
            </button>
            {Object.values(SCENARIOS).map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(s.id)}
                className="text-[11px] font-black uppercase tracking-widest text-white/80 hover:text-white flex items-center gap-1.5"
              >
                {s.icon}
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col">
        {activeScenario === "home" ? (
          <div className="max-w-7xl mx-auto px-6 py-10 w-full">
            <div
              className={`${THEME.primary} rounded-[2.5rem] p-16 text-center text-white mb-12 shadow-2xl relative overflow-hidden`}
            >
              <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase leading-none">
                Welcome to PublicSphere
              </h1>
              <p className="text-2xl opacity-90 mb-10 font-light tracking-tight">
                The Unified Citizen Services Portal
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="px-10 py-5 bg-white text-blue-700 rounded-full font-black shadow-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-widest text-sm"
              >
                <MessageSquare size={20} className="fill-blue-700" /> Open
                Assistant
              </button>
            </div>

            <section className="mb-16">
              <Carousel />
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {Object.values(SCENARIOS).map((scen) => (
                <div
                  key={scen.id}
                  onClick={() => setActiveScenario(scen.id)}
                  className="bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all group shadow-sm"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 ${THEME.text} group-hover:${THEME.primary} group-hover:text-white transition-colors`}
                  >
                    {scen.icon}
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mb-2 uppercase tracking-tight">
                    {scen.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {scen.heroSubtitle}
                  </p>
                  <div
                    className={`${THEME.text} font-bold flex items-center gap-1 group-hover:gap-3 transition-all text-xs tracking-widest uppercase`}
                  >
                    ACCESS <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-80 pb-20">
              <div>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  4.2m
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Citizens Served
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  99.9%
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Uptime
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  24/7
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Support Access
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  A+
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Security Rating
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="bg-white rounded-3xl shadow-xl p-12 flex flex-col lg:flex-row gap-16 items-center border border-slate-100">
              <div className="flex-1 space-y-8">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 ${THEME.text} italic`}
                >
                  Official Department
                </span>
                <h1 className="text-6xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
                  {SCENARIOS[activeScenario].heroTitle}
                </h1>
                <p className="text-xl text-slate-500 font-light leading-relaxed">
                  {SCENARIOS[activeScenario].heroSubtitle}
                </p>
                <div className="flex gap-4">
                  <button
                    className={`px-10 py-5 ${THEME.primary} text-white rounded-2xl font-black shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-sm`}
                  >
                    Start Service
                  </button>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-10 py-5 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-sm"
                  >
                    Consult Assistant
                  </button>
                </div>
              </div>
              <div className="w-full max-w-sm aspect-square bg-slate-50 rounded-[3rem] flex items-center justify-center text-blue-100 shadow-inner">
                {React.cloneElement(SCENARIOS[activeScenario].icon, {
                  size: 160,
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        {isOpen && (
          <div className="w-[90vw] md:w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 border border-gray-100">
            <div
              className={`h-20 ${THEME.primary} p-6 flex items-center justify-between text-white`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight leading-none mb-1 uppercase">
                    askMe
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-100 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
                    Live Support
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="opacity-70 hover:opacity-100 p-1"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {messages.map((m, i) => (
                <MessageBubble
                  key={i}
                  message={m}
                  onCardAction={(t) => handleSend(null, t)}
                />
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <span className="animate-pulse text-slate-400 font-bold text-xs">
                      Processing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form
              onSubmit={(e) => handleSend(e)}
              className="p-4 bg-white border-t border-slate-100"
            >
              <div className="relative flex items-center border-2 border-blue-600 rounded-[1.5rem] bg-gray-50 p-1 shadow-inner">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full bg-transparent py-3 pl-4 pr-12 text-sm font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 p-2.5 text-slate-300 hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              {activeScenario !== "home" && (
                <button
                  type="button"
                  onClick={() =>
                    setInputValue(SCENARIOS[activeScenario].querySuggestion)
                  }
                  className={`mt-3 text-[10px] font-bold ${THEME.text} hover:opacity-80 w-full text-center flex items-center justify-center gap-1 uppercase tracking-widest`}
                >
                  <HelpCircle size={14} /> Suggestion: "
                  {SCENARIOS[activeScenario].querySuggestion}"
                </button>
              )}
            </form>
          </div>
        )}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white ${THEME.primary} hover:scale-110 transition-all border-2 border-white/20`}
          >
            <MessageSquare size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
