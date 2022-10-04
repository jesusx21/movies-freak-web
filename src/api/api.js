import axios from 'axios';

import config from '../config';

class Api {
  constructor(host, port) {
    const baseURL = `http://${host}:${port}/movies-freak/api/v1`;

    this._request = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  get(endpoint, params) {
    return this._request.get(endpoint, { params });
  }

  post(endpoint, payload) {
    return this._request.post(endpoint, payload);
  }
}

export default new Api(config.serverHost, config.serverPort);
