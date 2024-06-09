#!/bin/bash
 
case $VERCEL_ENV in
  "development")
    npm run build:development
    ;;
  "staging")
    npm run build:staging
    ;;
  "production")
    npm run build:production
    ;;
esac