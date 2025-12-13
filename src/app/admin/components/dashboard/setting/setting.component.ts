import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';

@Component({
  selector: 'app-setting',
  imports: [MateriallistModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent {
  activeTab = 'general';
  isSaving = false;

  settings = {
    general: {
      siteName: 'EduAdmin',
      siteDescription: 'Educational content management system',
      defaultLanguage: 'en',
      timezone: 'UTC',
      allowUserRegistration: true,
      moderateComments: false,
      enableSEO: true,
    },
    appearance: {
      theme: 'light',
      primaryColor: '#2563eb',
      fontSize: 'medium',
      compactMode: false,
      showBreadcrumbs: true,
      animationsEnabled: true,
    },
    notifications: {
      emailEnabled: true,
      newUserRegistration: true,
      contentPublished: true,
      paymentReceived: true,
      pushEnabled: false,
      browserNotifications: false,
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 60,
      passwordPolicy: 'medium',
      ipWhitelisting: false,
      loginAttemptLimit: true,
      maxLoginAttempts: 5,
    },
    integrations: {
      googleAnalyticsId: '',
      hotjarEnabled: false,
      facebookAppId: '',
      twitterHandle: '',
      emailProvider: 'sendgrid',
      emailApiKey: '',
    },
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private safe: SSafeStorage
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // In a real app, load settings from backend

    const savedSettings = this.safe.getItem('appSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings() {
    this.isSaving = true;

    // Simulate API call
    setTimeout(() => {
      this.safe.setItem('appSettings', JSON.stringify(this.settings));
      this.isSaving = false;

      // Show success message (you can implement a toast service)
      //console.log('Settings saved successfully');
    }, 1500);
  }

  resetSettings() {
    if (
      confirm(
        'Are you sure you want to reset all settings to defaults? This action cannot be undone.'
      )
    ) {
      this.safe.removeItem('appSettings');
      this.ngOnInit(); // Reload default settings
    }
  }
}
