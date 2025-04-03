import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type AdvancedTypewriterProps = {
  text: string | string[];
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  typingSound?: boolean;
  soundVolume?: number;
  lineDelay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  highlightColor?: string;
};

const AdvancedTypewriter: React.FC<AdvancedTypewriterProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 30,
  cursor = true,
  cursorBlinkSpeed = 500,
  typingSound = true,
  soundVolume = 0.1,
  lineDelay = 300,
  repeat = false,
  repeatDelay = 2000,
  highlightColor = 'text-blue-500',
}) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Convert single string to array for consistent handling
  const textArray = Array.isArray(text) ? text : [text];

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
      if (isWaiting) {
        const waitTimeout = setTimeout(() => {
          if (repeat) {
            // Reset for repeat
            setDisplayText([]);
            setCurrentLine(0);
            setCurrentChar(0);
            setIsTypingComplete(false);
            setIsDeleting(false);
            setIsWaiting(false);
          }
        }, repeatDelay);
        return () => clearTimeout(waitTimeout);
      }

      if (isDeleting) {
        // Handle deletion
        const deleteTimeout = setTimeout(() => {
          if (currentChar > 0) {
            setDisplayText(prev => {
              const newText = [...prev];
              newText[currentLine] = newText[currentLine].slice(0, -1);
              return newText;
            });
            setCurrentChar(prev => prev - 1);
          } else if (currentLine > 0) {
            setCurrentLine(prev => prev - 1);
            setCurrentChar(textArray[currentLine - 1].length);
          } else {
            setIsDeleting(false);
            setIsWaiting(true);
          }
        }, speed / 2);
        return () => clearTimeout(deleteTimeout);
      }

      if (currentLine < textArray.length) {
        if (currentChar < textArray[currentLine].length) {
          // Type next character
          const typeTimeout = setTimeout(() => {
            setDisplayText(prev => {
              const newText = [...prev];
              if (!newText[currentLine]) {
                newText[currentLine] = '';
              }
              newText[currentLine] += textArray[currentLine][currentChar];
              return newText;
            });
            setCurrentChar(prev => prev + 1);
            
            // Play typing sound
            if (typingSound && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {
                // Ignore errors if audio can't play
              });
            }
          }, speed);
          return () => clearTimeout(typeTimeout);
        } else {
          // Move to next line
          const lineTimeout = setTimeout(() => {
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }, lineDelay);
          return () => clearTimeout(lineTimeout);
        }
      } else {
        // Typing complete
        setIsTypingComplete(true);
        if (repeat) {
          // Start deletion after delay
          const completeTimeout = setTimeout(() => {
            setIsDeleting(true);
            setCurrentChar(textArray[textArray.length - 1].length);
          }, repeatDelay);
          return () => clearTimeout(completeTimeout);
        }
      }
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [
    currentLine, 
    currentChar, 
    textArray, 
    speed, 
    delay, 
    typingSound, 
    lineDelay, 
    repeat, 
    repeatDelay, 
    isDeleting, 
    isWaiting
  ]);

  return (
    <div className={className}>
      {displayText.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-2">
          {line.split('').map((char, charIndex) => {
            // Highlight certain characters (e.g., first letter of each word)
            const isHighlighted = charIndex === 0 || 
              (charIndex > 0 && line[charIndex - 1] === ' ' && char !== ' ');
            
            return (
              <span 
                key={charIndex} 
                className={isHighlighted ? highlightColor : ''}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
      
      {cursor && !isTypingComplete && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: cursorBlinkSpeed / 1000,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut"
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

export default AdvancedTypewriter; 