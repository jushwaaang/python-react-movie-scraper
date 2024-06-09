#!/bin/bash

# Apply database migrations
echo "Running database migrations..."
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

# Start Gunicorn server
echo "Starting Gunicorn server..."
exec gunicorn --bind 0.0.0.0:8000 creativecrawler.wsgi:application