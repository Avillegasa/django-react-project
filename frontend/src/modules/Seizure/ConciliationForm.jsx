// ConciliationForm.jsx
import React, { useState } from 'react';

function ConciliationForm() {
    const [conciliationData, setConciliationData] = useState({
        year: '',
        month: '',
        conciliatedActs: 0,
        computedActs: 0,
        totalValueBs: 0,
        retainedPercentage: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConciliationData({ ...conciliationData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de conciliación enviados:', conciliationData);
        alert('Conciliación registrada exitosamente');
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label>Año</label>
            <input type="number" name="year" value={conciliationData.year} onChange={handleChange} required />
            
            <label>Mes</label>
            <input type="text" name="month" value={conciliationData.month} onChange={handleChange} required />
            
            <label>Actas Conciliadas</label>
            <input type="number" name="conciliatedActs" value={conciliationData.conciliatedActs} onChange={handleChange} required />
            
            <label>Actas Computadas</label>
            <input type="number" name="computedActs" value={conciliationData.computedActs} onChange={handleChange} required />
            
            <label>Valor Total en Bs</label>
            <input type="number" name="totalValueBs" value={conciliationData.totalValueBs} onChange={handleChange} required />
            
            <label>Porcentaje Retenido</label>
            <input type="number" name="retainedPercentage" value={conciliationData.retainedPercentage} onChange={handleChange} required />
            
            <button type="submit">Registrar Conciliación</button>
        </form>
    );
}

export default ConciliationForm;
