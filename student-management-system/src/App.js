import React, { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable'; 
import InputField from './components/Input.js';
import Header from './components/header';

import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  return (
    <div className="App">
          <Header /> 
    
          <StudentTable/>
       
    </div>
  );
}

export default App;
