"use client";

import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";



interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="  bg-white/5 backdrop-blur-lg rounded-lg shadow-lg border  border-gray-800">
      <div className="flex flex-col w-[450px] h-[450px]  ">
        <div className="flex items-center  rounded-sm bg-[#4361EE]  space-x-2 p-3">
          <p>
            <FaRobot className="text-white mb-1 w-8 h-8" />
          </p>
          <p className="text-lg font-semibold text-white">AI Assistant</p>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                {message.role === "assistant" && (
                  <FaRobot className="w-12 h-12 p-2 bg-[#3C096C] text-white border rounded-full " />
                )}
                <div
                  className={`rounded-lg px-2 py-2 max-w-[80%] ${
                    message.role === "assistant"
                      ? "bg-[#3C096C] text-white"
                      : "bg-[#DEE2E6] text-[#444444]"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <FaUserAlt className="w-6 h-6 mt-1 text-blue-400" />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <FaRobot className="w-12 h-12 p-2 bg-[#3C096C] text-white border rounded-full "/>
                <div className="bg-[#3C096C] rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <IoMdSend className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* 
        <form className="p-4 border-t border-gray-800" onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              className="flex-1 bg-gray-800 border border-gray-700 text-white"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              <IoMdSend />
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
}
