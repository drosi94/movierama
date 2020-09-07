import { HTTP_STATUS } from '../enums/HTTP_STATUS';
import { HTTP_METHODS } from '../enums/HTTP_METHODS';

export class AjaxHttpCaller {
  /**
   * Create a new AjaxHttpCaller object for sending ajax requests (GET OR POST) to a specific API url
   * @param apiUrl, The API url to send the requests.
   */
  constructor(apiUrl) {
    if (apiUrl) {
      this.API_URL = apiUrl;
    } else {
      this.API_URL = 'http://localhost:8080';
    }

    this.xmlHttp = new XMLHttpRequest();
  }

  /**
   * Send the API request
   * @param method, GET OR POST
   * @param endpoint, the endpoint of api url to send request
   * @param data, the data to send with request
   */
  async sendRequest(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      if (method === HTTP_METHODS.GET) {
        this._ajaxRequestGet(endpoint);
      } else if (method === HTTP_METHODS.POST) {
        this._ajaxRequestPost(endpoint, data);
      } else {
        throw new Error('Method not defined');
      }
      this.xmlHttp.onreadystatechange = () => {
        try {
          // When http state is done(4)
          if (this.xmlHttp.readyState === XMLHttpRequest.DONE) {
            // XMLHttpRequest.DONE == 4
            if (
              this.xmlHttp.status === HTTP_STATUS.OK ||
              this.xmlHttp.status === HTTP_STATUS.CREATED
            ) {
              return resolve(JSON.parse(this.xmlHttp.responseText)); // No error occurred, pass the object
            } else if (this.xmlHttp.status === HTTP_STATUS.NOT_FOUND) {
              return reject({
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Resource not found',
              });
            } else if (this.xmlHttp.status === HTTP_STATUS.BAD_REQUEST) {
              return reject({
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Bad Request',
              });
            } else if (this.xmlHttp.status === HTTP_STATUS.SERVER_ERROR) {
              return reject({
                status: HTTP_STATUS.SERVER_ERROR,
                message: 'Server error',
              });
            } else {
              return reject({
                status: HTTP_STATUS.SERVER_ERROR,
                message: 'Server error',
              });
            }
          }
        } catch (err) {
          console.error('ajaxHttmpCaller error', err);
          return reject({
            status: HTTP_STATUS.SERVER_ERROR,
            message: 'Server error',
          });
        }
      };
    });
  }

  _ajaxRequestGet(endpoint) {
    this.xmlHttp.open('GET', `${this.API_URL}/${endpoint}`, true);
    this.xmlHttp.setRequestHeader('Accept', 'application/json');
    this.xmlHttp.send(null);
  }

  _ajaxRequestPost(endpoint, data) {
    this.xmlHttp.open('POST', `${this.API_URL}/${endpoint}`, true);
    this.xmlHttp.setRequestHeader('Accept', 'application/json');
    this.xmlHttp.setRequestHeader('Content-Type', 'application/json');
    this.xmlHttp.send(data ? JSON.stringify(data) : null);
  }
}
