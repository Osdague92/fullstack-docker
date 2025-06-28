// frontend/src/App.js

import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Navbar from './components/Navbar';
import './App.css'; // Mantenemos un App.css para estilos básicos
// import './index.css'; // Ya no es necesario si index.css solo tenía directivas Tailwind

// Componente principal de la aplicación.
function App() {
  const [editingItem, setEditingItem] = useState(null);
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleFormSuccess = () => {
    setEditingItem(null);
    setRefreshListTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Aplicación Fullstack Nebulae</h1>
      </header>
      <main>
        <ItemForm itemToEdit={editingItem} onFormSuccess={handleFormSuccess} />
        <hr style={{ margin: '20px auto', width: '80%', border: '0', borderTop: '2px solid #eee' }} />
        <ItemList onEdit={handleEdit} refreshTrigger={refreshListTrigger} />
      </main>
    </div>
  );
}

export default App;