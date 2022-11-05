import axios from 'axios';

import config from '../config';

class Api {
  constructor(host, port) {
    const baseURL = `http://${host}:${port}/movies-freak/api/v1`;

    this._headers = { 'Content-Type': 'application/json' };
    this._request = axios.create({ baseURL });
  }

  setSession(session) {
    this._session = session
  }

  get(endpoint, params) {
    const headers = { ...this._headers, Authorization: `Bearer ${this._session.token}` };

    return this._request.get(endpoint, { params, headers });
  }

  post(endpoint, payload) {
    const headers = { ...this._headers, Authorization: `Bearer ${this._session.token}` };

    return this._request.post(endpoint, payload, headers);
  }
}

export default new Api(config.serverHost, config.serverPort);
