class Customer {
  constructor({ id, name, email, phone, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email ?? null;
    this.phone = phone ?? null;
    this.createdAt = createdAt;
  }
}

module.exports = Customer;
