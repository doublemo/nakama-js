// tslint:disable
/* Code generated by openapi-gen/main.go. DO NOT EDIT. */

import { buildFetchOptions } from './utils';
import { encode } from 'js-base64';

/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiAuthenticateLogoutRequest {
  // Refresh token to invalidate.
  refresh_token?: string;
  // Session token to log out.
  token?: string;
}

/** Authenticate against the server with a refresh token. */
export interface ApiAuthenticateRefreshRequest {
  // Refresh token.
  refresh_token?: string;
}

/**  */
export interface ApiAuthenticateRequest {
  // Identity ID. Must be between eight and 128 characters (inclusive). Must be an alphanumeric string with only underscores and hyphens allowed.
  id?: string;
}

/** A single event. Usually, but not necessarily, part of a batch. */
export interface ApiEvent {
  // Optional event ID assigned by the client, used to de-duplicate in retransmission scenarios. If not supplied the server will assign a randomly generated unique event identifier.
  id?: string;
  // Event metadata, if any.
  metadata?: Record<string, string>;
  // Event name.
  name?: string;
  // The time when the event was triggered on the producer side.
  timestamp?: string;
  // Optional value.
  value?: string;
}

/**  */
export interface ApiEventRequest {
  // Some number of events produced by a client.
  events?: Array<ApiEvent>;
}

/** An experiment that this user is partaking. */
export interface ApiExperiment {
  // 
  name?: string;
  // Value associated with this Experiment.
  value?: string;
}

/** All experiments that this identity is involved with. */
export interface ApiExperimentList {
  // All experiments for this identity.
  experiments?: Array<ApiExperiment>;
}

/** Feature flag available to the identity. */
export interface ApiFlag {
  // Whether the value for this flag has conditionally changed from the default state.
  condition_changed?: boolean;
  // 
  name?: string;
  // Value associated with this flag.
  value?: string;
}

/**  */
export interface ApiFlagList {
  // 
  flags?: Array<ApiFlag>;
}

/** Enrich/replace the current session with a new ID. */
export interface ApiIdentifyRequest {
  // Optional custom properties to update with this call. If not set, properties are left as they are on the server.
  custom?: Record<string, string>;
  // Optional default properties to update with this call. If not set, properties are left as they are on the server.
  default?: Record<string, string>;
  // Identity ID to enrich the current session and return a new session. Old session will no longer be usable.
  id?: string;
}

/** A single live event. */
export interface ApiLiveEvent {
  // End time of current event run.
  active_end_time_sec?: string;
  // Start time of current event run.
  active_start_time_sec?: string;
  // Description.
  description?: string;
  // Name.
  name?: string;
  // Event value.
  value?: string;
}

/** List of Live events. */
export interface ApiLiveEventList {
  // Live events.
  live_events?: Array<ApiLiveEvent>;
}

/** Properties associated with an identity. */
export interface ApiProperties {
  // Event computed properties.
  computed?: Record<string, string>;
  // Event custom properties.
  custom?: Record<string, string>;
  // Event default properties.
  default?: Record<string, string>;
}

/** A session. */
export interface ApiSession {
  // Properties associated with this identity.
  properties?: ApiProperties;
  // Refresh token.
  refresh_token?: string;
  // Token credential.
  token?: string;
}

/** Update Properties associated with this identity. */
export interface ApiUpdatePropertiesRequest {
  // Event custom properties.
  custom?: Record<string, string>;
  // Event default properties.
  default?: Record<string, string>;
}

/**  */
export interface ProtobufAny {
  // 
  type?: string;
}

/**  */
export interface RpcStatus {
  // 
  code?: number;
  // 
  details?: Array<ProtobufAny>;
  // 
  message?: string;
}

export class SatoriApi {

  constructor(readonly apiKey: string, readonly basePath: string, readonly timeoutMs: number) {}

  /** A healthcheck which load balancers can use to check the service. */
  satoriHealthcheck(bearerToken: string,
      options: any = {}): Promise<any> {
    
    const urlPath = "/healthcheck";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** A readycheck which load balancers can use to check the service. */
  satoriReadycheck(bearerToken: string,
      options: any = {}): Promise<any> {
    
    const urlPath = "/readycheck";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Authenticate against the server. */
  satoriAuthenticate(basicAuthUsername: string,
    basicAuthPassword: string,
      body:ApiAuthenticateRequest,
      options: any = {}): Promise<ApiSession> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/authenticate";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  satoriAuthenticateLogout(bearerToken: string,
      body:ApiAuthenticateLogoutRequest,
      options: any = {}): Promise<any> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/authenticate/logout";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  satoriAuthenticateRefresh(basicAuthUsername: string,
    basicAuthPassword: string,
      body:ApiAuthenticateRefreshRequest,
      options: any = {}): Promise<ApiSession> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/authenticate/refresh";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    fetchOptions.headers["Authorization"] = "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword);

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Publish an event for this session. */
  satoriEvent(bearerToken: string,
      body:ApiEventRequest,
      options: any = {}): Promise<any> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/event";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("POST", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Get or list all available experiments for this identity. */
  satoriGetExperiments(bearerToken: string,
      names?:Array<string>,
      options: any = {}): Promise<ApiExperimentList> {
    
    const urlPath = "/v1/experiment";
    const queryParams = new Map<string, any>();
    queryParams.set("names", names);

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** List all available flags for this identity. */
  satoriGetFlags(bearerToken: string,
      names?:Array<string>,
      options: any = {}): Promise<ApiFlagList> {
    
    const urlPath = "/v1/flag";
    const queryParams = new Map<string, any>();
    queryParams.set("names", names);

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Enrich/replace the current session with new identifier. */
  satoriIdentify(bearerToken: string,
      body:ApiIdentifyRequest,
      options: any = {}): Promise<ApiSession> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/identify";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** List available live events. */
  satoriGetLiveEvents(bearerToken: string,
      names?:Array<string>,
      options: any = {}): Promise<ApiLiveEventList> {
    
    const urlPath = "/v1/live-event";
    const queryParams = new Map<string, any>();
    queryParams.set("names", names);

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** List properties associated with this identity. */
  satoriListProperties(bearerToken: string,
      options: any = {}): Promise<ApiProperties> {
    
    const urlPath = "/v1/properties";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("GET", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

  /** Update identity properties. */
  satoriUpdateProperties(bearerToken: string,
      body:ApiUpdatePropertiesRequest,
      options: any = {}): Promise<any> {
    
    if (body === null || body === undefined) {
      throw new Error("'body' is a required parameter but is null or undefined.");
    }
    const urlPath = "/v1/properties";
    const queryParams = new Map<string, any>();

    let bodyJson : string = "";
    bodyJson = JSON.stringify(body || {});

    const fullUrl = this.buildFullUrl(this.basePath, urlPath, queryParams);
    const fetchOptions = buildFetchOptions("PUT", options, bodyJson);
    if (bearerToken) {
        fetchOptions.headers["Authorization"] = "Bearer " + bearerToken;
    }

    return Promise.race([
      fetch(fullUrl, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.timeoutMs, "Request timed out.")
      ),
    ]);
}

    buildFullUrl(basePath: string, fragment: string, queryParams: Map<string, any>) {
        let fullPath = basePath + fragment + "?";

        for (let [k, v] of queryParams) {
            if (v instanceof Array) {
                fullPath += v.reduce((prev: any, curr: any) => {
                return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            } else {
                if (v != null) {
                    fullPath += encodeURIComponent(k) + "=" + encodeURIComponent(v) + "&";
                }
            }
        }

        return fullPath;
    }
};
