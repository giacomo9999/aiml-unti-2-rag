import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';
import Recommendations from './Components/Recommendations';
import { InputForm } from './Components/InputForm';

const App = () => {
  return (
    <div>
      <Recommendations />
    </div>
  );
};

createRoot(document.querySelector('#root')!).render(<App />);

export default App;
