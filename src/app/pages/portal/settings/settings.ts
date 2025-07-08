import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    eventReminders: boolean;
    newsUpdates: boolean;
    alumniConnections: boolean;
}

interface PrivacySettings {
    profileVisibility: 'public' | 'alumni' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    showCompany: boolean;
}

interface AccountSettings {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
}

@Component({
    selector: 'settings',
    templateUrl: './settings.html',
    styleUrl: './settings.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule]
})
export class Settings {
    protected activeTab = signal<'notifications' | 'privacy' | 'account'>('notifications');
    
    protected notifications = signal<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        newsUpdates: true,
        alumniConnections: true
    });

    protected privacy = signal<PrivacySettings>({
        profileVisibility: 'alumni',
        showEmail: false,
        showPhone: false,
        showLocation: true,
        showCompany: true
    });

    protected account = signal<AccountSettings>({
        language: 'en',
        timezone: 'Asia/Dhaka',
        theme: 'auto'
    });

    protected setActiveTab(tab: 'notifications' | 'privacy' | 'account') {
        this.activeTab.set(tab);
    }

    protected saveNotifications() {
        console.log('Saving notification settings:', this.notifications());
        // Here you would save to backend
    }

    protected savePrivacy() {
        console.log('Saving privacy settings:', this.privacy());
        // Here you would save to backend
    }

    protected saveAccount() {
        console.log('Saving account settings:', this.account());
        // Here you would save to backend
    }

    protected resetToDefaults() {
        this.notifications.set({
            emailNotifications: true,
            smsNotifications: false,
            eventReminders: true,
            newsUpdates: true,
            alumniConnections: true
        });
        
        this.privacy.set({
            profileVisibility: 'alumni',
            showEmail: false,
            showPhone: false,
            showLocation: true,
            showCompany: true
        });

        this.account.set({
            language: 'en',
            timezone: 'Asia/Dhaka',
            theme: 'auto'
        });
    }
}
