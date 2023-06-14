// import React, { useEffect, useState } from 'react';

// const LoadingDots = () => {
//   const [dots, setDots] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots(prevDots => {
//         if (prevDots.length === 3) {
//           return '';
//         } else {
//           return prevDots + '.';
//         }
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return <div>{dots}</div>;
// };

// export default LoadingDots;
// import React, { useState, useEffect } from 'react';

// const ChatComponent = (
  
// ) => {
//   const [showText, setShowText] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowText((prevShowText) => {
//         const nextIndex = prevShowText.length + 1;
//         if (nextIndex <= message.length) {
//           return message.substring(0, nextIndex);
//         } else {
//           clearInterval(interval);
//           return prevShowText;
//         }
//       });
//     }, 100); // Adjust the interval duration as desired

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <div className='user_img_text'>
//         <img className='user_img' src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg' />
//         <p>{logInput[index]}</p>
//       </div>
//       <div className='assistance_img_text'>
//         <img className='user_img' src='https://static.vecteezy.com/system/resources/previews/011/894/733/original/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg' />
//         <p>{showText}</p>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;
// import React, { useState, useEffect } from 'react';

// const SlowText = () => {
//   const [displayText, setDisplayText] = useState('');
 
//  let delay = 100
//   useEffect(() => {
//     let timer = setTimeout(() => {
//       const nextCharIndex = displayText.length + 1;
//       setDisplayText(chat.substring(0, nextCharIndex));
//     }, delay);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [displayText, chat, delay]);

//   return <p>{displayText}</p>;
// };

// export default SlowText;


// useEffect(() => {
//     let timer;
//     const lastMessage = chat[chat.length - 1];
  
//     if (lastMessage) {
//       const nextCharIndex = displayText.length + 1;
  
//       timer = setTimeout(() => {
//         setDisplayText(prevDisplayText => lastMessage.substring(0, nextCharIndex));
//       }, delay);
//     }
  
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [chat]);

  
  
  
  
  