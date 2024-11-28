// SeizureForm.jsx
import React, { useState } from 'react';

function SeizureForm() {
    const [seizureData, setSeizureData] = useState({
        details: '',
        year: '',
        month: '',
        CEO: '',
        quantity: 0,
        valueBs: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeizureData({ ...seizureData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de incautación enviados:', seizureData);
        alert('Incautación registrada exitosamente');
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label>Detalle de los Artículos</label>
            <input type="text" name="details" value={seizureData.details} onChange={handleChange} required />
            
            <label>Año</label>
            <input type="number" name="year" value={seizureData.year} onChange={handleChange} required />
            
            <label>Mes</label>
            <input type="text" name="month" value={seizureData.month} onChange={handleChange} required />
            
            <label>CEO Responsable</label>
            <input type="text" name="CEO" value={seizureData.CEO} onChange={handleChange} required />
            
            <label>Cantidad</label>
            <input type="number" name="quantity" value={seizureData.quantity} onChange={handleChange} required />
            
            <label>Valor en Bs</label>
            <input type="number" name="valueBs" value={seizureData.valueBs} onChange={handleChange} required />
            
            <button type="submit">Registrar Incautación</button>
        </form>
    );
}

export default SeizureForm;
