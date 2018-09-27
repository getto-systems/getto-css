#!/bin/bash

build_main(){
  local version
  local file

  version=$(grep '"version":' package.json | cut -d'"' -f4)

  for file in public/dist/*.html; do
    sed -i -e "s|/dist/|/$version/|g" -e 's|version : DEV|version : '$version'|' $file
  done

  if [ "$(curl -sI -o /dev/null -w "%{http_code}" https://css.getto.systems/$version/getto.css)" != "200" ]; then
    npm run build
    mv public/dist public/$version
    curl -X POST --data-urlencode 'payload={"channel": "#getto-css", "username": "build", "text": "css: '$version'", "icon_emoji": ":thumbsup:"}' $SLACK_URL
  else
    rm -rf public/dist
  fi
}

build_main
