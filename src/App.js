
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chatbot from './components/chatbot';
import CodeDebugg from './components/code_debugging';
import ContentGenerate from './components/content_generation';

import NavBar from './components/nav_bar';
import PhotoGenerate from './components/photo_generate';



function App() {
  return (
    <div className="App">
      <header className='header'> 
      <h2>Chatbot and Image Generator by AI </h2>
     
      <img src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg'/>
      </header>
      <NavBar />
      {/* <Chatbot /> */}
      {/* <PhotoGenerate /> */}
    <Routes>
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/photogenerate" element={<PhotoGenerate />} />
   <Route path="/contentgenerate" element={<ContentGenerate /> } />
      <Route path="/codedebugg" element={<CodeDebugg />} />
      
       
    </Routes>
    
    </div>
  );
}

export default App;
