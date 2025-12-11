import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
  OnInit,
  computed,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, type User, BatchService, Batch } from '../../../services';
import { AuthService } from '../../../shared/services';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  currentPosition: string;
  company: string;
  batch?: string;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule],
})
export class PortalProfile implements OnInit {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly batchService = inject(BatchService);

  protected isEditing = signal(false);
  protected isLoading = signal(true);
  protected error = signal<string | null>(null);
  protected userData = signal<User | null>(null);
  protected isSendingVerification = signal(false);
  protected isUploadingPhoto = signal(false);
  protected batches = signal<Batch[]>([]);
  protected searchBatch = signal<string>('');
  protected isCreatingBatch = signal(false);
  protected showBatchDropdown = signal(false);
  protected batchValidationError = signal<string | null>(null);

  // Batch pattern: D-1, D-42, E-100, etc.
  private readonly BATCH_PATTERN = /^[DE]-([1-9]\d*)$/;

  protected profile = signal<ProfileData>({
    name: '',
    email: '',
    phone: '',
    currentPosition: '',
    company: '',
    batch: undefined,
  });

  // Computed value for display name
  protected displayName = computed(() => {
    const user = this.userData();
    if (user) {
      return user.name || 'User';
    }
    return 'User';
  });

  // Computed value for batch information
  protected batchInfo = computed(() => {
    const user = this.userData();
    return user?.batch?.name || 'Not specified';
  });

  // Computed value for user roles as array for chip display
  protected userRolesArray = computed(() => {
    const user = this.userData();
    return user?.roles || ['guest'];
  });

  // Computed value for account status
  protected accountStatus = computed(() => {
    const user = this.userData();
    return {
      active: user?.active || false,
      emailVerified: user?.emailVerified || false,
    };
  });

  // Computed value for profile photo
  protected profilePhoto = computed(() => {
    const user = this.userData();
    return user?.photo || null;
  });

  // Filtered batches based on search
  protected filteredBatches = computed(() => {
    const search = this.searchBatch().toLowerCase();
    if (!search) return this.batches();
    return this.batches().filter((b: Batch) => b.name.toLowerCase().includes(search));
  });

  // Check if we should show create batch option
  protected shouldShowCreateOption = computed(() => {
    const search = this.searchBatch().trim();
    if (!search) return false;
    return !this.filteredBatches().some((b: Batch) => b.name.toUpperCase() === search.toUpperCase());
  });

  ngOnInit() {
    this.loadBatches();
    this.loadUserProfile();
  }

  private loadBatches() {
    // Get the batches resource which is a Signal<Batch[]>
    const batchesResource = this.batchService.findAll({ limit: 1000 });
    // Use effect to update batches whenever the resource changes
    effect(() => {
      const batches = batchesResource();
      if (batches && Array.isArray(batches)) {
        this.batches.set(batches);
      }
    });
  }

  private loadUserProfile() {
    this.isLoading.set(true);
    this.error.set(null);

    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.userData.set(user);
        this.mapUserToProfile(user);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading user profile:', error);
        this.error.set('Failed to load profile. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  private mapUserToProfile(user: User) {
    this.profile.set({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      currentPosition: user.currentPosition || '',
      company: user.company || '',
      batch: user.batch?.id,
    });
  }

  private mapProfileToUser(profile: ProfileData): Partial<User> {
    const updateData: any = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      currentPosition: profile.currentPosition,
      company: profile.company,
    };

    if (profile.batch) {
      updateData.batch = profile.batch;
    }

    return updateData;
  }

  protected toggleEdit() {
    this.isEditing.update((editing: boolean) => !editing);
  }

  protected saveProfile() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    const profileData = this.profile();
    const updateData = this.mapProfileToUser(profileData);

