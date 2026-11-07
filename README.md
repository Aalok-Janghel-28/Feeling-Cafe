# Feeling Cafe

Production-shaped MVP for a veg cafe online ordering system.

## Current scope

- React/Vite customer frontend
- Django backend with JSON API
- DRF serializers for public read APIs
- SimpleJWT access/refresh token authentication
- Django Admin for cafe operations
- Customer registration/login
- Forgot/reset password flow using Django token generator and console email
- Customer profile with one saved address
- Menu categories and items
- Popular items, availability, spice level, search, and filters
- Cart stored in browser local storage
- Delivery radius and fee calculation
- Frontend delivery availability check before checkout
- OpenStreetMap/Leaflet location picker
- Minimum order and 50% advance calculation
- Order history
- Order detail view
- Reviews for ordered menu items
- Frontend item review form from order history
- Editable cafe settings, gallery, and policy pages
- Frontend gallery and policy views
- UPI QR advance payment with manual admin verification
- Cloudinary-backed image fields for menu/gallery uploads
- Docker Compose, Nginx, GitHub Actions CI, seed data command, and backup script

## Backend

```powershell
BackEnd\Scripts\python.exe BackEnd\Scripts\Cafe\manage.py migrate
BackEnd\Scripts\python.exe BackEnd\Scripts\Cafe\manage.py createsuperuser
BackEnd\Scripts\python.exe BackEnd\Scripts\Cafe\manage.py seed_demo
BackEnd\Scripts\python.exe BackEnd\Scripts\Cafe\manage.py runserver
```

Admin panel:

```text
http://127.0.0.1:8000/admin/
```

API base:

```text
http://127.0.0.1:8000/api/
```

## Frontend

```powershell
cd FrontEnd
npm.cmd install
npm.cmd run dev
npm.cmd run test
```

Frontend URL:

```text
http://127.0.0.1:5173/
```

## Important setup notes

- In Django Admin, create or update the single `Cafe settings` record and add cafe latitude/longitude before testing checkout.
- Add categories and menu items from Django Admin.
- Image fields support Cloudinary when credentials are configured; image URLs still work as fallback.
- Add the cafe UPI ID and QR image URL in Django Admin under Cafe settings before payment testing.
- See `DEPLOYMENT.md` for VPS, SSL, backup, Cloudinary, and production verification notes.
- Password reset emails print in the backend terminal during local development.
