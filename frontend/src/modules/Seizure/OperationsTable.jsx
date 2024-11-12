import React, { useState } from 'react';

function OperationsTable() {
    const [operations, setOperations] = useState([
        { detalle: 'PATRULLAJES MOVIL', semana1: 141, semana2: 152, semana3: 138, semana4: 174, semana5: 110 },
        { detalle: 'PUESTOS DE CONTROL FIJO', semana1: 53, semana2: 64, semana3: 63, semana4: 67, semana5: 72 }
    ]);

    return (
        <div>
            <h2>Operaciones Semanales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>Semana 1</th>
                        <th>Semana 2</th>
                        <th>Semana 3</th>
                        <th>Semana 4</th>
                        <th>Semana 5</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((op, index) => (
                        <tr key={index}>
                            <td>{op.detalle}</td>
                            <td>{op.semana1}</td>
                            <td>{op.semana2}</td>
                            <td>{op.semana3}</td>
                            <td>{op.semana4}</td>
                            <td>{op.semana5}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OperationsTable;
