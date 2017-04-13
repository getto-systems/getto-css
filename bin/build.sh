#!/bin/bash

build_main(){
  local version
  local file

  version=$(grep '"version":' package.json | cut -d'"' -f4)

  if [ "$(curl -sI -o /dev/null -w "%{http_code}" $AWS_URL/$version/getto.css)" == "404" ]; then
    npm run build
    mv public/dist public/$version

    for file in public/*.html; do
      sed -i "s/\/dist\//\/$version\//g" $file
    done
  fi
}

build_main
