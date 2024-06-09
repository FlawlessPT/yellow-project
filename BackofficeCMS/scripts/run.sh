#!/bin/bash
 
case $VERCEL_ENV in
  "development")
    npm run run-dev
    ;;
  "staging")
    npm run run-stg
    ;;
  "production")
    npm run run-prod
    ;;
esac