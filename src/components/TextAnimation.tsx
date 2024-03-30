// TextAnimation.js
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Typography } from '@mui/material';

const TextAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentCharacterIndex = 0;
    const interval = setInterval(() => {
      if (currentCharacterIndex <= text.length) {
        setDisplayText(text.slice(0, currentCharacterIndex));
        currentCharacterIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <AnimatePresence>
      <Typography variant="h2" component="h2">
        {displayText}
      </Typography>
    </AnimatePresence>
  );
};

export default TextAnimation;
