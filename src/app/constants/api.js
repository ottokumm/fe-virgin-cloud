import * as api from '../config/api';

export const API_HOST = api.API_HOST;
export const API_ROOT = api.API_ROOT;

const FILES = '';

class Files {
    static GET_FILES = `${FILES}`;
    static GET_FILES_BY_PATH = `${FILES}/:path`;

}

export class Api {
    static Files = Files;
}