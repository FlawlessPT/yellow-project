#!/bin/bash
 
case $VERCEL_ENV in
  "development")
    cd .. && npm run build:development
    ;;
  "staging")
    cd .. && npm run build:staging
    ;;
  "production")
    cd .. && npm run build:production
    ;;
esac