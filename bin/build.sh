#!/bin/bash

build_main(){
  local version
  local file

  version=$(cato .release-version)

  for file in public/dist/*.html; do
    sed -i -e "s|/dist/|/$version/|g" -e 's|version : DEV|version : '$version'|' $file
  done

  npm run build

  if [ ! -f public/dist/getto.css ]; then
    build_message "error: build failed (version: $version)"
    exit 1
  fi

  build_message "notice: build complete (version: $version)"

  if [ -d public/dist ]; then
    mv public/dist public/$version
  fi

  build_sync

  build_message "notice: sync complete (version: $version)"
}
build_sync(){
  apt-get update
  apt-get install -y s3cmd

  echo "[default]" > .s3cfg
  echo "access_key = $AWS_ACCESS_KEY" >> .s3cfg
  echo "secret_key = $AWS_SECRET_KEY" >> .s3cfg

  s3cmd sync -c .s3cfg --acl-private --no-mime-magic --guess-mime-type --verbose ./public/ "$AWS_S3_URL"
}
build_message(){
  local text=$1; shift

  if [ -n "$SLACK_CHANNEL" -a -n "$SLACK_URL" ]; then
    curl -X POST --data-urlencode 'payload={"channel": "#'"$SLACK_CHANNEL"'", "username": "elm", "text": "'"$text"'", "icon_emoji": ":hammer:"}' "$SLACK_URL"
  fi
}

build_main
