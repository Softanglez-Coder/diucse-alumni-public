import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    graduationYear: number;
    major: string;
    currentPosition: string;
    company: string;
    bio: string;
    location: string;
}

@Component({
    selector: 'profile',
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule]
})
export class Profile {
    protected isEditing = signal(false);
    
    protected profile = signal<ProfileData>({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+880 1234567890',
        graduationYear: 2020,
        major: 'Computer Science & Engineering',
        currentPosition: 'Software Engineer',
        company: 'Tech Solutions Ltd.',
        bio: 'Passionate software engineer with expertise in web development and system design.',
        location: 'Dhaka, Bangladesh'
    });

    protected toggleEdit() {
        this.isEditing.update(editing => !editing);
    }

    protected saveProfile() {
        // Here you would typically save to a backend service
        console.log('Saving profile:', this.profile());
        this.isEditing.set(false);
        // You could add a toast notification here
    }

    protected cancelEdit() {
        this.isEditing.set(false);
        // Reset to original values if needed
    }
}
