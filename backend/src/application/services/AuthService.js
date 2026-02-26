/**
 * AuthService.js
 * Capa de aplicación: Lógica de negocio para autenticación
 * Maneja registro, inicio de sesión y gestión de tokens JWT
 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

/**
 * Servicio de autenticación para gestionar usuarios y sesiones
 * @param {Object} userRepository - Repositorio de usuarios
 */
class AuthService {
  /**
   * @param {Object} userRepository - Repositorio de usuarios
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Registra un nuevo usuario en el sistema
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.name - Nombre completo
   * @param {string} userData.email - Correo electrónico
   * @param {string} userData.password - Contraseña
   * @returns {Promise<Object>} Usuario creado con token JWT
   * @throws {ValidationError} Si faltan datos o el email ya existe
   */
  async register(userData) {
    if (!userData.name || !userData.email || !userData.password) {
      throw new ValidationError('Nombre, email y password son requeridos');
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ValidationError('El email ya esta en uso');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  /**
   * Inicia sesión con credenciales existentes
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.email - Correo electrónico
   * @param {string} credentials.password - Contraseña
   * @returns {Promise<Object>} Usuario autenticado con token JWT
   * @throws {ValidationError} Si las credenciales son inválidas
   */
  async login(credentials) {
    if (!credentials.email || !credentials.password) {
      throw new ValidationError('Email y password son requeridos');
    }

    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new ValidationError('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError('Credenciales inválidas');
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  /**
   * Genera un token JWT para el usuario
   * @param {Object} user - Datos del usuario
   * @returns {string} Token JWT
   */
  generateToken(user) {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    return jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '7d' }
    );
  }

  /**
   * Verifica la validez de un token JWT
   * @param {string} token - Token a verificar
   * @returns {Object} Datos decodificados del token
   * @throws {ValidationError} Si el token es inválido
   */
  verifyToken(token) {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new ValidationError('Token inválido');
    }
  }

  /**
   * Obtiene el usuario actual basado en el ID del token
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} Datos del usuario
   * @throws {NotFoundError} Si el usuario no existe
   */
  async getCurrentUser(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      store: user.store,
    };
  }
}

export default AuthService;
