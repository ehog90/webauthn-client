import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  accessTokenAxiosInterface,
  unauthedAxiosInterface,
} from '../helpers/axios.helper';
import { getBaseUrl } from '../helpers/base-url.util';
import { substituteRouteParams } from '../helpers/url-params';

export interface IAxiosBasicParams {
  // #region Properties (2)

  headers?: { [key: string]: string | number };
  queryParams?: { [key: string]: string | number };
  routeParams?: { [key: string]: string | number };

  // #endregion Properties (2)
}

export interface IAxiosWithBodyParams extends IAxiosBasicParams {
  // #region Properties (1)

  body?: object | null;

  // #endregion Properties (1)
}

export enum AuthType {
  Unauthed,
  AccessToken,
}

export function useAxios<T, E = unknown>(
  url: string,
  authType: AuthType = AuthType.AccessToken
) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getAxios = useCallback(() => {
    return (
      {
        [AuthType.Unauthed]: unauthedAxiosInterface,
        [AuthType.AccessToken]: accessTokenAxiosInterface,
      }?.[authType] ?? accessTokenAxiosInterface
    );
  }, [authType]);

  const handleError = useCallback((axiosError: AxiosError) => {
    if (axiosError?.code === 'ERR_NETWORK') {
      setErrorCode('NO_NETWORK');
      setError({ error: 'No network connection' } as E);
      setData(null);
    } else {
      setError((axiosError?.response?.data as E) ?? null);
      setErrorCode(axiosError?.response?.status.toString() ?? null);
      axiosError.name !== 'CanceledError' && setLoading(false);
    }
    setLoading(false);
    setInitialLoading(false);
  }, []);

  const handleResetError = useCallback(() => {
    setError(null);
    setErrorCode(null);
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!data && loading) {
      setInitialLoading(true);
    } else {
      setInitialLoading(false);
    }
  }, [loading, data]);

  const handleGet = useCallback(
    async ({
      routeParams = {},
      queryParams = {},
      headers = {},
    }: IAxiosBasicParams = {}) => {
      const substitutedUrl = substituteRouteParams(url ?? '', routeParams);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      handleResetError();
      try {
        setLoading(true);
        const response = await getAxios().get(
          `${getBaseUrl()}/${substitutedUrl}`,
          {
            headers: {
              ...headers,
            },
            signal: abortControllerRef.current.signal,
            params: { ...queryParams },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        handleError(axiosError);
      }
    },
    [handleError, handleResetError, url, getAxios]
  );

  const handlePut = useCallback(
    async ({
      routeParams = {},
      queryParams = {},
      headers = {},
      body = null,
    }: IAxiosWithBodyParams = {}) => {
      const substitutedUrl = substituteRouteParams(url ?? '', routeParams);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      handleResetError();
      try {
        setLoading(true);
        const response = await getAxios().put(
          `${getBaseUrl()}/${substitutedUrl}`,
          { ...body },
          {
            headers: {
              ...headers,
            },
            signal: abortControllerRef.current.signal,
            params: { ...queryParams },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        handleError(axiosError);
      }
    },
    [handleError, handleResetError, url, getAxios]
  );

  const handlePost = useCallback(
    async ({
      routeParams = {},
      queryParams = {},
      headers = {},
      body = null,
    }: IAxiosWithBodyParams = {}) => {
      const substitutedUrl = substituteRouteParams(url ?? '', routeParams);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      handleResetError();
      try {
        setLoading(true);
        const response = await getAxios().post(
          `${getBaseUrl()}/${substitutedUrl}`,
          { ...body },
          {
            headers: {
              ...headers,
            },
            signal: abortControllerRef.current.signal,
            params: { ...queryParams },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        handleError(axiosError);
      }
    },
    [handleError, handleResetError, url, getAxios]
  );

  const handleDelete = useCallback(
    async ({
      routeParams = {},
      queryParams = {},
      headers = {},
    }: IAxiosBasicParams = {}) => {
      const substitutedUrl = substituteRouteParams(url ?? '', routeParams);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      handleResetError();
      try {
        setLoading(true);
        const response = await getAxios().delete(
          `${getBaseUrl()}/${substitutedUrl}`,
          {
            headers: {
              ...headers,
            },
            signal: abortControllerRef.current.signal,
            params: { ...queryParams },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        handleError(axiosError);
      }
    },
    [handleError, handleResetError, url, getAxios]
  );

  const handlePostBlob = useCallback(
    async ({
      routeParams = {},
      queryParams = {},
      headers = {},
      body = null,
    }: IAxiosWithBodyParams = {}) => {
      const substitutedUrl = substituteRouteParams(url ?? '', routeParams);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      handleResetError();
      try {
        setLoading(true);
        const response = await getAxios().post(
          `${getBaseUrl()}/${substitutedUrl}`,
          { ...body },
          {
            headers: {
              ...headers,
            },
            signal: abortControllerRef.current.signal,
            params: { ...queryParams },
            responseType: 'blob',
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        handleError(axiosError);
      }
    },
    [handleError, handleResetError, url, getAxios]
  );

  return {
    get: handleGet,
    post: handlePost,
    put: handlePut,
    delete: handleDelete,
    postBlob: handlePostBlob,
    data,
    error,
    loading,
    initialLoading,
    errorCode,
  };
}
