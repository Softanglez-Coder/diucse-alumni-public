# Angular CRUD BaseService with Resource API

This BaseService provides a comprehensive CRUD (Create, Read, Update, Delete) implementation using Angular's new Resource API along with traditional Observable-based methods for backward compatibility, including automatic MongoDB `_id` to frontend `id` field transformation.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete, and Patch operations
- ✅ **Resource API Integration**: Modern Angular resource-based approach with automatic loading states
- ✅ **Observable Support**: Traditional Observable methods for backward compatibility
- ✅ **Query Parameters**: Support for filtering and searching
- ✅ **Pagination**: Built-in pagination support
- ✅ **Bulk Operations**: Bulk create, update, and delete operations
- ✅ **Type Safety**: Full TypeScript support with generics
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **Loading States**: Automatic loading state management
- ✅ **ID Field Transformation**: Automatic `_id` ↔ `id` conversion for MongoDB compatibility

## Installation

1. Make sure you have Angular 17+ installed
2. Copy the `BaseService` class to your project
3. Ensure you have the `API_BASE_URL` token configured in your app

## BaseService API

### Resource API Methods (Recommended)

#### Read Operations

```typescript
// Get all records
findAll<T>(): ResourceRef<T[]>

// Get single record by ID
findOne<T>(id: string | number): ResourceRef<T>

// Get records with query parameters
findWithQuery<T>(params: Record<string, any>): ResourceRef<T[]>

// Get paginated records
findPaginated<T>(page: number, limit: number, filters?: Record<string, any>): ResourceRef<PaginatedResponse<T>>
```

#### Write Operations

```typescript
// Create new record
create<T>(data: Partial<T>): ResourceRef<T>

// Update existing record (full update)
update<T>(id: string | number, data: Partial<T>): ResourceRef<T>

// Patch existing record (partial update)
patch<T>(id: string | number, data: Partial<T>): ResourceRef<T>

// Delete record
delete<T>(id: string | number): ResourceRef<T>
```

#### Bulk Operations

```typescript
// Bulk create records
bulkCreate<T>(data: Partial<T>[]): ResourceRef<T[]>

// Bulk update records
bulkUpdate<T>(data: Array<{ id: string | number; data: Partial<T> }>): ResourceRef<T[]>

// Bulk delete records
bulkDelete<T>(ids: (string | number)[]): ResourceRef<T>
```

### Observable Methods (Backward Compatibility)

All resource methods have corresponding Observable versions with the suffix `Observable`:

```typescript
findAllObservable<T>(): Observable<T[]>
findOneObservable<T>(id: string | number): Observable<T>
createObservable<T>(data: Partial<T>): Observable<T>
updateObservable<T>(id: string | number, data: Partial<T>): Observable<T>
patchObservable<T>(id: string | number, data: Partial<T>): Observable<T>
deleteObservable<T>(id: string | number): Observable<T>
findWithQueryObservable<T>(params: Record<string, any>): Observable<T[]>
findPaginatedObservable<T>(page: number, limit: number, filters?: Record<string, any>): Observable<PaginatedResponse<T>>
```

## Usage Examples

### 1. Create a Service

```typescript
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

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
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor() {
    super("users"); // API endpoint
  }

  // Custom methods
  getUsersByRole(role: string) {
    return this.findWithQuery<User>({ role });
  }

  getActiveUsers() {
    return this.findWithQuery<User>({ status: "active" });
  }

  searchUsers(searchTerm: string) {
    return this.findWithQuery<User>({ search: searchTerm });
  }
}
```

### 2. Use in Component (Resource API)

```typescript
import { Component, inject } from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  template: \`
    <div>
      <!-- Loading state -->
      <div *ngIf="usersResource.isLoading()">Loading...</div>

      <!-- Error state -->
      <div *ngIf="usersResource.error()">
        Error: {{ usersResource.error() }}
      </div>

      <!-- Data -->
      <div *ngIf="usersResource.value()">
        <div *ngFor="let user of usersResource.value()">
          {{ user.name }} - {{ user.email }}
        </div>
      </div>
    </div>
  \`
})
export class UserListComponent {
  private userService = inject(UserService);

  // Resource automatically manages loading states
  usersResource = this.userService.findAll<User>();

  // Filtered data
  activeUsersResource = this.userService.getActiveUsers();

  // Search results
  searchResults = this.userService.searchUsers('john');
}
```

