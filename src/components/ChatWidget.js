// src/components/ChatWidget.js
import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaTimes, FaUser, FaPhone, FaCity } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('askName');
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatHistory = useRef([]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { fromUser: false, text }]);
      chatHistory.current.push({ role: 'assistant', content: text });
      setIsTyping(false);
    }, delay);
  };

  const getAIResponse = async (userMessage) => {
    try {
      // In production, replace with actual AI API endpoint
      const response = await axios.post('/api/ai-chat', {
        message: userMessage,
        history: chatHistory.current
      });
      
      return response.data.reply;
    } catch (error) {
      console.error('AI Error:', error);
      return "I'm having trouble understanding. Could you rephrase that?";
    }
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to UI and history
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { fromUser: true, text: userMessage }]);
    chatHistory.current.push({ role: 'user', content: userMessage });
    setInput('');

    if (step === 'askName') {
      setFormData((prev) => ({ ...prev, name: userMessage }));
      sendBotMessage(`Nice to meet you, ${userMessage}! Please share your mobile number.`);
      setStep('askPhone');
    } else if (step === 'askPhone') {
      // Simple phone validation
      if (!/^\d{10}$/.test(userMessage)) {
        sendBotMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      setFormData((prev) => ({ ...prev, phone: userMessage }));
      sendBotMessage('Got it! Which city are you from?');
      setStep('askCity');
    } else if (step === 'askCity') {
      setFormData((prev) => ({ ...prev, city: userMessage }));
      sendBotMessage(
        `Welcome from ${userMessage}, ${formData.name}! How can I assist you today?`,
        1500
      );
      setStep('chatting');
    } else if (step === 'chatting') {
      setIsTyping(true);
      try {
        const aiResponse = await getAIResponse(userMessage);
        sendBotMessage(aiResponse, 800);
      } catch (error) {
        sendBotMessage("I'm having trouble connecting to the AI service. Please try again later.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const endChat = () => {
    sendBotMessage('Thank you for chatting with us! We will contact you soon.', 500);
    setTimeout(() => {
      setMessages([]);
      setFormData({ name: '', phone: '', city: '' });
      setStep('askName');
      chatHistory.current = [];
    }, 3000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-80 h-[28rem] bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full">
                <FaCommentDots />
              </div>
              <span className="font-bold">Wise Global Assistant</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={endChat}
                className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30"
              >
                End Chat
              </button>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-white/30">
            {messages.length === 0 ? (
              <div className="text-center mt-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <FaCommentDots className="text-white text-2xl" />
                </div>
                <p className="text-gray-600 mt-4 font-medium">Hi there! I'm your AI assistant</p>
                <p className="text-gray-500 text-xs mt-2">Let's start with your name</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.fromUser 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white/80">
            {step !== 'chatting' && (
              <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                {step === 'askName' && <><FaUser className="text-blue-500" /> Name</>}
                {step === 'askPhone' && <><FaPhone className="text-green-500" /> Phone</>}
                {step === 'askCity' && <><FaCity className="text-purple-500" /> City</>}
                <div className="flex-1 h-px bg-gray-200 ml-1"></div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type={step === 'askPhone' ? 'tel' : 'text'}
                placeholder={
                  step === 'askName'
                    ? 'Your full name...'
                    : step === 'askPhone'
                    ? '10-digit mobile number...'
                    : step === 'askCity'
                    ? 'Your city...'
                    : 'Ask anything...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleSend}
                disabled={input.trim() === ''}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          <FaCommentDots size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatWidget;