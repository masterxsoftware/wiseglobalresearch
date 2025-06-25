// src/components/ChatWidget.js
import React, { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('askName');
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendBotMessage = (text) => {
    setMessages((prev) => [...prev, { fromUser: false, text }]);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages((prev) => [...prev, { fromUser: true, text: input }]);

    setTimeout(() => {
      if (step === 'askName') {
        setFormData((prev) => ({ ...prev, name: input }));
        sendBotMessage(`Hi ${input}, please enter your mobile number.`);
        setStep('askPhone');
      } else if (step === 'askPhone') {
        setFormData((prev) => ({ ...prev, phone: input }));
        sendBotMessage(`Thanks! Now, please enter your city.`);
        setStep('askCity');
      } else if (step === 'askCity') {
        setFormData((prev) => ({ ...prev, city: input }));
        sendBotMessage(`Thanks ${formData.name}! How can we help you today?`);
        setStep('chatting');
      } else if (step === 'chatting') {
        sendBotMessage("Thank you for your message. Our team will contact you shortly. 😊");
        setTimeout(() => {
          setMessages([]);
          setFormData({ name: '', phone: '', city: '' });
          setStep('askName');
        }, 4000);
      }
    }, 1000);

    setInput('');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-80 h-96 bg-white/80 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
            <span className="font-semibold">Wise Global Chat</span>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm bg-white/30 rounded-b-md">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Hi! Please enter your name to begin.</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`text-left ${msg.fromUser ? 'text-right' : ''}`}>
                  <span
                    className={`inline-block px-3 py-2 rounded-xl ${
                      msg.fromUser ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex items-center gap-2 bg-white rounded-b-xl">
            <input
              type="text"
              placeholder={
                step === 'askName'
                  ? 'Enter your name...'
                  : step === 'askPhone'
                  ? 'Enter mobile number...'
                  : step === 'askCity'
                  ? 'Enter your city...'
                  : 'Type a message...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <FaCommentDots size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
