import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastService } from 'sc-angular-toastify';
import { SSafeStorage } from '../../core/service/global/safe-storage/s-safe-storage';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const safeStore = inject(SSafeStorage);
  const toast = inject(ToastService);

  const userDataString = safeStore.getItem('userdata');

  if (!userDataString) {
    debugger;
    router.navigateByUrl('/');
    // toast.show('Please log in to access admin area', 'error');
    return false;
  }
  //console.log('User Data from Storage:', userDataString);

  const userData = userDataString;
  const allowedRoles = route.data['roles'] as string[];

  if (allowedRoles && allowedRoles.includes(userData.role)) {
    // router.navigateByUrl('/admin');
    return true;
  } else {
    toast.show('Access denied - Admins only', 'error');
    router.navigateByUrl('/admin');
    return false;
  }
};
