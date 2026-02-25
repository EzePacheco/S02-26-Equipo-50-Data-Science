// NotFoundError.js
// Error when entity is not found

import DomainError from './DomainError.js';

class NotFoundError extends DomainError {
  constructor(message) {
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
