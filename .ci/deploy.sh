#!/bin/bash

deploy_main(){
  local version
  local file

  local artifact_root
  local public_root

  artifact_root=theme/artifact
  public_root=theme/public

  version=$(cat .release-version)

  for file in $(find public/dist -name '*.html'); do
    sed -i -e "s|/dist/|/$version/|g" $file
  done

  npm run build

  if [ ! -f $artifact_root/dist/getto.css ]; then
    echo "build failed! : $artifact_root/dist/getto.css not exists"
    exit 1
  fi

  deploy_rewrite_version
  deploy_artifact
  deploy_public

  deploy_cp_public_index "2.19.0"
  deploy_cp_public_index "2.19.1"
}
deploy_rewrite_version(){
  for file in $(find $public_root/dist $public_root/root -name '*.html'); do
    if [ -f "$file" ]; then
      sed -i -e "s|/dist/|/$version/|g" "$file"
    fi
  done
}
deploy_artifact(){
  local metadata
  metadata=$(node $artifact_root/metadata.js)

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --metadata "$metadata" \
    --recursive \
    $artifact_root/dist s3://$AWS_S3_BUCKET_TRELLIS/$version
}
deploy_public(){
  local metadata
  local file
  metadata=$(node $public_root/metadata.js)

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --metadata "$metadata" \
    --recursive \
    $public_root/dist s3://$AWS_S3_BUCKET_CSS/$version

  for file in $public_root/root/*; do
    aws s3 cp \
      --acl private \
      --cache-control "public, max-age=86400" \
      --metadata "$metadata" \
      $file "s3://$AWS_S3_BUCKET_CSS/$(basename $file)"
  done
}

deploy_cp_public_index(){
  # 歯抜けになってしまったパージョンのために index.html を埋める
  local metadata
  local file
  metadata=$(node $public_root/metadata.js)

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --metadata "$metadata" \
    example/public/dist/index.html s3://$AWS_S3_PUBLIC_BUCKET/$1/index.html
}

deploy_main
