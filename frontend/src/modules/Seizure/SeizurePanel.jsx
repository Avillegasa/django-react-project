// SeizurePanel.jsx
import React, { useState } from 'react';
import SeizureForm from './SeizureForm';
import ConciliationForm from './ConciliationForm';
import OperationsForm from './OperationsForm';
import './styles/seizureStyles.css';

function SeizurePanel() {
    const [activeTab, setActiveTab] = useState('registerSeizure');

    return (
        <div className="container">
            <aside className="sidebar">
                <h2 className="sidebar-logo">MINISTERIO DE DEFENSA</h2>
                <nav>
                    <button onClick={() => setActiveTab('registerSeizure')}>Incautaciones</button>
                    <button onClick={() => setActiveTab('registerConciliation')}>Conciliaciones</button>
                    <button onClick={() => setActiveTab('registerOperation')}>Operaciones</button>
                </nav>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Registro de Incautaciones</h1>
                    <div className="profile-icon">👤</div>
                </header>
                <div className="form-container">
                    {activeTab === 'registerSeizure' && <SeizureForm />}
                    {activeTab === 'registerConciliation' && <ConciliationForm />}
                    {activeTab === 'registerOperation' && <OperationsForm />}
                </div>
            </main>
        </div>
    );
}

export default SeizurePanel;
