#!/bin/bash

build_main(){
  local version
  local file

  version=$(grep '"version":' package.json | cut -d'"' -f4)
  rm -rf public/dist

  for file in public/*.html; do
    sed -i "s/\/dist\//\/$version\//g" $file
  done

  if [ "$(curl -sI -o /dev/null -w "%{http_code}" $AWS_URL/$version/getto.css)" == "404" ]; then
    npm run build
    mv public/dist public/$version
  fi
}

build_main