### 3. CRUD Operations

```typescript
export class UserManagementComponent {
  private userService = inject(UserService);

  // Create user
  createUser(userData: Partial<User>) {
    const createResource = this.userService.create<User>(userData);

    // Resource provides automatic loading states
    if (createResource.isLoading()) {
      console.log("Creating user...");
    }

    if (createResource.error()) {
      console.error("Error creating user:", createResource.error());
    }

    if (createResource.value()) {
      console.log("User created:", createResource.value());
    }
  }

  // Update user
  updateUser(userId: string, userData: Partial<User>) {
    const updateResource = this.userService.update<User>(userId, userData);
    // Handle resource states similarly
  }

  // Delete user
  deleteUser(userId: string) {
    const deleteResource = this.userService.delete(userId);
    // Handle resource states similarly
  }
}
```

### 4. Pagination

```typescript
export class PaginatedUserListComponent {
  private userService = inject(UserService);

  currentPage = 1;
  pageSize = 10;
  filters = { role: "user", status: "active" };

  paginatedUsersResource = this.userService.findPaginated<User>(this.currentPage, this.pageSize, this.filters);

  nextPage() {
    this.currentPage++;
    this.paginatedUsersResource = this.userService.findPaginated<User>(this.currentPage, this.pageSize, this.filters);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedUsersResource = this.userService.findPaginated<User>(this.currentPage, this.pageSize, this.filters);
    }
  }
}
```

### 5. Using Observable Methods (Traditional Approach)

```typescript
export class TraditionalUserComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;

    this.userService.findAllObservable<User>().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  createUser(userData: Partial<User>) {
    this.userService.createObservable<User>(userData).subscribe({
      next: (createdUser) => {
        console.log("User created:", createdUser);
        this.loadUsers(); // Refresh list
      },
      error: (error) => {
        console.error("Error creating user:", error);
      },
    });
  }
}
```

### 6. Bulk Operations

```typescript
export class BulkUserManagementComponent {
  private userService = inject(UserService);

  // Bulk create users
  bulkCreateUsers(usersData: Partial<User>[]) {
    const bulkCreateResource = this.userService.bulkCreate<User>(usersData);

    if (bulkCreateResource.value()) {
      console.log("Users created:", bulkCreateResource.value());
    }
  }

  // Bulk update users
  bulkUpdateUsers(updates: Array<{ id: string; data: Partial<User> }>) {
    const bulkUpdateResource = this.userService.bulkUpdate<User>(updates);

    if (bulkUpdateResource.value()) {
      console.log("Users updated:", bulkUpdateResource.value());
    }
  }

  // Bulk delete users
  bulkDeleteUsers(userIds: string[]) {
    const bulkDeleteResource = this.userService.bulkDelete(userIds);

    if (bulkDeleteResource.value()) {
      console.log("Users deleted successfully");
    }
  }
}
```

## Resource API Benefits

1. **Automatic Loading States**: No need to manually manage loading flags
2. **Error Handling**: Built-in error state management
3. **Reactive Updates**: Automatic UI updates when data changes
4. **Memory Efficient**: Better memory management compared to traditional observables
5. **Simplified Code**: Less boilerplate code for common operations

## API Expected Response Format

### Single Resource

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

### Array of Resources

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

### Paginated Response

```json
{
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## Error Handling

The service automatically handles HTTP errors and provides them through the resource's error state:

```typescript
const userResource = this.userService.findOne<User>("123");

if (userResource.error()) {
  console.error("Error loading user:", userResource.error());
}
```

## Configuration

Make sure to provide the `API_BASE_URL` token in your app configuration:

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { API_BASE_URL } from "./core/tokens";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_BASE_URL, useValue: "https://api.example.com" },
    // other providers
  ],
};
```

## Best Practices

1. **Use Resource API**: Prefer resource methods over observable methods for new development
2. **Handle Loading States**: Always check and handle loading states in your templates
3. **Error Handling**: Implement proper error handling in your components
4. **Type Safety**: Always provide generic types for better type safety
5. **Service Extension**: Extend BaseService to add domain-specific methods
6. **Pagination**: Use pagination for large datasets to improve performance

This BaseService provides a solid foundation for building robust, type-safe Angular applications with comprehensive CRUD operations.
