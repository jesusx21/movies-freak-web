export default class Session {
  constructor({ isActive, expiresAt, token, user }) {
    this.isActive = isActive;
    this.expiresAt = expiresAt;
    this.token = token;
    this.user = user
  }

  remove() {
    localStorage.removeItem('session');
  }

  save() {
    localStorage.setItem('session', JSON.stringify(this));
  }

  static get() {
    const result = localStorage.getItem('session');

    if (!result) {
      return;
    }


    return new Session(JSON.parse(result));
  }
}