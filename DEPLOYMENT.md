# Feeling Cafe Deployment Notes

## VPS setup

1. Copy `.env.example` to `.env`.
2. Set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, `FRONTEND_URL`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`.
3. Add Cloudinary credentials if image upload is enabled.
4. Run:

```bash
docker compose up -d --build
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py seed_demo
```

## SSL/domain

Point your domain A record to the VPS public IP. Then install Certbot on the VPS and issue a certificate:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

After SSL is active, set:

```env
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
FRONTEND_URL=https://yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_SSL_REDIRECT=True
```

## Daily backups

Copy `scripts/backup_postgres.sh` to the VPS and add a cron entry:

```bash
0 2 * * * /path/to/backup_postgres.sh >> /var/log/feeling-cafe-backup.log 2>&1
```

## External verification checklist

- UPI QR payments are manually verified by the cafe owner from Django Admin.
- Add the cafe UPI ID and QR image URL in Cafe settings before accepting advance payments.
- Cloudinary upload verification requires valid Cloudinary credentials and `USE_CLOUDINARY=True`.
- Mobile polish should be checked on at least one Android phone and one desktop browser before launch.
