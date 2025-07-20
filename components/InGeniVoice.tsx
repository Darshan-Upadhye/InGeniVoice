'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './InGeniVoice.module.css';

const SpeechRecognition =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

export default function InGeniVoice({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef(window.speechSynthesis);
  const hasWelcomed = useRef(false);

  useEffect(() => {
    if (hasWelcomed.current) return;
    hasWelcomed.current = true;

    const welcome = "Hi, I'm InGeniVoice. How can I assist you today?";
    setMessages([{ sender: 'ai', text: welcome }]);
    speakText(welcome, 0);
  }, []);

  const speakText = (text: string, index: number) => {
    if (synthRef.current.speaking && playingIndex === index) {
      synthRef.current.cancel();
      setPlayingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';

    setPlayingIndex(index);
    utterance.onend = () => {
      setPlayingIndex(null);
    };

    synthRef.current.speak(utterance);
  };

  const handleRecord = () => {
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);

      const userMessage = { sender: 'user' as const, text: transcript };
      setMessages((prev) => [...prev, userMessage]);

      // Add typing dots
      setIsBotTyping(true);
      setMessages((prev) => [...prev, { sender: 'ai', text: 'typing...' }]);

      const aiResponse = await fetchAIResponse(transcript);

      setMessages((prev) => {
        const withoutTyping = prev.slice(0, -1);
        return [...withoutTyping, { sender: 'ai', text: aiResponse }];
      });

      setIsBotTyping(false);
      speakText(aiResponse, messages.length + 1);
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const fetchAIResponse = async (text: string) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      return data?.response || 'Sorry, I could not understand.';
    } catch (err) {
      return 'Something went wrong.';
    }
  };

  return (
    <div className={styles.voiceAssistantContainer}>
      <button className={styles.closeButton} onClick={onClose}>✖</button>

      <div className={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === 'ai' ? styles.aiMessage : styles.userMessage}
          >
            {msg.sender === 'ai' && (
              <>
                <img src="/AI Icon  Purple.svg" alt="AI" className={styles.avatarImg} />
                <div className={styles.voiceBubbleAI}>
                  <div className={styles.messageContent}>
                    {msg.text === 'typing...' ? (
                      <div className={styles.typingDots}>
                        <span>.</span><span>.</span><span>.</span>
                      </div>
                    ) : (
                      <>
                        <button
                          className={styles.playButton}
                          onClick={() => speakText(msg.text, idx)}
                        >
                          {playingIndex === idx ? '⏹️' : '▶️'}
                        </button>
                        <p>{msg.text}</p>
                      </>
                    )}
                  </div>
                  {playingIndex === idx && (
                    <div className={styles.waveAnimation}></div>
                  )}
                </div>
              </>
            )}

            {msg.sender === 'user' && (
              <>
                <div className={styles.voiceBubbleUser}>
                  <div className={styles.messageContent}>
                    <button
                      className={styles.playButton}
                      onClick={() => speakText(msg.text, idx)}
                    >
                      {playingIndex === idx ? '⏹️' : '▶️'}
                    </button>
                    <p>{msg.text}</p>
                  </div>
                  {playingIndex === idx && (
                    <div className={styles.waveAnimation}></div>
                  )}
                </div>
                <img src="/User Icon  Purple.svg" alt="User" className={styles.avatarImg} />
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.micButtonContainer}>
        <button
          className={styles.micButton}
          onClick={handleRecord}
          disabled={isRecording}
        >
          <img src="/Mic icon Sky Blue.svg" alt="Mic" className={styles.micIcon} />
          {isRecording && <div className={styles.waveRing}></div>}
        </button>
      </div>
    </div>
  );
}
