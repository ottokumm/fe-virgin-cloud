import * as api from '../config/api';

export const { API_HOST } = api;
export const { API_ROOT } = api;

const FILES = 'fs';

class Files {
  static GET_FILES = `${FILES}`;

  static GET_FILES_BY_PATH = `${FILES}/:path`;
}

export class Api {
  static Files = Files;
}
