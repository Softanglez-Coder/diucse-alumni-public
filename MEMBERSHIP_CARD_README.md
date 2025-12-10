# Membership Card Feature

## Overview
This feature allows users to view and download their membership cards by visiting a URL with their membership ID.

## URL Structure
```
/membership/{membershipId}
```

Example: `/membership/M000001`

## Features

### 1. Valid Membership Cards
When a valid membership ID is provided:
- Displays a beautiful, professional membership card with:
  - User's photo
  - Name
  - Email
  - Membership ID
  - CSE DIU Alumni branding
- Provides download options:
  - **Download as PNG** - High-quality image format
  - **Download as PDF** - Printable document format

### 2. Invalid Membership Cards
When an invalid membership ID is provided:
- Displays a sample card with dummy data (John Doe)
- Shows "SAMPLE - NOT VALID" watermark
- Displays warning message: "This membership ID is not valid. Please apply for membership."
- Download buttons are hidden
- Provides link to apply for membership

## Technical Implementation

### Backend API
- **Endpoint**: `GET /users/membership/:membershipId`
- **Location**: `diucse-alumni-api/src/feature/user/user.controller.ts`
- **Service Method**: `findByMembershipId()` in `user.service.ts`
- **Returns**: User data if found, null if not found

### Frontend Components
- **Component**: `MembershipCard`
- **Location**: `diucse-alumni-public/src/app/pages/membership-card/`
- **Files**:
  - `membership-card.ts` - Component logic
  - `membership-card.html` - Template
  - `membership-card.scss` - Styles

### Dependencies
- `html2canvas` - For converting HTML to canvas for image generation
- `jspdf` - For PDF generation
- `@types/html2canvas` - TypeScript type definitions

## Design Features

### Card Design
- **Gradient background**: Blue gradient (from #1e3c72 to #2a5298)
- **Professional layout**: Header, body, and footer sections
- **Responsive design**: Adapts to mobile, tablet, and desktop
- **High-quality rendering**: Optimized for downloads at 2x scale

### Visual Elements
- University logo placeholder
- Professional photo frame with border
- Clean information layout with labels
- Footer with certification text
- Optional QR code placeholder
- Watermark for invalid cards

### Color Scheme
- Primary: Blue gradient (#1e3c72 to #2a5298)
- Text: White on dark background
- Accents: Semi-transparent white overlays
- Shadow effects for depth

## Usage Examples

### Valid Membership
```
https://csediualumni.com/membership/M000001
```
- Shows actual user data
- Allows downloading as PNG or PDF

### Invalid Membership
```
https://csediualumni.com/membership/M999999
```
- Shows dummy data (John Doe)
- Displays "SAMPLE - NOT VALID" watermark
- Shows warning message
- No download functionality

## User Flow

1. User visits `/membership/{membershipId}`
2. App fetches user data from API
3. If found:
   - Display actual membership card
   - Enable download buttons
4. If not found:
   - Display sample card with watermark
   - Show error message
   - Disable downloads
   - Show "Apply for Membership" button

## Customization

### Changing Card Design
Edit `membership-card.scss` to modify:
- Colors and gradients
- Layout and spacing
- Font sizes and styles
- Responsive breakpoints

### Adding QR Code
The card includes a QR code placeholder (`.qr-placeholder`). To add a functional QR code:
1. Install a QR code library (e.g., `qrcode.angular`)
2. Generate QR code with membership URL
3. Replace placeholder in template

### Custom Branding
- Replace `/images/diu-logo.png` with your logo
- Update "CSE DIU Alumni" text in template
- Modify color scheme in SCSS file

## Future Enhancements
- Add QR code generation
- Add signature fields
- Add expiration date
- Add barcode for scanning
- Add card flip animation for back side
- Add social share functionality
- Add email card functionality

## Testing

### Test Valid Card
1. Get a valid membership ID from database
2. Visit `/membership/{validId}`
3. Verify user data displays correctly
4. Test PNG download
5. Test PDF download

### Test Invalid Card
1. Use a non-existent membership ID
2. Visit `/membership/{invalidId}`
3. Verify dummy data displays
4. Verify watermark appears
5. Verify download buttons are hidden
6. Verify error message shows

## Troubleshooting

### Card Not Displaying
- Check if API endpoint is accessible
- Verify membership ID format
- Check browser console for errors

### Download Not Working
- Ensure html2canvas and jspdf are installed
- Check browser compatibility
- Verify ViewChild reference is set

### Styling Issues
- Clear browser cache
- Check for CSS conflicts
- Verify SCSS compilation

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
