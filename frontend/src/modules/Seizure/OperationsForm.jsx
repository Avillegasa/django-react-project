// OperationsForm.jsx
import React, { useState } from 'react';

function OperationsForm() {
    const [operationData, setOperationData] = useState({
        detail: '',
        year: '',
        month: '',
        week1: 0,
        week2: 0,
        week3: 0,
        week4: 0,
        week5: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOperationData({ ...operationData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de operación enviados:', operationData);
        alert('Operación registrada exitosamente');
        // Aquí podrías incluir la lógica para enviar los datos al backend
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                type="text"
                name="detail"
                placeholder="Detalle de la operación"
                value={operationData.detail}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="year"
                placeholder="Año"
                value={operationData.year}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="month"
                placeholder="Mes"
                value={operationData.month}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="week1"
                placeholder="Semana 1"
                value={operationData.week1}
                onChange={handleChange}
            />
            <input
                type="number"
                name="week2"
                placeholder="Semana 2"
                value={operationData.week2}
                onChange={handleChange}
            />
            <input
                type="number"
                name="week3"
                placeholder="Semana 3"
                value={operationData.week3}
                onChange={handleChange}
            />
            <input
                type="number"
                name="week4"
                placeholder="Semana 4"
                value={operationData.week4}
                onChange={handleChange}
            />
            <input
                type="number"
                name="week5"
                placeholder="Semana 5"
                value={operationData.week5}
                onChange={handleChange}
            />
            <button type="submit">Registrar Operación</button>
        </form>
    );
}

export default OperationsForm;
