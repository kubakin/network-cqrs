import { Configuration } from '@yoldi/netbox-nodejs-api/src/configuration';
import { BASE_PATH, BaseAPI, RequestArgs } from '@yoldi/netbox-nodejs-api/dist/base';
import {
  assertParamExists,
  createRequestFunction,
  DUMMY_BASE_URL,
  serializeDataIfNeeded,
  setApiKeyToObject,
  setSearchParams,
  toPathString,
} from '@yoldi/netbox-nodejs-api/dist/common';
import {
  InlineResponse20055,
  InlineResponse20056,
  Secret,
  SecretRole,
  WritableSecret,
} from '@yoldi/netbox-nodejs-api/dist/models';
import globalAxios, { AxiosInstance, AxiosPromise } from 'axios';

export const SecretsApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
     * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsGenerateRsaKeyPairList: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/generate-rsa-key-pair/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsGetSessionKeyCreate: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/get-session-key/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkDelete: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkPartialUpdate: async (data: SecretRole, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretRolesBulkPartialUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkUpdate: async (data: SecretRole, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretRolesBulkUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesCreate: async (data: SecretRole, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretRolesCreate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesDelete: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretRolesDelete', 'id', id)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [slug]
     * @param {string} [q]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [slugN]
     * @param {string} [slugIc]
     * @param {string} [slugNic]
     * @param {string} [slugIew]
     * @param {string} [slugNiew]
     * @param {string} [slugIsw]
     * @param {string} [slugNisw]
     * @param {string} [slugIe]
     * @param {string} [slugNie]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesList: async (id?: string, name?: string, slug?: string, q?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, slugN?: string, slugIc?: string, slugNic?: string, slugIew?: string, slugNiew?: string, slugIsw?: string, slugNisw?: string, slugIe?: string, slugNie?: string, limit?: number, offset?: number, options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)

      if (id !== undefined) {
        localVarQueryParameter['id'] = id;
      }

      if (name !== undefined) {
        localVarQueryParameter['name'] = name;
      }

      if (slug !== undefined) {
        localVarQueryParameter['slug'] = slug;
      }

      if (q !== undefined) {
        localVarQueryParameter['q'] = q;
      }

      if (idN !== undefined) {
        localVarQueryParameter['id__n'] = idN;
      }

      if (idLte !== undefined) {
        localVarQueryParameter['id__lte'] = idLte;
      }

      if (idLt !== undefined) {
        localVarQueryParameter['id__lt'] = idLt;
      }

      if (idGte !== undefined) {
        localVarQueryParameter['id__gte'] = idGte;
      }

      if (idGt !== undefined) {
        localVarQueryParameter['id__gt'] = idGt;
      }

      if (nameN !== undefined) {
        localVarQueryParameter['name__n'] = nameN;
      }

      if (nameIc !== undefined) {
        localVarQueryParameter['name__ic'] = nameIc;
      }

      if (nameNic !== undefined) {
        localVarQueryParameter['name__nic'] = nameNic;
      }

      if (nameIew !== undefined) {
        localVarQueryParameter['name__iew'] = nameIew;
      }

      if (nameNiew !== undefined) {
        localVarQueryParameter['name__niew'] = nameNiew;
      }

      if (nameIsw !== undefined) {
        localVarQueryParameter['name__isw'] = nameIsw;
      }

      if (nameNisw !== undefined) {
        localVarQueryParameter['name__nisw'] = nameNisw;
      }

      if (nameIe !== undefined) {
        localVarQueryParameter['name__ie'] = nameIe;
      }

      if (nameNie !== undefined) {
        localVarQueryParameter['name__nie'] = nameNie;
      }

      if (slugN !== undefined) {
        localVarQueryParameter['slug__n'] = slugN;
      }

      if (slugIc !== undefined) {
        localVarQueryParameter['slug__ic'] = slugIc;
      }

      if (slugNic !== undefined) {
        localVarQueryParameter['slug__nic'] = slugNic;
      }

      if (slugIew !== undefined) {
        localVarQueryParameter['slug__iew'] = slugIew;
      }

      if (slugNiew !== undefined) {
        localVarQueryParameter['slug__niew'] = slugNiew;
      }

      if (slugIsw !== undefined) {
        localVarQueryParameter['slug__isw'] = slugIsw;
      }

      if (slugNisw !== undefined) {
        localVarQueryParameter['slug__nisw'] = slugNisw;
      }

      if (slugIe !== undefined) {
        localVarQueryParameter['slug__ie'] = slugIe;
      }

      if (slugNie !== undefined) {
        localVarQueryParameter['slug__nie'] = slugNie;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesPartialUpdate: async (id: number, data: SecretRole, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretRolesPartialUpdate', 'id', id)
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretRolesPartialUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesRead: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretRolesRead', 'id', id)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesUpdate: async (id: number, data: SecretRole, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretRolesUpdate', 'id', id)
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretRolesUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secret-roles/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkDelete: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/secrets/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkPartialUpdate: async (data: WritableSecret, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretsBulkPartialUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secrets/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkUpdate: async (data: WritableSecret, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretsBulkUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secrets/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsCreate: async (data: WritableSecret, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretsCreate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secrets/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsDelete: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretsDelete', 'id', id)
      const localVarPath = `/plugins/netbox_secretstore/secrets/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [created]
     * @param {string} [createdGte]
     * @param {string} [createdLte]
     * @param {string} [lastUpdated]
     * @param {string} [lastUpdatedGte]
     * @param {string} [lastUpdatedLte]
     * @param {string} [q]
     * @param {string} [roleId]
     * @param {string} [role]
     * @param {string} [device]
     * @param {string} [deviceId]
     * @param {string} [virtualMachine]
     * @param {string} [virtualMachineId]
     * @param {string} [tag]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [roleIdN]
     * @param {string} [roleN]
     * @param {string} [deviceN]
     * @param {string} [deviceIdN]
     * @param {string} [virtualMachineN]
     * @param {string} [virtualMachineIdN]
     * @param {string} [tagN]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsList: async (id?: string, name?: string, created?: string, createdGte?: string, createdLte?: string, lastUpdated?: string, lastUpdatedGte?: string, lastUpdatedLte?: string, q?: string, roleId?: string, role?: string, device?: string, deviceId?: string, virtualMachine?: string, virtualMachineId?: string, tag?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, roleIdN?: string, roleN?: string, deviceN?: string, deviceIdN?: string, virtualMachineN?: string, virtualMachineIdN?: string, tagN?: string, limit?: number, offset?: number, options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/plugins/netbox_secretstore/secrets/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)

      if (id !== undefined) {
        localVarQueryParameter['id'] = id;
      }

      if (name !== undefined) {
        localVarQueryParameter['name'] = name;
      }

      if (created !== undefined) {
        localVarQueryParameter['created'] = created;
      }

      if (createdGte !== undefined) {
        localVarQueryParameter['created__gte'] = createdGte;
      }

      if (createdLte !== undefined) {
        localVarQueryParameter['created__lte'] = createdLte;
      }

      if (lastUpdated !== undefined) {
        localVarQueryParameter['last_updated'] = lastUpdated;
      }

      if (lastUpdatedGte !== undefined) {
        localVarQueryParameter['last_updated__gte'] = lastUpdatedGte;
      }

      if (lastUpdatedLte !== undefined) {
        localVarQueryParameter['last_updated__lte'] = lastUpdatedLte;
      }

      if (q !== undefined) {
        localVarQueryParameter['q'] = q;
      }

      if (roleId !== undefined) {
        localVarQueryParameter['role_id'] = roleId;
      }

      if (role !== undefined) {
        localVarQueryParameter['role'] = role;
      }

      if (device !== undefined) {
        localVarQueryParameter['device'] = device;
      }

      if (deviceId !== undefined) {
        localVarQueryParameter['device_id'] = deviceId;
      }

      if (virtualMachine !== undefined) {
        localVarQueryParameter['virtual_machine'] = virtualMachine;
      }

      if (virtualMachineId !== undefined) {
        localVarQueryParameter['virtual_machine_id'] = virtualMachineId;
      }

      if (tag !== undefined) {
        localVarQueryParameter['tag'] = tag;
      }

      if (idN !== undefined) {
        localVarQueryParameter['id__n'] = idN;
      }

      if (idLte !== undefined) {
        localVarQueryParameter['id__lte'] = idLte;
      }

      if (idLt !== undefined) {
        localVarQueryParameter['id__lt'] = idLt;
      }

      if (idGte !== undefined) {
        localVarQueryParameter['id__gte'] = idGte;
      }

      if (idGt !== undefined) {
        localVarQueryParameter['id__gt'] = idGt;
      }

      if (nameN !== undefined) {
        localVarQueryParameter['name__n'] = nameN;
      }

      if (nameIc !== undefined) {
        localVarQueryParameter['name__ic'] = nameIc;
      }

      if (nameNic !== undefined) {
        localVarQueryParameter['name__nic'] = nameNic;
      }

      if (nameIew !== undefined) {
        localVarQueryParameter['name__iew'] = nameIew;
      }

      if (nameNiew !== undefined) {
        localVarQueryParameter['name__niew'] = nameNiew;
      }

      if (nameIsw !== undefined) {
        localVarQueryParameter['name__isw'] = nameIsw;
      }

      if (nameNisw !== undefined) {
        localVarQueryParameter['name__nisw'] = nameNisw;
      }

      if (nameIe !== undefined) {
        localVarQueryParameter['name__ie'] = nameIe;
      }

      if (nameNie !== undefined) {
        localVarQueryParameter['name__nie'] = nameNie;
      }

      if (roleIdN !== undefined) {
        localVarQueryParameter['role_id__n'] = roleIdN;
      }

      if (roleN !== undefined) {
        localVarQueryParameter['role__n'] = roleN;
      }

      if (deviceN !== undefined) {
        localVarQueryParameter['device__n'] = deviceN;
      }

      if (deviceIdN !== undefined) {
        localVarQueryParameter['device_id__n'] = deviceIdN;
      }

      if (virtualMachineN !== undefined) {
        localVarQueryParameter['virtual_machine__n'] = virtualMachineN;
      }

      if (virtualMachineIdN !== undefined) {
        localVarQueryParameter['virtual_machine_id__n'] = virtualMachineIdN;
      }

      if (tagN !== undefined) {
        localVarQueryParameter['tag__n'] = tagN;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsPartialUpdate: async (id: number, data: WritableSecret, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretsPartialUpdate', 'id', id)
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretsPartialUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secrets/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsRead: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretsRead', 'id', id)
      const localVarPath = `/plugins/netbox_secretstore/secrets/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsUpdate: async (id: number, data: WritableSecret, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('secretsSecretsUpdate', 'id', id)
      // verify required parameter 'data' is not null or undefined
      assertParamExists('secretsSecretsUpdate', 'data', data)
      const localVarPath = `/plugins/netbox_secretstore/secrets/{id}/`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
      localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * SecretsApi - functional programming interface
 * @export
 */
export const SecretsApiFp = function(configuration?: Configuration) {
  const localVarAxiosParamCreator = SecretsApiAxiosParamCreator(configuration)
  return {
    /**
     * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
     * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsGenerateRsaKeyPairList(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsGenerateRsaKeyPairList(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsGetSessionKeyCreate(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsGetSessionKeyCreate(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesBulkDelete(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesBulkDelete(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesBulkPartialUpdate(data: SecretRole, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesBulkPartialUpdate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesBulkUpdate(data: SecretRole, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesBulkUpdate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesCreate(data: SecretRole, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesCreate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesDelete(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesDelete(id, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [slug]
     * @param {string} [q]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [slugN]
     * @param {string} [slugIc]
     * @param {string} [slugNic]
     * @param {string} [slugIew]
     * @param {string} [slugNiew]
     * @param {string} [slugIsw]
     * @param {string} [slugNisw]
     * @param {string} [slugIe]
     * @param {string} [slugNie]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesList(id?: string, name?: string, slug?: string, q?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, slugN?: string, slugIc?: string, slugNic?: string, slugIew?: string, slugNiew?: string, slugIsw?: string, slugNisw?: string, slugIe?: string, slugNie?: string, limit?: number, offset?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20055>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesList(id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesPartialUpdate(id: number, data: SecretRole, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesPartialUpdate(id, data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesRead(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesRead(id, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretRolesUpdate(id: number, data: SecretRole, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SecretRole>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretRolesUpdate(id, data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsBulkDelete(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsBulkDelete(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsBulkPartialUpdate(data: WritableSecret, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsBulkPartialUpdate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsBulkUpdate(data: WritableSecret, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsBulkUpdate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsCreate(data: WritableSecret, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsCreate(data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsDelete(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsDelete(id, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [created]
     * @param {string} [createdGte]
     * @param {string} [createdLte]
     * @param {string} [lastUpdated]
     * @param {string} [lastUpdatedGte]
     * @param {string} [lastUpdatedLte]
     * @param {string} [q]
     * @param {string} [roleId]
     * @param {string} [role]
     * @param {string} [device]
     * @param {string} [deviceId]
     * @param {string} [virtualMachine]
     * @param {string} [virtualMachineId]
     * @param {string} [tag]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [roleIdN]
     * @param {string} [roleN]
     * @param {string} [deviceN]
     * @param {string} [deviceIdN]
     * @param {string} [virtualMachineN]
     * @param {string} [virtualMachineIdN]
     * @param {string} [tagN]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsList(id?: string, name?: string, created?: string, createdGte?: string, createdLte?: string, lastUpdated?: string, lastUpdatedGte?: string, lastUpdatedLte?: string, q?: string, roleId?: string, role?: string, device?: string, deviceId?: string, virtualMachine?: string, virtualMachineId?: string, tag?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, roleIdN?: string, roleN?: string, deviceN?: string, deviceIdN?: string, virtualMachineN?: string, virtualMachineIdN?: string, tagN?: string, limit?: number, offset?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20056>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsList(id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsPartialUpdate(id: number, data: WritableSecret, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsPartialUpdate(id, data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsRead(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsRead(id, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async secretsSecretsUpdate(id: number, data: WritableSecret, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Secret>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.secretsSecretsUpdate(id, data, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
  }
};

/**
 * SecretsApi - factory interface
 * @export
 */
export const SecretsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = SecretsApiFp(configuration)
  return {
    /**
     * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
     * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsGenerateRsaKeyPairList(options?: any): AxiosPromise<void> {
      return localVarFp.secretsGenerateRsaKeyPairList(options).then((request) => request(axios, basePath));
    },
    /**
     * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsGetSessionKeyCreate(options?: any): AxiosPromise<void> {
      return localVarFp.secretsGetSessionKeyCreate(options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkDelete(options?: any): AxiosPromise<void> {
      return localVarFp.secretsSecretRolesBulkDelete(options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkPartialUpdate(data: SecretRole, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesBulkPartialUpdate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesBulkUpdate(data: SecretRole, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesBulkUpdate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesCreate(data: SecretRole, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesCreate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesDelete(id: number, options?: any): AxiosPromise<void> {
      return localVarFp.secretsSecretRolesDelete(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [slug]
     * @param {string} [q]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [slugN]
     * @param {string} [slugIc]
     * @param {string} [slugNic]
     * @param {string} [slugIew]
     * @param {string} [slugNiew]
     * @param {string} [slugIsw]
     * @param {string} [slugNisw]
     * @param {string} [slugIe]
     * @param {string} [slugNie]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesList(id?: string, name?: string, slug?: string, q?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, slugN?: string, slugIc?: string, slugNic?: string, slugIew?: string, slugNiew?: string, slugIsw?: string, slugNisw?: string, slugIe?: string, slugNie?: string, limit?: number, offset?: number, options?: any): AxiosPromise<InlineResponse20055> {
      return localVarFp.secretsSecretRolesList(id, name, slug, q, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, slugN, slugIc, slugNic, slugIew, slugNiew, slugIsw, slugNisw, slugIe, slugNie, limit, offset, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesPartialUpdate(id: number, data: SecretRole, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesPartialUpdate(id, data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesRead(id: number, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesRead(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret role.
     * @param {SecretRole} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretRolesUpdate(id: number, data: SecretRole, options?: any): AxiosPromise<SecretRole> {
      return localVarFp.secretsSecretRolesUpdate(id, data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkDelete(options?: any): AxiosPromise<void> {
      return localVarFp.secretsSecretsBulkDelete(options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkPartialUpdate(data: WritableSecret, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsBulkPartialUpdate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsBulkUpdate(data: WritableSecret, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsBulkUpdate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsCreate(data: WritableSecret, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsCreate(data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsDelete(id: number, options?: any): AxiosPromise<void> {
      return localVarFp.secretsSecretsDelete(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} [id]
     * @param {string} [name]
     * @param {string} [created]
     * @param {string} [createdGte]
     * @param {string} [createdLte]
     * @param {string} [lastUpdated]
     * @param {string} [lastUpdatedGte]
     * @param {string} [lastUpdatedLte]
     * @param {string} [q]
     * @param {string} [roleId]
     * @param {string} [role]
     * @param {string} [device]
     * @param {string} [deviceId]
     * @param {string} [virtualMachine]
     * @param {string} [virtualMachineId]
     * @param {string} [tag]
     * @param {string} [idN]
     * @param {string} [idLte]
     * @param {string} [idLt]
     * @param {string} [idGte]
     * @param {string} [idGt]
     * @param {string} [nameN]
     * @param {string} [nameIc]
     * @param {string} [nameNic]
     * @param {string} [nameIew]
     * @param {string} [nameNiew]
     * @param {string} [nameIsw]
     * @param {string} [nameNisw]
     * @param {string} [nameIe]
     * @param {string} [nameNie]
     * @param {string} [roleIdN]
     * @param {string} [roleN]
     * @param {string} [deviceN]
     * @param {string} [deviceIdN]
     * @param {string} [virtualMachineN]
     * @param {string} [virtualMachineIdN]
     * @param {string} [tagN]
     * @param {number} [limit] Number of results to return per page.
     * @param {number} [offset] The initial index from which to return the results.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsList(id?: string, name?: string, created?: string, createdGte?: string, createdLte?: string, lastUpdated?: string, lastUpdatedGte?: string, lastUpdatedLte?: string, q?: string, roleId?: string, role?: string, device?: string, deviceId?: string, virtualMachine?: string, virtualMachineId?: string, tag?: string, idN?: string, idLte?: string, idLt?: string, idGte?: string, idGt?: string, nameN?: string, nameIc?: string, nameNic?: string, nameIew?: string, nameNiew?: string, nameIsw?: string, nameNisw?: string, nameIe?: string, nameNie?: string, roleIdN?: string, roleN?: string, deviceN?: string, deviceIdN?: string, virtualMachineN?: string, virtualMachineIdN?: string, tagN?: string, limit?: number, offset?: number, options?: any): AxiosPromise<InlineResponse20056> {
      return localVarFp.secretsSecretsList(id, name, created, createdGte, createdLte, lastUpdated, lastUpdatedGte, lastUpdatedLte, q, roleId, role, device, deviceId, virtualMachine, virtualMachineId, tag, idN, idLte, idLt, idGte, idGt, nameN, nameIc, nameNic, nameIew, nameNiew, nameIsw, nameNisw, nameIe, nameNie, roleIdN, roleN, deviceN, deviceIdN, virtualMachineN, virtualMachineIdN, tagN, limit, offset, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsPartialUpdate(id: number, data: WritableSecret, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsPartialUpdate(id, data, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsRead(id: number, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsRead(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id A unique integer value identifying this secret.
     * @param {WritableSecret} data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    secretsSecretsUpdate(id: number, data: WritableSecret, options?: any): AxiosPromise<Secret> {
      return localVarFp.secretsSecretsUpdate(id, data, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for secretsSecretRolesBulkPartialUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesBulkPartialUpdateRequest
 */
export interface SecretsApiSecretsSecretRolesBulkPartialUpdateRequest {
  /**
   *
   * @type {SecretRole}
   * @memberof SecretsApiSecretsSecretRolesBulkPartialUpdate
   */
  readonly data: SecretRole
}

/**
 * Request parameters for secretsSecretRolesBulkUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesBulkUpdateRequest
 */
export interface SecretsApiSecretsSecretRolesBulkUpdateRequest {
  /**
   *
   * @type {SecretRole}
   * @memberof SecretsApiSecretsSecretRolesBulkUpdate
   */
  readonly data: SecretRole
}

/**
 * Request parameters for secretsSecretRolesCreate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesCreateRequest
 */
export interface SecretsApiSecretsSecretRolesCreateRequest {
  /**
   *
   * @type {SecretRole}
   * @memberof SecretsApiSecretsSecretRolesCreate
   */
  readonly data: SecretRole
}

/**
 * Request parameters for secretsSecretRolesDelete operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesDeleteRequest
 */
export interface SecretsApiSecretsSecretRolesDeleteRequest {
  /**
   * A unique integer value identifying this secret role.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesDelete
   */
  readonly id: number
}

/**
 * Request parameters for secretsSecretRolesList operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesListRequest
 */
export interface SecretsApiSecretsSecretRolesListRequest {
  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly id?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly name?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slug?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly q?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly idN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly idLte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly idLt?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly idGte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly idGt?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameIc?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameNic?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameIew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameNiew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameIsw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameNisw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameIe?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly nameNie?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugIc?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugNic?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugIew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugNiew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugIsw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugNisw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugIe?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly slugNie?: string

  /**
   * Number of results to return per page.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly limit?: number

  /**
   * The initial index from which to return the results.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesList
   */
  readonly offset?: number
}

/**
 * Request parameters for secretsSecretRolesPartialUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesPartialUpdateRequest
 */
export interface SecretsApiSecretsSecretRolesPartialUpdateRequest {
  /**
   * A unique integer value identifying this secret role.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesPartialUpdate
   */
  readonly id: number

  /**
   *
   * @type {SecretRole}
   * @memberof SecretsApiSecretsSecretRolesPartialUpdate
   */
  readonly data: SecretRole
}

/**
 * Request parameters for secretsSecretRolesRead operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesReadRequest
 */
export interface SecretsApiSecretsSecretRolesReadRequest {
  /**
   * A unique integer value identifying this secret role.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesRead
   */
  readonly id: number
}

/**
 * Request parameters for secretsSecretRolesUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretRolesUpdateRequest
 */
export interface SecretsApiSecretsSecretRolesUpdateRequest {
  /**
   * A unique integer value identifying this secret role.
   * @type {number}
   * @memberof SecretsApiSecretsSecretRolesUpdate
   */
  readonly id: number

  /**
   *
   * @type {SecretRole}
   * @memberof SecretsApiSecretsSecretRolesUpdate
   */
  readonly data: SecretRole
}

/**
 * Request parameters for secretsSecretsBulkPartialUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsBulkPartialUpdateRequest
 */
export interface SecretsApiSecretsSecretsBulkPartialUpdateRequest {
  /**
   *
   * @type {WritableSecret}
   * @memberof SecretsApiSecretsSecretsBulkPartialUpdate
   */
  readonly data: WritableSecret
}

/**
 * Request parameters for secretsSecretsBulkUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsBulkUpdateRequest
 */
export interface SecretsApiSecretsSecretsBulkUpdateRequest {
  /**
   *
   * @type {WritableSecret}
   * @memberof SecretsApiSecretsSecretsBulkUpdate
   */
  readonly data: WritableSecret
}

/**
 * Request parameters for secretsSecretsCreate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsCreateRequest
 */
export interface SecretsApiSecretsSecretsCreateRequest {
  /**
   *
   * @type {WritableSecret}
   * @memberof SecretsApiSecretsSecretsCreate
   */
  readonly data: WritableSecret
}

/**
 * Request parameters for secretsSecretsDelete operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsDeleteRequest
 */
export interface SecretsApiSecretsSecretsDeleteRequest {
  /**
   * A unique integer value identifying this secret.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsDelete
   */
  readonly id: number
}

/**
 * Request parameters for secretsSecretsList operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsListRequest
 */
export interface SecretsApiSecretsSecretsListRequest {
  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly id?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly name?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly created?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly createdGte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly createdLte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly lastUpdated?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly lastUpdatedGte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly lastUpdatedLte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly q?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly roleId?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly role?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly device?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly deviceId?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly virtualMachine?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly virtualMachineId?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly tag?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly idN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly idLte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly idLt?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly idGte?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly idGt?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameIc?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameNic?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameIew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameNiew?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameIsw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameNisw?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameIe?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly nameNie?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly roleIdN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly roleN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly deviceN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly deviceIdN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly virtualMachineN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly virtualMachineIdN?: string

  /**
   *
   * @type {string}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly tagN?: string

  /**
   * Number of results to return per page.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly limit?: number

  /**
   * The initial index from which to return the results.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsList
   */
  readonly offset?: number
}

/**
 * Request parameters for secretsSecretsPartialUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsPartialUpdateRequest
 */
export interface SecretsApiSecretsSecretsPartialUpdateRequest {
  /**
   * A unique integer value identifying this secret.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsPartialUpdate
   */
  readonly id: number

  /**
   *
   * @type {WritableSecret}
   * @memberof SecretsApiSecretsSecretsPartialUpdate
   */
  readonly data: WritableSecret
}

/**
 * Request parameters for secretsSecretsRead operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsReadRequest
 */
export interface SecretsApiSecretsSecretsReadRequest {
  /**
   * A unique integer value identifying this secret.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsRead
   */
  readonly id: number
}

/**
 * Request parameters for secretsSecretsUpdate operation in SecretsApi.
 * @export
 * @interface SecretsApiSecretsSecretsUpdateRequest
 */
export interface SecretsApiSecretsSecretsUpdateRequest {
  /**
   * A unique integer value identifying this secret.
   * @type {number}
   * @memberof SecretsApiSecretsSecretsUpdate
   */
  readonly id: number

  /**
   *
   * @type {WritableSecret}
   * @memberof SecretsApiSecretsSecretsUpdate
   */
  readonly data: WritableSecret
}

/**
 * SecretsApi - object-oriented interface
 * @export
 * @class SecretsApi
 * @extends {BaseAPI}
 */
export class PluginsApi extends BaseAPI {
  /**
   * {         \"public_key\": \"<public key>\",         \"private_key\": \"<private key>\"     }
   * @summary This endpoint can be used to generate a new RSA key pair. The keys are returned in PEM format.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsGenerateRsaKeyPairList(options?: any) {
    return SecretsApiFp(this.configuration).secretsGenerateRsaKeyPairList(options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieve a temporary session key to use for encrypting and decrypting secrets via the API. The user\'s private RSA key is POSTed with the name `private_key`. An example:      curl -v -X POST -H \"Authorization: Token <token>\" -H \"Accept: application/json; indent=4\" \\     --data-urlencode \"private_key@<filename>\" https://netbox/api/plugins/netbox_secretstore/get-session-key/  This request will yield a base64-encoded session key to be included in an `X-Session-Key` header in future requests:      {         \"session_key\": \"+8t4SI6XikgVmB5+/urhozx9O5qCQANyOk1MNe6taRf=\"     }  This endpoint accepts one optional parameter: `preserve_key`. If True and a session key exists, the existing session key will be returned instead of a new one.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsGetSessionKeyCreate(options?: any) {
    return SecretsApiFp(this.configuration).secretsGetSessionKeyCreate(options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesBulkDelete(options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesBulkDelete(options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesBulkPartialUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesBulkPartialUpdate(requestParameters: SecretsApiSecretsSecretRolesBulkPartialUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesBulkPartialUpdate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesBulkUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesBulkUpdate(requestParameters: SecretsApiSecretsSecretRolesBulkUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesBulkUpdate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesCreateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesCreate(requestParameters: SecretsApiSecretsSecretRolesCreateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesCreate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesDeleteRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesDelete(requestParameters: SecretsApiSecretsSecretRolesDeleteRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesListRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesList(requestParameters: SecretsApiSecretsSecretRolesListRequest = {}, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesList(requestParameters.id, requestParameters.name, requestParameters.slug, requestParameters.q, requestParameters.idN, requestParameters.idLte, requestParameters.idLt, requestParameters.idGte, requestParameters.idGt, requestParameters.nameN, requestParameters.nameIc, requestParameters.nameNic, requestParameters.nameIew, requestParameters.nameNiew, requestParameters.nameIsw, requestParameters.nameNisw, requestParameters.nameIe, requestParameters.nameNie, requestParameters.slugN, requestParameters.slugIc, requestParameters.slugNic, requestParameters.slugIew, requestParameters.slugNiew, requestParameters.slugIsw, requestParameters.slugNisw, requestParameters.slugIe, requestParameters.slugNie, requestParameters.limit, requestParameters.offset, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesPartialUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesPartialUpdate(requestParameters: SecretsApiSecretsSecretRolesPartialUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesPartialUpdate(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesReadRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesRead(requestParameters: SecretsApiSecretsSecretRolesReadRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesRead(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretRolesUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretRolesUpdate(requestParameters: SecretsApiSecretsSecretRolesUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretRolesUpdate(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsBulkDelete(options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsBulkDelete(options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsBulkPartialUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsBulkPartialUpdate(requestParameters: SecretsApiSecretsSecretsBulkPartialUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsBulkPartialUpdate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsBulkUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsBulkUpdate(requestParameters: SecretsApiSecretsSecretsBulkUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsBulkUpdate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsCreateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsCreate(requestParameters: SecretsApiSecretsSecretsCreateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsCreate(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsDeleteRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsDelete(requestParameters: SecretsApiSecretsSecretsDeleteRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsListRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsList(requestParameters: SecretsApiSecretsSecretsListRequest = {}, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsList(requestParameters.id, requestParameters.name, requestParameters.created, requestParameters.createdGte, requestParameters.createdLte, requestParameters.lastUpdated, requestParameters.lastUpdatedGte, requestParameters.lastUpdatedLte, requestParameters.q, requestParameters.roleId, requestParameters.role, requestParameters.device, requestParameters.deviceId, requestParameters.virtualMachine, requestParameters.virtualMachineId, requestParameters.tag, requestParameters.idN, requestParameters.idLte, requestParameters.idLt, requestParameters.idGte, requestParameters.idGt, requestParameters.nameN, requestParameters.nameIc, requestParameters.nameNic, requestParameters.nameIew, requestParameters.nameNiew, requestParameters.nameIsw, requestParameters.nameNisw, requestParameters.nameIe, requestParameters.nameNie, requestParameters.roleIdN, requestParameters.roleN, requestParameters.deviceN, requestParameters.deviceIdN, requestParameters.virtualMachineN, requestParameters.virtualMachineIdN, requestParameters.tagN, requestParameters.limit, requestParameters.offset, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsPartialUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsPartialUpdate(requestParameters: SecretsApiSecretsSecretsPartialUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsPartialUpdate(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsReadRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsRead(requestParameters: SecretsApiSecretsSecretsReadRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsRead(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {SecretsApiSecretsSecretsUpdateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SecretsApi
   */
  public secretsSecretsUpdate(requestParameters: SecretsApiSecretsSecretsUpdateRequest, options?: any) {
    return SecretsApiFp(this.configuration).secretsSecretsUpdate(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
  }
}
