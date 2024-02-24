import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'accounting', loadChildren: () => import('./modules/accounting/accounting.module').then(m => m.AccountingModule) },
  { path: 'invoices', loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'tax', loadChildren: () => import('./modules/tax-reporting/tax-reporting.module').then(m => m.TaxReportingModule) },
  { path: '**', redirectTo: 'error/404' },
];
export class AppRoutingModule {}
