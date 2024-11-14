import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';

const Incautaciones = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        categoria: '',
        detalle: '',
        anio: '',
        mes: '',
        semana: '',
        cantidad: '' // Agregado el campo de cantidad
    });

    const categorias = [
        { value: 'operacion-general', label: 'Operación General' },
        { value: 'mercaderia', label: 'Mercadería' },
        { value: 'vehiculo', label: 'Vehículo' },
        { value: 'incinerado', label: 'Incinerado' },
        { value: 'grua', label: 'Grúa' },
    ];

    const semanas = [
        { value: 'semana_1', label: 'Semana 1' },
        { value: 'semana_2', label: 'Semana 2' },
        { value: 'semana_3', label: 'Semana 3' },
        { value: 'semana_4', label: 'Semana 4' },
        { value: 'semana_5', label: 'Semana 5' },
    ];

    const meses = [
        { value: 'Enero', label: 'Enero' },
        { value: 'Febrero', label: 'Febrero' },
        { value: 'Marzo', label: 'Marzo' },
        { value: 'Abril', label: 'Abril' },
        { value: 'Mayo', label: 'Mayo' },
        { value: 'Junio', label: 'Junio' },
        { value: 'Julio', label: 'Julio' },
        { value: 'Agosto', label: 'Agosto' },
        { value: 'Septiembre', label: 'Septiembre' },
        { value: 'Octubre', label: 'Octubre' },
        { value: 'Noviembre', label: 'Noviembre' },
        { value: 'Diciembre', label: 'Diciembre' },
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoria) {
            alert("Por favor, selecciona una categoría de incautación.");
            return;
        }
        if (!formData.semana) {
            alert("Por favor, selecciona una semana.");
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/comisos/${formData.categoria}/`, {
                detalle_operacion: formData.detalle,
                anio: formData.anio,
                mes: formData.mes,
                cantidad: formData.cantidad, // Incluye la cantidad en la solicitud
                [formData.semana]: 1,
            }, {
                headers: { Authorization: `Token ${user.token}`, 'Content-Type': 'application/json' }
            });

            alert(`${formData.categoria.replace('-', ' ')} registrado correctamente`);
            setFormData({ categoria: '', detalle: '', anio: '', mes: '', semana: '', cantidad: '' });
        } catch (error) {
            console.error(`Error registrando ${formData.categoria}:`, error);
            alert(`Error al registrar ${formData.categoria.replace('-', ' ')}`);
        }
    };

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="incautaciones-page">
            <Sidebar />
            <div className="content">
                <h2>Registro de Comisos</h2>
                <form onSubmit={handleSubmit}>
                    <label>Selecciona una categoría de incautación:</label>
                    <select name="categoria" value={formData.categoria} onChange={handleInputChange} required>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>

                    <label>Detalle de la operación:</label>
                    <input
                        type="text"
                        name="detalle"
                        placeholder="Detalle de Operación o Tipo"
                        value={formData.detalle}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Año:</label>
                    <input
                        type="number"
                        name="anio"
                        placeholder="Año"
                        value={formData.anio}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Mes:</label>
                    <select name="mes" value={formData.mes} onChange={handleInputChange} required>
                        <option value="">Seleccione un mes</option>
                        {meses.map((mes) => (
                            <option key={mes.value} value={mes.value}>{mes.label}</option>
                        ))}
                    </select>

                    <label>Selecciona una semana:</label>
                    <select name="semana" value={formData.semana} onChange={handleInputChange} required>
                        <option value="">Seleccione una semana</option>
                        {semanas.map((sem) => (
                            <option key={sem.value} value={sem.value}>{sem.label}</option>
                        ))}
                    </select>

                    <label>Cantidad:</label>
                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Cantidad"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit">Registrar Incautación</button>
                </form>
            </div>
        </div>
    );
};

export default Incautaciones;
