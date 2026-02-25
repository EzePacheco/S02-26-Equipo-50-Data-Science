import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

class CustomerService {
  /**
   * @param {import('../../domain/repositories/ICustomerRepository.js').default} customerRepository
   */
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  /**
   * Crea un nuevo cliente
   * @param {Object} customerData
   * @returns {Promise<Object>}
   */
  async createCustomer(customerData) {
    if (!customerData.name) {
      throw new ValidationError('El nombre es requerido');
    }

    if (customerData.email) {
      const existingEmail = await this.customerRepository.findByEmail(customerData.email);
      if (existingEmail) {
        throw new ValidationError('El email ya esta en uso');
      }
    }

    if (customerData.phone) {
      const existingPhone = await this.customerRepository.findByPhone(customerData.phone);
      if (existingPhone) {
        throw new ValidationError('El telefono ya esta en uso');
      }
    }

    return await this.customerRepository.create(customerData);
  }

  /**
   * Obtiene un cliente por ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getCustomerById(id) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundError('Cliente no encontrado');
    }
    return customer;
  }

  /**
   * Obtiene todos los clientes
   * @returns {Promise<Array>}
   */
  async getAllCustomers() {
    return await this.customerRepository.findAll();
  }

  /**
   * Actualiza un cliente
   * @param {string} id
   * @param {Object} customerData
   * @returns {Promise<Object>}
   */
  async updateCustomer(id, customerData) {
    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new NotFoundError('Cliente no encontrado');
    }

    if (customerData.email && customerData.email !== existingCustomer.email) {
      const emailInUse = await this.customerRepository.findByEmail(customerData.email);
      if (emailInUse) {
        throw new ValidationError('El email ya esta en uso');
      }
    }

    return await this.customerRepository.update(id, customerData);
  }

  /**
   * Elimina un cliente
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteCustomer(id) {
    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new NotFoundError('Cliente no encontrado');
    }
    return await this.customerRepository.delete(id);
  }

  /**
   * Busca clientes por nombre o email
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchCustomers(query) {
    const allCustomers = await this.customerRepository.findAll();
    const lowerQuery = query.toLowerCase();
    
    return allCustomers.filter(customer => 
      customer.name.toLowerCase().includes(lowerQuery) ||
      (customer.email && customer.email.toLowerCase().includes(lowerQuery))
    );
  }
}

export default CustomerService;
