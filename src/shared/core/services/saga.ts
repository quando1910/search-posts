import { ApiService, ErrorHandler } from './api';
import qs from 'qs';

function createURL(uri: any, query: any) {
  const queryParams = qs.stringify(query, { skipNulls: true });
  let paramsUrl: any;
  let url: any;
  if (typeof uri[uri.length - 1] !== 'string') {
    paramsUrl = uri.pop();
    url = uri.join('/');
    Object.keys(paramsUrl).forEach((x) => {
      url = url.replace(`:${x}`, paramsUrl[x]);
    });
  } else {
    url = uri.join('/');
  }
  return queryParams ? `${url}?${queryParams}` : url;
}

const apiService = new ApiService();

export function* get(
  uri: any,
  params = {},
  moreConfig = { timeout: 60000 }
): any {
  const url = createURL(uri, params);
  try {
    const res = yield apiService.makeRequest('GET', url, moreConfig);
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
}

export function* post(
  uri: any,
  body = {},
  params = {},
  moreConfig = {}
): any {
  const url = createURL(uri, params);
  const config = {
    ...body,
    ...moreConfig
  };
  try {
    const res = yield apiService.makeRequest('POST', url, config);
    return res.data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
}
