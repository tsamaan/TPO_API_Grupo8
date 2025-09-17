import { useState } from 'react';
import '../styles/ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Datos del formulario:', formData);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        });
        alert('Mensaje enviado con éxito!');
    };

    return (
        <div className="contact-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '4rem', minHeight: '80vh', width: '100%' }}>
            <div className="contact-info" style={{ textAlign: 'left', minWidth: 320, marginLeft: 0, flex: '0 0 320px' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>Contacto</h1>
                <p style={{ marginBottom: '1.2rem' }}>WhatsApp: 541151783645</p>
                <p style={{ marginBottom: '1.2rem' }}>haversack.ventas@gmail.com</p>
                <p>Punta arenas 1326, La paternal, CABA</p>
            </div>
            <form className="contact-form" style={{ flex: '1 1 0', minWidth: 400, width: '100%', marginTop: '2.5rem' }} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">NOMBRE</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">TELÉFONO</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mensaje">MENSAJE</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ContactPage;