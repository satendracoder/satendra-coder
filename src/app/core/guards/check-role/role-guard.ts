import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SSafeStorage } from '../../service/global/safe-storage/s-safe-storage';
import { ToastService } from 'sc-angular-toastify';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toaster = inject(ToastService);
  const safeStore = inject(SSafeStorage);

  const userStr = safeStore.getItem('userdata');
  const user = userStr ? JSON.parse(userStr) : null;
  const allowedRoles = route.data?.['roles'] as string[];

  if (user && allowedRoles?.includes(user.role)) {
    router.navigate(['/admin']);
    return true;
  } else {
    // Optional: redirect to not-authorized or login
    toaster.show('unauthorized access', 'error');
    router.navigate(['/']);
    return false;
  }
};
