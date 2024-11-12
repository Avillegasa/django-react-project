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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos de conciliación:', conciliationData);  // Verificar que este log funcione
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="number" name="year" placeholder="Año" value={conciliationData.year} onChange={handleChange} required />
            <input type="text" name="month" placeholder="Mes" value={conciliationData.month} onChange={handleChange} required />
            <input type="number" name="conciliatedActs" placeholder="Actas conciliadas" value={conciliationData.conciliatedActs} onChange={handleChange} required />
            <input type="number" name="computedActs" placeholder="Actas computadas" value={conciliationData.computedActs} onChange={handleChange} required />
            <input type="number" name="totalValueBs" placeholder="Valor total en Bs" value={conciliationData.totalValueBs} onChange={handleChange} required />
            <input type="number" name="retainedPercentage" placeholder="Porcentaje retenido" value={conciliationData.retainedPercentage} onChange={handleChange} required />
            <button type="submit">Registrar Conciliación</button>
        </form>
    );
}

export default ConciliationForm;
