import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

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

  generateToken(user) {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    return jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token) {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new ValidationError('Token inválido');
    }
  }

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
