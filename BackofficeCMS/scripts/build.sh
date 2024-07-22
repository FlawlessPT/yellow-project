#!/bin/bash
 
case $ENVIRONMENT in
  "DEV")
    yarn build:development
    ;;
  "STAGING")
    yarn build:staging
    ;;
  "PROD")
    yarn build:production
    ;;
  *)
    echo "Variable ENVIRONMENT not set ($ENVIRONMENT)"
    # To check if it should be removed    
    # exit 1
    ;;
esac