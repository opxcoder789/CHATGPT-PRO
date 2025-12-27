import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon, PenIcon, SendIcon, Logo, StopIcon, HeadphoneIcon, CameraIcon, PhotoIcon, FolderIcon, MicrophoneIcon, OpenAIIcon, PlusIcon, ShareIcon, ChevronDownIcon, XIcon, SettingsSlidersIcon } from './components/Icons';
import { LandingScreen, EmailInputScreen, VerifyEmailScreen } from './components/AuthScreens';
import MarkdownRenderer from './components/MarkdownRenderer';
import { streamChatResponse, fileToBase64 } from './services/geminiService';
import { ChatMessage, Role, Attachment, ChatSession } from './types';
import { DEFAULT_MODEL, MODELS } from './constants';
import { SettingsScreen } from './components/SettingsScreen';
import { UpgradePaymentModal } from './components/UpgradePaymentModal';

type AuthState = 'landing' | 'email_input' | 'verify_email' | 'authenticated';

const LOADING_GIF_URL = "https://assets-v2.lottiefiles.com/a/03cdc6e0-118b-11ee-bf08-07d88a941cbd/fjMdlSoouM.gif";

export default function App() {
  // App Loading State (Splash Screen)
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Default to authenticated for instant load as requested
  const [authState, setAuthState] = useState<AuthState>('authenticated');
  const [userEmail, setUserEmail] = useState('');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  // Custom API Key State (with persistence)
  const [customApiKey, setCustomApiKey] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('gemini_custom_api_key') || '';
      }
      return '';
  });

  // Global Error State
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- Initialization & Persistence ---

  // Fake Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsAppLoading(false);
    }, 2500); // Extended slightly to show off the loader
    return () => clearTimeout(timer);
  }, []);

  // Load History from LocalStorage
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const savedHistory = localStorage.getItem('gemini_chat_history');
          if (savedHistory) {
              try {
                  const parsed = JSON.parse(savedHistory);
                  setChatHistory(parsed);
              } catch (e) {
                  console.error("Failed to parse chat history", e);
              }
          }
      }
  }, []);

  // Save History to LocalStorage whenever it changes
  useEffect(() => {
      if (typeof window !== 'undefined' && chatHistory.length > 0) {
          localStorage.setItem('gemini_chat_history', JSON.stringify(chatHistory));
      }
  }, [chatHistory]);

  // --- Global Error Handling ---
  useEffect(() => {
    const handleOnline = () => setGlobalError(null);
    const handleOffline = () => setGlobalError("No internet connection.");

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleError = (event: ErrorEvent) => {
        setGlobalError(event.message || "An unexpected error occurred.");
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
        setGlobalError(String(event.reason) || "An unexpected error occurred.");
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  useEffect(() => {
      if (globalError) {
          const timer = setTimeout(() => setGlobalError(null), 5000);
          return () => clearTimeout(timer);
      }
  }, [globalError]);

  // Handle API Key
  const handleApiKeyChange = (newKey: string) => {
      setCustomApiKey(newKey);
      localStorage.setItem('gemini_custom_api_key', newKey);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Chat Logic ---

  // Helper to update chat history state
  const updateChatHistory = (id: string, msgs: ChatMessage[]) => {
      setChatHistory(prev => {
          const existingIndex = prev.findIndex(session => session.id === id);
          
          // Generate title from first user message
          const firstUserMsg = msgs.find(m => m.role === Role.USER);
          const title = firstUserMsg ? (firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '')) : 'New Chat';
          
          const updatedSession: ChatSession = {
              id,
              title: title || 'New Chat',
              messages: msgs,
              lastModified: Date.now()
          };

          if (existingIndex >= 0) {
              const newHistory = [...prev];
              newHistory[existingIndex] = updatedSession;
              // Move to top
              newHistory.sort((a, b) => b.lastModified - a.lastModified);
              return newHistory;
          } else {
              return [updatedSession, ...prev];
          }
      });
  };

  const startNewChat = () => {
      setMessages([]);
      setAttachments([]);
      setCurrentChatId(null);
      setIsMobileMenuOpen(false);
  };

  const loadChat = (session: ChatSession) => {
      setMessages(session.messages);
      setCurrentChatId(session.id);
      setIsMobileMenuOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const newAttachments: Attachment[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            try {
                const base64 = await fileToBase64(file);
                newAttachments.push({
                    mimeType: file.type,
                    data: base64,
                    name: file.name
                });
            } catch (err) {
                console.error("Error reading file", err);
                setGlobalError("Failed to process file.");
            }
        }
        setAttachments(prev => [...prev, ...newAttachments]);
        e.target.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const stopGeneration = () => {
     if (abortControllerRef.current) {
         abortControllerRef.current.abort();
         abortControllerRef.current = null;
         setIsLoading(false);
         setMessages(prev => {
             const newMsgs = [...prev];
             if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].role === Role.MODEL) {
                 newMsgs[newMsgs.length - 1].isStreaming = false;
             }
             // Update history on stop
             if (currentChatId) {
                 updateChatHistory(currentChatId, newMsgs);
             }
             return newMsgs;
         });
     }
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if ((!text.trim() && attachments.length === 0) || isLoading) return;

    let chatId = currentChatId;
    if (!chatId) {
        chatId = Date.now().toString();
        setCurrentChatId(chatId);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text,
      timestamp: Date.now(),
      attachments: [...attachments]
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateChatHistory(chatId, newMessages); // Update history immediately with user msg

    setInputValue("");
    setAttachments([]);
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const modelMessage: ChatMessage = {
      id: modelMessageId,
      role: Role.MODEL,
      text: "",
      timestamp: Date.now() + 1,
      isStreaming: true
    };

    const messagesWithModel = [...newMessages, modelMessage];
    setMessages(messagesWithModel);

    abortControllerRef.current = new AbortController();

    try {
      const history = newMessages; // History excludes the pending empty model message
      
      const stream = streamChatResponse(history, text, userMessage.attachments, selectedModel, customApiKey);
      
      let fullText = "";

      for await (const chunk of stream) {
          if (!abortControllerRef.current) break; 

          fullText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId ? { ...msg, text: fullText } : msg
          ));
      }
      
      // Update history after stream completion
      if (chatId) {
          const finalMessages = messagesWithModel.map(msg => 
              msg.id === modelMessageId ? { ...msg, text: fullText, isStreaming: false } : msg
          );
          updateChatHistory(chatId, finalMessages);
      }

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Failed to generate response.";
      setGlobalError(errorMessage);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, text: msg.text + `\n\n*[Error: ${errorMessage}]*`, isStreaming: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, isStreaming: false } : msg
      ));
    }
  };

  const isTyping = inputValue.length > 0 || attachments.length > 0;
  
  // Get active model name
  const activeModelName = MODELS.find(m => m.id === selectedModel)?.name || 'Gemini';

  /* --- Initial Loader Screen --- */
  if (isAppLoading) {
      return (
          <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center flex-col animate-out fade-out duration-700 fill-mode-forwards">
              <div className="w-24 h-24 relative">
                <img 
                    src={LOADING_GIF_URL} 
                    alt="Loading..." 
                    className="w-full h-full object-contain mix-blend-screen"
                />
              </div>
              <div className="text-neutral-500 text-xs font-semibold tracking-[0.2em] uppercase mt-4 animate-pulse">Initializing</div>
          </div>
      );
  }

  /* --- Render Auth Screens --- */
  if (authState === 'landing') {
      return (
          <LandingScreen 
            onEmailSignup={() => setAuthState('email_input')}
            onLogin={() => setAuthState('authenticated')} 
          />
      );
  }

  if (authState === 'email_input') {
      return (
          <EmailInputScreen 
            onContinue={(email) => { setUserEmail(email); setAuthState('verify_email'); }}
            onBack={() => setAuthState('landing')}
          />
      );
  }

  if (authState === 'verify_email') {
      return (
          <VerifyEmailScreen 
             email={userEmail}
             onVerified={() => setAuthState('authenticated')}
             onSignOut={() => setAuthState('landing')}
          />
      );
  }

  /* --- Render Main Chat App --- */
  return (
    <div className="flex h-[100dvh] bg-[#212121] text-gray-100 font-sans overflow-hidden w-full relative">
      
      {/* --- Global Error Toast --- */}
      {globalError && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span className="font-medium text-sm">{globalError}</span>
              <button onClick={() => setGlobalError(null)} className="ml-2 opacity-80 hover:opacity-100">
                  <XIcon className="w-4 h-4" />
              </button>
          </div>
      )}

      {/* --- Upgrade Modal --- */}
      {showUpgrade && (
          <UpgradePaymentModal onClose={() => setShowUpgrade(false)} />
      )}

      {/* --- Settings Modal --- */}
      {showSettings && (
          <SettingsScreen 
            email={userEmail}
            apiKey={customApiKey}
            onApiKeyChange={handleApiKeyChange}
            onClose={() => setShowSettings(false)}
            onLogout={() => { setShowSettings(false); setAuthState('landing'); }}
            onUpgrade={() => { setShowSettings(false); setShowUpgrade(true); }}
          />
      )}

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-full bg-[#171717] rounded-t-[20px] flex flex-col border-t border-white/10 animate-in slide-in-from-bottom-full duration-500 ease-out shadow-2xl max-h-[90vh]">
                 <div className="flex items-center justify-between p-4 border-b border-white/5">
                     <span className="font-semibold text-lg text-gray-200">Menu</span>
                     <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2F2F2F] text-gray-400 hover:text-white transition-colors"
                     >
                        <XIcon className="w-5 h-5" />
                     </button>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                     <button 
                        onClick={startNewChat}
                        className="flex items-center gap-3 w-full px-3 py-3 bg-[#212121] rounded-xl hover:bg-[#2a2a2a] transition-colors"
                     >
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Logo className="w-5 h-5 text-black" />
                         </div>
                         <span className="font-medium text-gray-200">New Chat</span>
                     </button>

                     <button 
                        onClick={() => { setIsMobileMenuOpen(false); setShowSettings(true); }}
                        className="flex items-center gap-3 w-full px-3 py-3 bg-[#212121] rounded-xl hover:bg-[#2a2a2a] transition-colors"
                     >
                         <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                             <SettingsSlidersIcon className="w-5 h-5" />
                         </div>
                         <span className="font-medium text-gray-200">Settings</span>
                     </button>

                     <div className="flex flex-col gap-1 mt-2">
                         <span className="text-xs font-medium text-[#666666] px-1 mb-2">Recent</span>
                         {chatHistory.length === 0 ? (
                             <div className="px-3 py-4 text-center text-sm text-gray-500 italic">
                                 No recent chats
                             </div>
                         ) : (
                             chatHistory.map(session => (
                                 <button
                                    key={session.id}
                                    onClick={() => loadChat(session)}
                                    className={`text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${currentChatId === session.id ? 'bg-[#2F2F2F] text-white' : 'text-gray-300 hover:bg-[#212121] hover:text-white'}`}
                                 >
                                    {session.title}
                                 </button>
                             ))
                         )}
                     </div>
                 </div>
                 
                 <div className="p-4 border-t border-white/5">
                     <div className="flex items-center justify-between px-3 py-2 bg-[#212121] rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">PV</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-200">prakhar vardh...</span>
                                <span className="text-xs text-gray-400">Free</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => { setIsMobileMenuOpen(false); setShowUpgrade(true); }}
                            className="text-xs bg-[#333] px-3 py-1.5 rounded-full text-white hover:bg-[#444] transition-colors"
                        >
                            Upgrade
                        </button>
                    </div>
                 </div>
            </div>
        </div>
      )}

      {/* --- Sidebar (Desktop) --- */}
      <aside className="hidden md:flex w-[260px] bg-[#171717] flex-col h-full border-r border-white/5 flex-shrink-0">
        
        {/* Header / New Chat */}
        <div className="px-3 pt-3 pb-0">
             <button 
                onClick={startNewChat}
                className="flex items-center justify-between w-full px-3 py-2 hover:bg-[#212121] rounded-lg transition-colors group"
             >
                 <div className="flex items-center gap-3">
                     <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm">
                        <Logo className="w-full h-full text-black" />
                     </div>
                     <span className="font-medium text-[13px] text-gray-200 group-hover:text-white">New chat</span>
                 </div>
                 <PenIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
             </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto mt-6 px-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            <div className="px-3 mb-2">
                <span className="text-[11px] font-medium text-[#666666]">Your chats</span>
            </div>
            <div className="flex flex-col gap-0.5">
                {chatHistory.length === 0 ? (
                    <div className="text-center py-4 text-gray-600 text-xs italic">
                        No recent chats
                    </div>
                ) : (
                    chatHistory.map(session => (
                        <button
                            key={session.id}
                            onClick={() => loadChat(session)}
                            className={`text-left px-3 py-2 rounded-lg text-[13px] truncate transition-all duration-200 ${currentChatId === session.id ? 'bg-[#2F2F2F] text-white shadow-sm' : 'text-gray-400 hover:bg-[#212121] hover:text-gray-200'}`}
                        >
                            {session.title}
                        </button>
                    ))
                )}
            </div>
        </div>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-white/5 flex flex-col gap-2">
             {/* Settings Button (Desktop) */}
             <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-[#212121] rounded-lg transition-colors w-full text-left"
             >
                 <SettingsSlidersIcon className="w-5 h-5 text-gray-400" />
                 <span className="text-sm font-medium text-gray-300">Settings</span>
             </button>

             <div className="flex items-center justify-between px-2 py-1.5 rounded-xl transition-colors cursor-pointer group hover:bg-[#212121]">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-inner">
                        PV
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-medium text-[#D1D1D1] truncate group-hover:text-white">prakhar vardh...</span>
                        <span className="text-[11px] text-[#888888]">Free</span>
                    </div>
                </div>
                <button 
                    onClick={() => setShowUpgrade(true)}
                    className="px-3 py-1.5 bg-[#212121] border border-[#333333] group-hover:bg-[#2F2F2F] group-hover:border-[#444444] rounded-full text-[11px] font-medium text-[#D1D1D1] transition-all"
                >
                    Upgrade
                </button>
            </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative w-full min-w-0">
        {/* --- Header --- */}
        <header className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 z-10 w-full bg-[#212121]">
            <div className="flex items-center gap-2 md:hidden">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 hover:bg-[#2F2F2F] rounded-lg transition-colors"
                >
                    <MenuIcon className="text-gray-300" />
                </button>
            </div>
            
            <div 
                className="relative flex items-center gap-2 cursor-pointer hover:bg-[#2F2F2F] px-3 py-2 rounded-lg transition-all duration-200 group" 
                onClick={() => setShowModelMenu(!showModelMenu)}
            >
                <span className="font-semibold text-lg text-gray-200 whitespace-nowrap group-hover:text-white transition-colors">ChatGPT</span>
                <span className="text-gray-400 text-lg whitespace-nowrap hidden sm:inline group-hover:text-gray-300 transition-colors">
                    {MODELS.find(m => m.id === selectedModel)?.name.replace('Gemini ', '')}
                </span>
                <ChevronDownIcon 
                    className={`w-4 h-4 text-gray-400 mt-1 transition-transform duration-300 ${showModelMenu ? 'rotate-180' : ''}`} 
                />

                {/* Model Dropdown */}
                {showModelMenu && (
                    <>
                    <div className="fixed inset-0 z-10 cursor-default" onClick={(e) => { e.stopPropagation(); setShowModelMenu(false); }}></div>
                    <div className="absolute top-full mt-2 left-0 w-72 bg-[#2F2F2F] rounded-xl shadow-2xl border border-white/5 overflow-hidden z-20 flex flex-col p-1 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                        {MODELS.map(model => (
                            <button
                                key={model.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedModel(model.id); setShowModelMenu(false); }}
                                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group/item ${selectedModel === model.id ? 'bg-[#424242]' : 'hover:bg-[#383838]'}`}
                            >
                                <div>
                                    <div className={`font-medium ${selectedModel === model.id ? 'text-white' : 'text-gray-200'} group-hover/item:text-white transition-colors`}>{model.name}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{model.description}</div>
                                </div>
                                {selectedModel === model.id && (
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                 <button className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-[#2F2F2F] rounded-lg text-gray-200 text-sm font-medium transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    Share
                 </button>
                 <button className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors flex-shrink-0">
                    <span className="text-sm font-bold">U</span>
                 </button>
            </div>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-1 overflow-y-auto w-full max-w-full mx-auto px-0 md:px-0 relative scroll-smooth overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
            {messages.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center pb-32 animate-in fade-in duration-500 px-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    <Logo className="w-10 h-10 text-black" />
                </div>
            </div>
            ) : (
            /* Chat History */
            <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-0 pt-6">
                {messages.map((msg, idx) => (
                <div 
                    key={msg.id} 
                    className={`flex w-full mb-6 ${msg.role === Role.USER ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
                >
                    {/* Model Avatar */}
                    {msg.role === Role.MODEL && (
                        <div className="flex-shrink-0 mr-4 mt-0.5">
                            <div className="w-8 h-8 rounded-full bg-[#19c37d] flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
                                <Logo className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    )}

                    {/* Message Content */}
                    <div className={`flex flex-col ${msg.role === Role.USER ? 'items-end max-w-[85%] sm:max-w-[75%]' : 'max-w-full min-w-0 flex-1'}`}>
                        
                        <div className={`
                            ${msg.role === Role.USER 
                                ? 'bg-[#2F2F2F] text-white rounded-[26px] rounded-br-sm px-5 py-3.5 border border-white/10 shadow-md' 
                                : 'text-gray-100 leading-relaxed pt-1'}
                        `}>
                            {/* Attachments */}
                            {msg.attachments && msg.attachments.length > 0 && (
                                <div className={`flex flex-wrap gap-2 mb-3 ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
                                    {msg.attachments.map((att, i) => (
                                        <div key={i} className="relative group overflow-hidden rounded-xl border border-white/10 shadow-sm animate-in zoom-in duration-300">
                                            {att.mimeType.startsWith('image/') ? (
                                                <img src={`data:${att.mimeType};base64,${att.data}`} alt="attachment" className="h-32 w-auto object-cover" />
                                            ) : (
                                                <div className="h-20 w-24 flex items-center justify-center bg-[#333] text-xs text-gray-400 p-2 break-all font-medium">
                                                    {att.name || 'File'}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Text Content */}
                            <div className={msg.role === Role.USER ? 'whitespace-pre-wrap break-words' : 'w-full min-w-0'}>
                                {msg.role === Role.MODEL ? (
                                    <>
                                        <MarkdownRenderer content={msg.text} />
                                        {msg.isStreaming && (
                                            <div className="inline-block w-2.5 h-2.5 bg-white rounded-full ml-1 animate-pulse" />
                                        )}
                                    </>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                
                {/* Spacer to push content above the floating footer */}
                <div ref={messagesEndRef} className="h-32 md:h-48 flex-shrink-0" />
            </div>
            )}
        </main>

        {/* --- Footer / Input Area (Floating) --- */}
        <div className="absolute bottom-0 left-0 w-full px-4 pb-6 pt-10 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent z-20 flex justify-center">
            <div className="max-w-3xl w-full relative flex flex-col gap-2 animate-in slide-in-from-bottom-6 fade-in duration-700 ease-out fill-mode-backwards">
                
                {/* Input Container */}
                <div className="relative w-full bg-[#2F2F2F]/90 backdrop-blur-xl rounded-[26px] p-2 flex flex-col shadow-2xl ring-1 ring-white/10 focus-within:ring-white/20 transition-all duration-300">
                    
                    {/* Attachments Preview inside Input */}
                    {attachments.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto p-2 pb-0 mb-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                            {attachments.map((att, idx) => (
                                <div key={idx} className="relative inline-block rounded-xl overflow-hidden border border-white/10 shadow-lg w-16 h-16 flex-shrink-0 group animate-in zoom-in fade-in slide-in-from-bottom-2 duration-300">
                                     {att.mimeType.startsWith('image/') ? (
                                        <img src={`data:${att.mimeType};base64,${att.data}`} alt="preview" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#424242] text-[10px] text-gray-400 p-1 text-center">
                                            File
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => removeAttachment(idx)}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-end w-full">
                        {/* Plus / File Button */}
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#424242] hover:text-white transition-all duration-200 mb-1 ml-1 flex-shrink-0 hover:rotate-90 active:scale-90"
                        >
                            <PlusIcon className="w-6 h-6" />
                        </button>

                        <input 
                            type="file" 
                            multiple 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleFileChange}
                        />

                        {/* Text Input */}
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Ask anything"
                            className="flex-1 max-h-[200px] min-h-[44px] py-3 px-3 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 resize-none text-[16px] leading-6 focus:ring-0 focus:outline-none w-0 min-w-0"
                            style={{ outline: 'none', boxShadow: 'none' }}
                            rows={1}
                        />

                        {/* Right Actions */}
                        <div className="flex items-center gap-1 mb-1 mr-1 flex-shrink-0 h-10">
                            {isLoading ? (
                                 <button 
                                    onClick={stopGeneration}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-[#424242] transition-colors animate-in zoom-in duration-200"
                                >
                                    <StopIcon />
                                </button>
                            ) : (
                                inputValue.length > 0 || attachments.length > 0 ? (
                                    <button 
                                        onClick={() => handleSendMessage()}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 animate-in zoom-in duration-300"
                                    >
                                        <SendIcon className="scale-75 text-black" />
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-300">
                                        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-gray-400 hover:bg-[#424242] hover:text-white transition-colors">
                                            <MicrophoneIcon />
                                        </button>
                                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#424242] hover:text-white transition-colors">
                                            <HeadphoneIcon />
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="text-center animate-in fade-in duration-1000 delay-300">
                    <p className="text-[11px] text-gray-500">
                        ChatGPT can make mistakes. Check important info. See Cookie Preferences.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}