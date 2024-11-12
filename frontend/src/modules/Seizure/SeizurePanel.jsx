// SeizurePanel.jsx
import React, { useState } from 'react';
import SeizureForm from './SeizureForm';
import ConciliationForm from './ConciliationForm';
import './styles/seizureStyles.css';

function SeizurePanel() {
    const [activeTab, setActiveTab] = useState('registerSeizure');

    return (
        <div className="seizure-panel">
            <div className="tabs">
                <button onClick={() => setActiveTab('registerSeizure')}>
                    Registrar Incautación
                </button>
                <button onClick={() => setActiveTab('registerConciliation')}>
                    Registrar Conciliación
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'registerSeizure' && <SeizureForm />}
                {activeTab === 'registerConciliation' && <ConciliationForm />}
            </div>
        </div>
    );
}

export default SeizurePanel;
