import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/services';

export const routes: Routes = [
    // Authentication
    {
        path: 'login',
        title: 'Login - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Login),
        canActivate: [guestGuard]
    },
    {
        path: 'register',
        title: 'Register - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Register),
        canActivate: [guestGuard]
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.ForgotPassword),
        canActivate: [guestGuard]
    },
    {
        path: 'reset-password',
        title: 'Reset Password - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.ResetPassword)
    },
    {
        path: 'verify-email',
        title: 'Verify Email - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.VerifyEmail)
    },

    // Membership
    {
        path: 'membership',
        title: 'Membership - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Membership)
    },

    // Members
    {
        path: 'members',
        title: 'Members - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Members)
    },

    // Misc
    {
        path: 'about',
        title: 'About Us - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.About)
    },
    {
        path: 'contact',
        title: 'Contact Us - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Contact)
    },

    // Social Media Redirects
    {
        path: 'facebook',
        title: 'Redirecting to Facebook - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.FacebookRedirect)
    },
    {
        path: 'linkedin',
        title: 'Redirecting to LinkedIn - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.LinkedinRedirect)
    },
    {
        path: 'twitter',
        title: 'Redirecting to Twitter - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.TwitterRedirect)
    },
    {
        path: 'instagram',
        title: 'Redirecting to Instagram - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.InstagramRedirect)
    },


    // Portal
    {
        path: 'portal',
        loadComponent: () => import('./pages').then(c => c.Portal),
        title: 'Portal - DIUCSE Alumni',
        canActivate: [authGuard],
        children: [
            {
                path: 'profile',
                title: 'Profile - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalProfile)
            },
            {
                path: 'membership',
                title: 'Membership - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalMembership)
            },
          {
            path: 'blogs',
            title: 'Blogs - DIUCSE Alumni',
            loadComponent: () => import('./pages').then(c => c.PortalBlogs)
          },
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./pages').then(c => c.Home),
        title: 'Home - DIUCSE Alumni',
        pathMatch: 'full'
    },
];
