// ProductForm.jsx
// Component for creating/editing a product

import { useState, useEffect } from 'react';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Label } from '../../../shared/components/Label';
import { X } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

const DEFAULT_CATEGORIES = ['ROPA', 'CALZADO'];

// Helper to get categories with fallback chain
function getStoreCategories(user) {
    // 1. Try from AuthContext (populated after onboarding)
    if (user?.store?.categories?.length > 0) return user.store.categories;
    // 2. Try from localStorage (persisted during onboarding)
    try {
        const saved = localStorage.getItem('store_categories');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) { /* ignore */ }
    // 3. Fall back to defaults
    return DEFAULT_CATEGORIES;
}

export default function ProductForm({ initialData, onSubmit, onCancel }) {
    const { user } = useAuth();
    const storeCategories = getStoreCategories(user);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        category: storeCategories[0] || '',
        active: true
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                sku: initialData.sku || '',
                price: initialData.price ? String(initialData.price) : '',
                category: initialData.category || storeCategories[0] || '',
                active: initialData.active !== false
            });
        }
    }, [initialData, storeCategories]);

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.sku.trim()) {
            newErrors.sku = 'El SKU es requerido';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'El precio es requerido';
        } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser un número positivo';
        }

        if (!formData.category) {
            newErrors.category = 'La categoría es requerida';
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
                sku: formData.sku.trim(),
                price: parseFloat(formData.price),
                category: formData.category,
                active: formData.active
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
            <div className="space-y-2">
                <Label htmlFor="name">Nombre del producto *</Label>
                <Input
                    id="name"
                    placeholder="Ej: Camisa manga larga"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                />
            </div>

            {/* SKU */}
            <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                    id="sku"
                    placeholder="Ej: CAM-ML-001"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value.toUpperCase())}
                    error={errors.sku}
                />
            </div>

            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Precio (S/) *</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    error={errors.price}
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                >
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {storeCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                )}
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
                <input
                    id="active"
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => handleChange('active', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="active" className="cursor-pointer">
                    Producto activo
                </Label>
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
