import React, { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable'; 
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  return (
    <div className="App">

          <StudentTable/>
    </div>
  );
}

export default App;
