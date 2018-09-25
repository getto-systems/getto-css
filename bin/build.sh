#!/bin/bash

build_main(){
  local version
  local file

  version=$(grep '"version":' package.json | cut -d'"' -f4)

  for file in public/*.html; do
    sed -i -e "s|/dist/|/$version/|g" -e 's|version : DEV|version : '$version'|' $file
  done

  if [ "$(curl -sI -o /dev/null -w "%{http_code}" $AWS_URL/$version/getto.css)" == "404" ]; then
    npm run build
    mv public/dist public/$version
    curl -X POST --data-urlencode 'payload={"channel": "#getto-css", "username": "build", "text": "css: '$version'", "icon_emoji": ":thumbsup:"}' $SLACK_URL
  fi
}

build_main
