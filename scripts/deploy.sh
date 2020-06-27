#!/bin/bash

deploy_main(){
  local version
  local file

  version=$(cat .release-version)

  for file in public/dist/*.html; do
    sed -i -e "s|/dist/|/$version/|g" $file
  done

  npm run build

  if [ ! -d dist ]; then
    echo "build failed! : dist directory not exists"
    exit 1
  fi

  if [ ! -d css ]; then
    echo "build failed! : css directory not exists"
    exit 1
  fi

  cp -a public/dist/* dist

  deploy_trellis
  deploy_css
}
deploy_trellis(){
  local metadata
  metadata=$(node metadata/trellis.js)

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --metadata "$metadata" \
    --recursive \
    css s3://$AWS_S3_BUCKET_TRELLIS/$version
}
deploy_css(){
  local metadata
  local file
  metadata=$(node metadata/css.js)

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --metadata "$metadata" \
    --recursive \
    dist s3://$AWS_S3_BUCKET_CSS/$version

  for file in public/root/*; do
    aws s3 cp \
      --acl private \
      --cache-control "public, max-age=86400" \
      --metadata "$metadata" \
      $file "s3://$AWS_S3_BUCKET_CSS/$(basename $file)"
  done
}

deploy_main
