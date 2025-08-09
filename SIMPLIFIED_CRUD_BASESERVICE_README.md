# Simplified Angular CRUD BaseService with Resource API

A streamlined BaseService implementation using Angular's Resource API for modern, reactive CRUD operations with automatic MongoDB `_id` to frontend `id` field transformation.

## Features

- ✅ **Simple Resource API**: Clean, modern Angular resource-based approach
- ✅ **Unified Filtering**: Single `findAll` method handles all filtering and pagination
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete, and Patch operations
- ✅ **Type Safety**: Full TypeScript support with generics
- ✅ **Automatic Loading States**: Built-in loading and error handling
- ✅ **ID Field Transformation**: Automatic `_id` ↔ `id` conversion for MongoDB compatibility
- ✅ **Lightweight**: No bulk operations or Observable compatibility - pure Resource API

## BaseService API

### Core Methods

```typescript
// Get all records with optional filtering/pagination
findAll<T>(params?: Record<string, any>): ResourceRef<T[]>

// Get single record by ID
findOne<T>(id: string | number): ResourceRef<T>

// Create new record
create<T>(data: Partial<T>): ResourceRef<T>

// Update existing record (full update)
update<T>(id: string | number, data: Partial<T>): ResourceRef<T>

// Patch existing record (partial update)
patch<T>(id: string | number, data: Partial<T>): ResourceRef<T>

// Delete record
delete<T>(id: string | number): ResourceRef<T>
```

## Usage Examples

### 1. Create a Service

```typescript
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor() {
    super('users'); // API endpoint: /api/users
  }

  // Custom convenience methods
  getUsersByRole(role: string) {
    return this.findAll<User>({ role });
  }

  getActiveUsers() {
    return this.findAll<User>({ status: 'active' });
  }

  searchUsers(searchTerm: string) {
    return this.findAll<User>({ search: searchTerm });
  }

  getPaginatedUsers(page: number = 1, limit: number = 10) {
    return this.findAll<User>({ 
      page: page.toString(), 
      limit: limit.toString() 
    });
  }
}
```

### 2. Component Usage

```typescript
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-user-management',
  template: `
    <div>
      <!-- All Users -->
      <div *ngIf="allUsers.isLoading()">Loading...</div>
      <div *ngIf="allUsers.error()">Error: {{ allUsers.error() }}</div>
      
      <div *ngIf="allUsers.value()">
        <h2>All Users ({{ allUsers.value().length }})</h2>
        <div *ngFor="let user of allUsers.value()">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }} - {{ user.role }}</p>
          <button (click)="selectUser(user.id)">View Details</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search users...">
        <select [(ngModel)]="selectedRole" (change)="onRoleChange()">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <!-- Filtered Results -->
      <div *ngIf="filteredUsers.value()">
        <h3>Filtered Users</h3>
        <div *ngFor="let user of filteredUsers.value()">
          {{ user.name }} - {{ user.role }}
        </div>
      </div>

      <!-- Single User Details -->
      <div *ngIf="selectedUser.value()">
        <h2>User Details</h2>
        <p>Name: {{ selectedUser.value().name }}</p>
        <p>Email: {{ selectedUser.value().email }}</p>
        <p>Role: {{ selectedUser.value().role }}</p>
        <button (click)="editUser()">Edit</button>
        <button (click)="deleteUser()">Delete</button>
      </div>
    </div>
  `
})
export class UserManagementComponent {
  private userService = inject(UserService);

  // Reactive state
  searchTerm = signal('');
  selectedRole = signal('');
  selectedUserId = signal<string | null>(null);

  // Resources
  allUsers = this.userService.findAll<User>();
  filteredUsers = this.userService.findAll<User>();
  selectedUser = this.userService.findOne<User>('');

  onSearch() {
    this.updateFilters();
  }

  onRoleChange() {
    this.updateFilters();
  }

  updateFilters() {
    const params: any = {};
    
    if (this.searchTerm()) {
      params.search = this.searchTerm();
    }
    
    if (this.selectedRole()) {
      params.role = this.selectedRole();
    }

    this.filteredUsers = this.userService.findAll<User>(params);
  }

  selectUser(userId: string) {
    this.selectedUserId.set(userId);
    this.selectedUser = this.userService.findOne<User>(userId);
  }

  editUser() {
    if (this.selectedUser.value()) {
      const updateResult = this.userService.update<User>(
        this.selectedUser.value().id,
        { name: 'Updated Name' }
      );
      
      // Refresh after update
      if (updateResult.value()) {
        this.allUsers = this.userService.findAll<User>();
      }
    }
  }

  deleteUser() {
    if (this.selectedUser.value()) {
      const deleteResult = this.userService.delete(this.selectedUser.value().id);
      
      // Clear selection and refresh
      if (deleteResult.value() !== undefined) {
        this.selectedUserId.set(null);
        this.allUsers = this.userService.findAll<User>();
      }
    }
  }
}
```

