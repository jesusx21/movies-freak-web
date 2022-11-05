export default class User {
  constructor({ id, name, lastName, username, birthdate }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.username = username;
    this.birthdate = birthdate;
  }

  save() {
    localStorage.setItem('user', JSON.stringify(this));
  }

  static get() {
    const result = localStorage.getItem('user');

    if (!result) {
      return;
    }


    return new User(JSON.parse(result));
  }

  static remove() {
    localStorage.removeItem('user');
  }
}
