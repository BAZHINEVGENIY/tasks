import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

export const authHeaderInterceptor: HttpInterceptorFn = (request, next) => {
  const storage = inject(StorageService);
  const token = storage.get('accessToken');
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });
  return next(request);
};