### 3. Common Usage Patterns

```typescript
export class ExampleUsageComponent {
  private userService = inject(UserService);

  // Get all users
  allUsers = this.userService.findAll<User>();

  // Filter by role
  adminUsers = this.userService.findAll<User>({ role: 'admin' });

  // Search users
  searchResults = this.userService.findAll<User>({ search: 'john' });

  // Multiple filters
  activeAdmins = this.userService.findAll<User>({ 
    role: 'admin', 
    status: 'active' 
  });

  // Pagination
  page1Users = this.userService.findAll<User>({ 
    page: '1', 
    limit: '10' 
  });

  // Complex filtering
  complexFilter = this.userService.findAll<User>({
    role: 'user',
    status: 'active',
    search: 'developer',
    page: '2',
    limit: '20'
  });

  // CRUD operations
  createUser() {
    const newUser = this.userService.create<User>({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active'
    });
  }

  updateUser(userId: string) {
    const updatedUser = this.userService.update<User>(userId, {
      name: 'Updated Name',
      role: 'admin'
    });
  }

  patchUser(userId: string) {
    const patchedUser = this.userService.patch<User>(userId, {
      status: 'inactive'
    });
  }

  deleteUser(userId: string) {
    const deleteResult = this.userService.delete(userId);
  }
}
```

## API Expected Response Format

### Array Response (findAll)
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "admin",
    "status": "active",
    "createdAt": "2023-01-02T00:00:00Z",
    "updatedAt": "2023-01-02T00:00:00Z"
  }
]
```

### Single Object Response (findOne, create, update, patch)
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
```

### Delete Response
```json
{}
```
or
```json
{
  "message": "User deleted successfully"
}
```

## Expected API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users?role=admin` - Filter by role
- `GET /api/users?search=john&status=active` - Multiple filters
- `GET /api/users?page=1&limit=10` - Pagination
- `GET /api/users/123` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/123` - Update user
- `PATCH /api/users/123` - Patch user
- `DELETE /api/users/123` - Delete user

## Resource API Benefits

1. **Simplified API**: Single `findAll` method handles all scenarios
2. **Automatic Loading States**: Built-in loading and error management
3. **Reactive**: Automatic UI updates when data changes
4. **Type Safe**: Full TypeScript support
5. **Modern**: Uses latest Angular patterns
6. **Lightweight**: Minimal API surface area

## Configuration

Ensure you provide the `API_BASE_URL` token:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { API_BASE_URL } from './core/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_BASE_URL, useValue: 'https://api.example.com' },
    // other providers
  ]
};
```

## Migration from Complex BaseService

If migrating from a more complex BaseService:

1. Replace `findWithQuery(params)` with `findAll(params)`
2. Replace `findPaginated(page, limit, filters)` with `findAll({ page: '1', limit: '10', ...filters })`
3. Remove bulk operation calls
4. Remove Observable method calls (ending with `Observable`)

This simplified BaseService provides everything you need for modern Angular applications with a clean, maintainable API.
