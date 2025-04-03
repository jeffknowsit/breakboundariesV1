import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  typingSound?: boolean;
  soundVolume?: number;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 50,
  cursor = true,
  cursorBlinkSpeed = 530,
  typingSound = true,
  soundVolume = 0.2,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typingSound) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      audioRef.current.volume = soundVolume;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [typingSound, soundVolume]);

  // Handle typing effect
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
          
          // Play typing sound
          if (typingSound && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
              // Ignore errors if audio can't play
            });
          }
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        setIsTypingComplete(true);
      }
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [currentIndex, text, speed, delay, typingSound]);

  return (
    <div className={className}>
      <span>{displayText}</span>
      {cursor && !isTypingComplete && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: cursorBlinkSpeed / 1000,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="inline-block w-1 h-6 ml-1 bg-current align-middle"
          style={{ 
            boxShadow: '0 0 5px currentColor',
            borderRadius: '1px'
          }}
        />
      )}
    </div>
  );
};

export default TypewriterText; 