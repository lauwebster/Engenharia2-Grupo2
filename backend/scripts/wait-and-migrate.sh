#!/bin/sh

echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

echo "Running migrations..."
npm run migrate
echo "Migrations completed!"

echo "Starting application..."
exec "$@" 