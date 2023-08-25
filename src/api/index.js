import Api from './api';
import config from '../config';

export default function buildAPI() {
  return new Api(config.serverHost, config.serverPort);
}
