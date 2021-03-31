import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';

interface ExceptionError {
  status?: number;
  error?: string;
  message?: string;
  response?: {
    status?: number;
    statusCode?: number;
    error?: string;
    message?: string;
    inputError?: JSON;
  };
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  async catch(exception: ExceptionError, host: ArgumentsHost): Promise<void> {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status =
      exception.status ||
      exception?.response?.status ||
      exception?.response?.statusCode ||
      500;
    const error = exception?.error || exception?.response?.error || 'ERROR';
    const message = exception?.response?.message || exception?.message;
    const inputError = exception?.response?.inputError;
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error,
      message: inputError || message,
    };

    Logger.error(JSON.stringify(errorResponse), 'ExceptionFilter');

    response.status(status).json(errorResponse);
  }
}
