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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos de incautación:', seizureData);  // Verificar que este log funcione
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="text" name="details" placeholder="Detalles de artículos" value={seizureData.details} onChange={handleChange} required />
            <input type="number" name="year" placeholder="Año" value={seizureData.year} onChange={handleChange} required />
            <input type="text" name="month" placeholder="Mes" value={seizureData.month} onChange={handleChange} required />
            <input type="text" name="CEO" placeholder="CEO" value={seizureData.CEO} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Cantidad" value={seizureData.quantity} onChange={handleChange} required />
            <input type="number" name="valueBs" placeholder="Valor en Bs" value={seizureData.valueBs} onChange={handleChange} required />
            <button type="submit">Registrar Incautación</button>
        </form>
    );
}

export default SeizureForm;
