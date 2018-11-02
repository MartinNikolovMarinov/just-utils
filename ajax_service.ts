declare global {
  namespace snow {
    interface IAjaxService {
      get(props: IAjaxRequestOptions): Promise<snow.IAjaxResponse>;
      post(props: IAjaxRequestOptions): Promise<snow.IAjaxResponse>;
      delete(props: IAjaxRequestOptions): Promise<snow.IAjaxResponse>;
      put(props: IAjaxRequestOptions): Promise<snow.IAjaxResponse>;
    }

    interface IAjaxRequestWrapper {
      request: XMLHttpRequest;
      url: string;
      headers: Record<string, string>;
      data?: any;
    }

    interface IAjaxResponse {
      status: number;
      data?: string;
    }

    interface IAjaxRequestOptions {
      url: string;
      data?: any;
      params?: Record<string, string>;
      headers?: Record<string, string>;
      timeout?: number;
    }
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class AjaxService implements snow.IAjaxService {
  private defaultHeaders: Record<string, string> = {
    'content-type': 'application/json'
  };

  constructor(core: any) {}

  public async get(props: snow.IAjaxRequestOptions): Promise<snow.IAjaxResponse> {
    const request = this.createRequest('GET', props);
    return this.sendRequest(request);
  }

  public async post(props: snow.IAjaxRequestOptions): Promise<snow.IAjaxResponse> {
    const request = this.createRequest('POST', props);
    return this.sendRequest(request);
  }

  public async put(props: snow.IAjaxRequestOptions): Promise<snow.IAjaxResponse> {
    const request = this.createRequest('PUT', props);
    return this.sendRequest(request);
  }

  public async delete(props: snow.IAjaxRequestOptions): Promise<snow.IAjaxResponse> {
    const request = this.createRequest('DELETE', props);
    return this.sendRequest(request);
  }

  public createRequest(httpMethod: HttpMethod, props: snow.IAjaxRequestOptions): snow.IAjaxRequestWrapper {
    const oldParams: Record<string, string> = {};
    const request = new XMLHttpRequest();
    const formattedHeaders = {};
    Object.keys(props.headers || {}).forEach((key) => {
      formattedHeaders[key.toLocaleLowerCase()] = props.headers[key];
    });
    const headers: Record<string, string> = Object.assign({}, this.defaultHeaders, formattedHeaders);

    if (props.timeout) request.timeout = props.timeout;
    if (props.params && props.url.indexOf('?')) {
      props.url = this.getUrlWithoutParams(props.url, oldParams);
      props.url = this.appendParams(props.url, oldParams, props.params);
    }

    props.url = encodeURI(props.url);
    request.open(httpMethod, props.url, true);
    Object.keys(headers).forEach((key) => {
      const value = headers[key];
      request.setRequestHeader(key, value);
    });

    return { request, headers, data: props.data, url: props.url };
  }

  private async sendRequest(ajaxRequest: snow.IAjaxRequestWrapper): Promise<snow.IAjaxResponse> {
    let request = ajaxRequest.request;
    const data = ajaxRequest.data;

    const requestPromise = new Promise<snow.IAjaxResponse>((resolve, reject) => {
      request.onreadystatechange = function handleOnReadyStateChange() {
        if (this.readyState !== XMLHttpRequest.DONE) return;

        const response = <snow.IAjaxResponse> {
          status: this.status,
          data: this.responseText
        };

        if (this.status >= 200 && this.status < 300) resolve(response);
        else reject(response);
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleOnAbort() {
        reject(<snow.IAjaxResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(<snow.IAjaxResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        reject(<snow.IAjaxResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      request.send(data !== undefined ? data : null);
    });

    return requestPromise;
  }

  private getUrlWithoutParams(url: string, params: Record<string, string>): string {
    const split = url.split('?');
    const paramStr = split[1];
    if (paramStr) {
      const paramsSplit = paramStr.split('&');
      paramsSplit.forEach((keyValuePair) => {
        const keyVal = keyValuePair.split('=');
        params[keyVal[0]] = keyVal[1];
      });
    }

    return split[0];
  }

  private appendParams(
    url: string,
    oldParams: Record<string, string>,
    params: Record<string, string>
  ): string {
    let keys = Object.keys(oldParams);
    const oldLen = keys.length;
    if (oldLen > 0) {
      url += '?';
      keys.forEach((key: string, i: number): void => {
        const paramIsMissing = (oldParams[key] === undefined || oldParams[key] === null)
        const val = paramIsMissing ? '' : oldParams[key];
        if (i < oldLen - 1) url += key + '=' + val + '&';
        else url += key + '=' + val;
      });
    }

    keys = Object.keys(params);
    const newLen = keys.length;
    if (newLen > 0) {
      url += oldLen > 0 ? '&' : '?';
      keys.forEach((key: string, i: number): void => {
        const paramIsMissing = (params[key] === undefined || params[key] === null)
        const val = paramIsMissing ? '' : params[key];
        if (i < newLen - 1) url += key + '=' + val + '&';
        else url += key + '=' + val;
      });
    }

    return url;
  }
}