    this.userService.updateCurrentUser(updateData).subscribe({
      next: (updatedUser: User) => {
        this.userData.set(updatedUser);
        this.mapUserToProfile(updatedUser);
        this.isEditing.set(false);
        this.isLoading.set(false);
        console.log('Profile updated successfully');
        // You could add a toast notification here
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.error.set('Failed to save profile. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  protected cancelEdit() {
    // Reset profile to original user data
    const user = this.userData();
    if (user) {
      this.mapUserToProfile(user);
    }
    this.isEditing.set(false);
    this.error.set(null);
  }

  protected getBatchName(batchId?: string): string {
    if (!batchId) return 'Not specified';
    const batch = this.batches().find((b: Batch) => b.id === batchId);
    return batch?.name || 'Not specified';
  }

  protected openBatchDropdown() {
    this.showBatchDropdown.set(true);
    this.searchBatch.set('');
    this.batchValidationError.set(null);
  }

  protected closeBatchDropdown() {
    this.showBatchDropdown.set(false);
    this.searchBatch.set('');
    this.batchValidationError.set(null);
  }

  protected selectBatch(batchId: string) {
    this.profile.update((p: ProfileData) => ({ ...p, batch: batchId }));
    this.closeBatchDropdown();
  }

  protected validateBatchName(name: string): boolean {
    return this.BATCH_PATTERN.test(name);
  }

  protected async createAndSetBatch() {
    const batchName = this.searchBatch().trim().toUpperCase();

    // Validate batch name format
    if (!this.validateBatchName(batchName)) {
      this.batchValidationError.set(
        'Invalid format. Please use format like D-42 or E-100 (D/E for shift, followed by number 1 or greater)'
      );
      return;
    }

    // Check if batch already exists
    const existingBatch = this.batches().find(
      (b: Batch) => b.name.toUpperCase() === batchName
    );
    if (existingBatch) {
      this.selectBatch(existingBatch.id);
      return;
    }

    // Create new batch
    this.isCreatingBatch.set(true);
    this.batchValidationError.set(null);

    try {
      const batchResource = this.batchService.create({ name: batchName });
      
      // Use effect to wait for the batch to be created
      const unsubscribe = effect(() => {
        const newBatch = batchResource() as Batch;
        if (newBatch && newBatch.id) {
          // Add new batch to the list
          this.batches.update((batches: Batch[]) => [...batches, newBatch]);
          // Select the newly created batch
          this.selectBatch(newBatch.id);
          this.isCreatingBatch.set(false);
          unsubscribe(); // Clean up the effect
        }
      });
    } catch (error) {
      console.error('Error creating batch:', error);
      this.batchValidationError.set('Failed to create batch. Please try again.');
      this.isCreatingBatch.set(false);
    }
  }

  protected retryLoad() {
    this.loadUserProfile();
  }

  protected sendVerificationEmail() {
    if (this.isSendingVerification()) return;

    const user = this.userData();
    if (!user?.email) return;

    this.isSendingVerification.set(true);
    this.error.set(null);

    this.authService.resendVerificationEmail().subscribe({
      next: () => {
        console.log('Verification email sent successfully');
        this.isSendingVerification.set(false);
        // You could add a success toast notification here
      },
      error: (error: any) => {
        console.error('Error sending verification email:', error);
        this.error.set('Failed to send verification email. Please try again.');
        this.isSendingVerification.set(false);
      },
    });
  }

  protected onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.uploadPhoto(file);
  }

  protected uploadPhoto(file: File) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.error.set('Please select a valid image file (JPEG, PNG, or GIF).');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      this.error.set('File size must be less than 5MB.');
      return;
    }

    this.isUploadingPhoto.set(true);
    this.error.set(null);

    this.userService.uploadPhoto(file).subscribe({
      next: (updatedUser: User) => {
        this.userData.set(updatedUser);
        this.mapUserToProfile(updatedUser);
        this.isUploadingPhoto.set(false);
        console.log('Photo uploaded successfully');
        // You could add a success toast notification here
      },
      error: (error: any) => {
        console.error('Error uploading photo:', error);
        this.error.set('Failed to upload photo. Please try again.');
        this.isUploadingPhoto.set(false);
      },
    });
  }

  protected triggerPhotoUpload() {
    const fileInput = document.getElementById(
      'photo-upload',
    ) as HTMLInputElement;
    fileInput?.click();
  }
}
