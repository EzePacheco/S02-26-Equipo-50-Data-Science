import SaleSchema from '../../domain/schemas/sale.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class CreateSaleDTO {
  /**
   * @param {Object} params
   * @param {string} params.userId
   * @param {string|null} params.customerId
   * @param {Array<{productId: string, productName: string, quantity: number, unitPrice: number}>} params.items
   */
  constructor({ userId, customerId, items }) {
    this.userId = userId;
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = this.calculateTotal();
  }

  /**
   * Calcula el monto total de la venta basado en los items
   * @returns {number}
   */
  calculateTotal() {
    if (!this.items || !Array.isArray(this.items)) {
      return 0;
    }
    return this.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + subtotal;
    }, 0);
  }

  /**
   * Valida los datos del DTO contra el schema de Zod
   * @throws {ValidationError} Si los datos no son válidos
   */
  validate() {
    const validationSchema = SaleSchema.omit({ id: true, totalAmount: true });

    const result = validationSchema.safeParse({
      userId: this.userId,
      customerId: this.customerId,
      items: this.items,
    });

    if (!result.success) {
      const errorIssues = result.error.issues;
      const errors = errorIssues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      throw new ValidationError('Validación de venta fallida', errors);
    }
  }
}

export default CreateSaleDTO;
