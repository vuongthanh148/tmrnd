import * as fs from 'fs';

export interface LogPayLoad {
  label: string;
  bodyPayload?: any;
  metadata?: any;
}

export function generateLog(request: any, logPayload: LogPayLoad) {
  const { label, metadata, bodyPayload } = logPayload;
  const result: any = {
    remoteIp: request.ip,
    path: request.url,
    headers: request.headers,
    requestId: request.id,
    payload: bodyPayload,
  };
  if (bodyPayload) {
    result['payload'] = bodyPayload;
  }
  if (metadata) {
    result['message'] = {
      logWarning: {
        log_type: 'Trace',
        label,
        message: `response when calling to ${
          metadata.config?.url ?? metadata.url ?? metadata.response?.config?.url
        }`,
        message_detail: `http status ${
          metadata.response?.status ??
          metadata.res?.statusCode ??
          metadata.status
        } response`,
        message_tag: `http_response_${
          metadata.response?.status ??
          metadata.res?.statusCode ??
          metadata.status
        }`,
        metadata: metadata.response?.data ?? metadata?.data ?? metadata,
      },
    };
  }
  return result;
}
