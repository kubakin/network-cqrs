import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CircuitsApi,
  Configuration,
  DcimApi,
  ExtrasApi,
  IpamApi,
  SecretsApi,
  StatusApi,
  TenancyApi,
  UsersApi,
  VirtualizationApi,
} from '@yoldi/netbox-nodejs-api';
import axios, { AxiosInstance } from 'axios';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { PluginsApi } from './plugins.api';

export class NetboxApiException extends Error {}

export class NetboxNotFoundApiException extends NetboxApiException {}

@Injectable()
export class NetboxApi {
  static MAX_REQUESTS_COUNT = 10;
  static INTERVAL_MS = 10;
  static PENDING_REQUESTS = 0;
  logger = new Logger(this.constructor.name);
  public readonly circuits: CircuitsApi;
  public readonly dcim: DcimApi;
  public readonly extras: ExtrasApi;
  public readonly ipam: IpamApi;
  public readonly plugins: PluginsApi;
  public readonly secrets: SecretsApi;
  public readonly status: StatusApi;
  public readonly tenancy: TenancyApi;
  public readonly users: UsersApi;
  public readonly virtualization: VirtualizationApi;
  private readonly configuration: Configuration;
  private readonly axios: AxiosInstance;

  constructor() {
    const token = process.env.NETBOX_API_TOKEN;

    if (!token) {
      throw new RuntimeException('Netbox token is not found');
    }

    this.configuration = new Configuration({
      basePath: process.env.NETBOX_API_URL,
      baseOptions: {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    });
    this.axios = axios.create({
      // paramsSerializer: (params) => {
      //   return qs.stringify(params, { arrayFormat: 'repeat' });
      // },
    });

    this.circuits = new CircuitsApi(this.configuration, undefined, this.axios);
    this.dcim = new DcimApi(this.configuration, undefined, this.axios);
    this.extras = new ExtrasApi(this.configuration, undefined, this.axios);
    this.ipam = new IpamApi(this.configuration, undefined, this.axios);
    this.secrets = new SecretsApi(this.configuration, undefined, this.axios);
    this.status = new StatusApi(this.configuration, undefined, this.axios);
    this.tenancy = new TenancyApi(this.configuration, undefined, this.axios);
    this.users = new UsersApi(this.configuration, undefined, this.axios);
    this.virtualization = new VirtualizationApi(
      this.configuration,
      undefined,
      this.axios,
    );
    this.plugins = new PluginsApi(this.configuration, undefined, this.axios);

    this.axios.interceptors.response.use(
      (request) => {
        return request;
      },
      (err) => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        if (
          err?.response?.data?.find?.((it: string) =>
            it.includes?.('Invalid session key'),
          )
        ) {
        }
        this.logger.warn(
          'Netbox request failed: ' +
            (JSON.stringify(err?.response?.data) || (err as string)) +
            '\n Request: ' +
            JSON.stringify(err.config),
        );
        throw new BadRequestException(
          JSON.stringify(err?.response?.data) || (err as string),
        );
      },
    );

    this.axios.interceptors.request.use((request) => {
      this.logger.debug(
        `Send request: ${request.method.toUpperCase()} ${request.url}`,
      );
      return request;
    });

    this.axios.interceptors.response.use((response) => {
      let statusCode = response.status?.toString();
      if (!statusCode) {
        statusCode = (response as any).response?.status.toString();
      }
      if (statusCode && !statusCode?.startsWith('2')) {
        if (statusCode === '404') {
          throw new NetboxNotFoundApiException(response.statusText);
        }
        throw new NetboxApiException(response.data as string);
      }
      return response;
    });

    this.axios.interceptors.request.use(function (config) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (NetboxApi.PENDING_REQUESTS < NetboxApi.MAX_REQUESTS_COUNT) {
            NetboxApi.PENDING_REQUESTS++;
            clearInterval(interval);
            resolve(config);
          }
        }, NetboxApi.INTERVAL_MS);
      });
    });

    this.axios.interceptors.response.use(
      function (response) {
        NetboxApi.PENDING_REQUESTS = Math.max(
          0,
          NetboxApi.PENDING_REQUESTS - 1,
        );
        return Promise.resolve(response);
      },
      function (error) {
        NetboxApi.PENDING_REQUESTS = Math.max(
          0,
          NetboxApi.PENDING_REQUESTS - 1,
        );
        return Promise.reject(error);
      },
    );
  }
}
