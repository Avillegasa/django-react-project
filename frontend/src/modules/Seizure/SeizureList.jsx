// SeizureList.jsx
import React, { useEffect, useState } from 'react';
import { fetchSeizures } from '../../services/seizureService';

function SeizureList() {
    const [seizures, setSeizures] = useState([]);

    useEffect(() => {
        const loadSeizures = async () => {
            try {
                const data = await fetchSeizures();
                setSeizures(data);
            } catch (error) {
                console.error('Error al cargar incautaciones:', error);
            }
        };
        loadSeizures();
    }, []);

    return (
        <div>
            <h2>Incautaciones Registradas</h2>
            <ul>
                {seizures.map((seizure, index) => (
                    <li key={index}>
                        {seizure.details} - {seizure.valueBs} Bs
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeizureList;
