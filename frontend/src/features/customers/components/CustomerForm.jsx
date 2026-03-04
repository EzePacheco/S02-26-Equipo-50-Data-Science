// CustomerForm.jsx
// Component for creating/editing a customer

import { useState, useEffect } from 'react';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';

export default function CustomerForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                phone: initialData.phone || ''
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const data = {
                name: formData.name.trim(),
                email: formData.email.trim() || null,
                phone: formData.phone.trim() || null
            };
            
            await onSubmit(data);
        } catch (err) {
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2  text-left">
                <Label htmlFor="name">Nombre del cliente *</Label>
                <Input
                    id="name"
                    placeholder="Ej: Juan Pérez"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                />
            </div>

            {/* Email */}
            <div className="space-y-2  text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Ej: juan@correo.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                />
            </div>

            {/* Phone */}
            <div className="space-y-2  text-left">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                    id="phone"
                    placeholder="Ej: 951123456"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={errors.phone}
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    );
}
