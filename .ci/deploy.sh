#!/bin/bash

deploy_main(){
  local version
  local file

  version=$(cat .release-version)

  for file in $(find public/dist -name '*.html'); do
    sed -i -e "s|/dist/|/$version/|g" $file
  done

  npm run build

  if [ ! -d theme/artifact/dist ]; then
    echo "build failed! : theme/artifact/dist directory not exists"
    exit 1
  fi

  deploy_rewrite_version
  deploy_trellis
  deploy_css
}
deploy_rewrite_version(){
  for file in $(find theme/public/dist theme/public/root -name '*.html'); do
    if [ -f "$file" ]; then
      sed -i -e "s|/dist/|/$version/|g" "$file"
    fi
  done
}
deploy_trellis(){
  local metadata
  metadata=$(node theme/artifact/metadata.js)

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
  metadata=$(node theme/public/metadata.js)

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
