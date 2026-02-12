// NotFoundError.js
// Error when entity is not found

import DomainError from './DomainError.js';

class NotFoundError extends DomainError {
  constructor(entity, id) {
    super(`${entity} with id ${id} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
    this.entity = entity;
    this.entityId = id;
  }
}

export default NotFoundError;
