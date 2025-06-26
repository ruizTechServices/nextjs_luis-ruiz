// app/components/public_chatbot.js
"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Send, Plus, MessageSquare, Menu, X, AlertCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client using your public keys
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Constants
const STORAGE_KEY = "conversationId";
const MAX_MESSAGE_LENGTH = 1000;

// Custom hooks for better separation of concerns
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
};

const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("conversation_id");
      
      if (error) throw error;
      
      const uniqueConversations = Array.from(
        new Set(data?.map((item) => item.conversation_id) || [])
      );
      setConversations(uniqueConversations);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  return { conversations, loading, error, fetchConversations };
};

const useChatHistory = () => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatHistory = useCallback(async (convId) => {
    if (!convId) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("conversation_id", convId)
        .order("position_id", { ascending: true });
      
      if (error) throw error;
      
      const messages = data?.map((msg) => ({
        id: msg.position_id,
        role: msg.role,
        content: msg.message,
      })) || [];
      setChat(messages);
    } catch (err) {
      console.error("Error fetching chat history:", err);
      setError("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  }, []);

  const addMessage = useCallback((message) => {
    setChat(prev => [...prev, message]);
  }, []);

  const clearChat = useCallback(() => {
    setChat([]);
  }, []);

  return { chat, loading, error, fetchChatHistory, addMessage, clearChat };
};

// Subcomponents for better organization
const ChatMessage = React.memo(({ message }) => (
  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`
        px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] break-words shadow-sm
        transition-all duration-200 hover:shadow-md
        ${message.role === "user" 
          ? "bg-blue-500 text-white rounded-br-md" 
          : "bg-gray-100 text-gray-800 rounded-bl-md"
        }
      `}
    >
      <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";

const ConversationItem = React.memo(({ conversation, isActive, onClick }) => (
  <button
    onClick={() => onClick(conversation)}
    className={`
      w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3
      transition-all duration-200 rounded-lg mx-2 mb-1
      ${isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-700 hover:text-gray-900"}
    `}
  >
    <MessageSquare className="w-4 h-4 flex-shrink-0" />
    <span className="truncate text-sm font-medium">
      {conversation.slice(0, 8)}...
    </span>
  </button>
));

ConversationItem.displayName = "ConversationItem";

const ErrorMessage = ({ message, onDismiss }) => (
  <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
    <span className="text-sm text-red-700 flex-1">{message}</span>
    {onDismiss && (
      <button onClick={onDismiss} className="text-red-500 hover:text-red-700">
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useLocalStorage(STORAGE_KEY, null);
  
  const { conversations, loading: conversationsLoading, error: conversationsError, fetchConversations } = useConversations();
  const { chat, loading: chatLoading, error: chatError, fetchChatHistory, addMessage, clearChat } = useChatHistory();
  
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Initialize conversations and chat history
  useEffect(() => {
    fetchConversations();
    if (conversationId) {
      fetchChatHistory(conversationId);
    }
  }, [conversationId, fetchConversations, fetchChatHistory]);

  // Focus input on mount and when sidebar closes
  useEffect(() => {
    if (!sidebarOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [sidebarOpen]);

  const handleConversationSelect = useCallback((convId) => {
    setConversationId(convId);
    fetchChatHistory(convId);
    setSidebarOpen(false);
  }, [setConversationId, fetchChatHistory]);

  const handleNewChat = useCallback(() => {
    setConversationId(null);
    clearChat();
    setSidebarOpen(false);
    inputRef.current?.focus();
  }, [setConversationId, clearChat]);

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    if (trimmedInput.length > MAX_MESSAGE_LENGTH) {
      alert(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
      return;
    }

    let convId = conversationId;
    if (!convId) {
      convId = uuidv4();
      setConversationId(convId);
    }

    // Add user message optimistically
    const userMessage = { 
      id: `user-${Date.now()}`, 
      role: "user", 
      content: trimmedInput 
    };
    addMessage(userMessage);

    const currentInput = trimmedInput;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai/gpt-4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: currentInput, 
          conversation_id: convId 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
      };
      addMessage(assistantMessage);
      
      // Refresh conversations if this was a new conversation
      if (!conversationId) {
        fetchConversations();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, conversationId, setConversationId, addMessage, fetchConversations]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const isInputDisabled = isLoading || chatLoading;
  const hasError = conversationsError || chatError;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between shadow-sm border-b border-gray-200">
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Community Chatbot</h1>
        <div className="w-9" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-50
            w-80 md:w-72 lg:w-80 bg-white/95 backdrop-blur-sm shadow-xl md:shadow-lg 
            transform transition-all duration-300 ease-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 border-r border-gray-200
          `}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="font-semibold text-gray-800">Conversations</h2>
              <button 
                onClick={closeSidebar} 
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={handleNewChat}
              disabled={isLoading}
              className="w-full px-4 py-3 text-white bg-blue-500 rounded-xl hover:bg-blue-600 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] 
                       active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Chat</span>
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-2">
            {hasError && (
              <ErrorMessage 
                message={conversationsError || chatError} 
                onDismiss={() => {/* Could implement error dismissal */}} 
              />
            )}
            
            {conversationsLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No conversations yet. Start a new chat!
              </div>
            ) : (
              conversations.map((conv) => (
                <ConversationItem
                  key={conv}
                  conversation={conv}
                  isActive={conv === conversationId}
                  onClick={handleConversationSelect}
                />
              ))
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {chat.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Start a conversation</h3>
                  <p className="text-gray-500">Ask me anything to get started!</p>
                </div>
              ) : (
                <>
                  {chat.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                    disabled={isInputDisabled}
                    rows={1}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all resize-none min-h-[48px] max-h-32 overflow-y-auto
                             placeholder:text-gray-400"
                    style={{ 
                      height: 'auto',
                      minHeight: '48px'
                    }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {input.length}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  disabled={isInputDisabled || !input.trim()}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all transform hover:scale-105 active:scale-95 
                           flex items-center justify-center shadow-sm hover:shadow-md"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        )}
      </div>
    </div>
  );
}