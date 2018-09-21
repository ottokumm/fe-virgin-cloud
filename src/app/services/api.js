import { Api } from '../constants/api';
import { Request } from '../utils/api';

const { get } = Request;

const fs = {
  getFiles: () => get(Api.Files.GET_FILES),
  getFilesByPath: (path = '') => get(Api.Files.GET_FILES_BY_PATH.replace(':path', path)),
};

export { fs };
