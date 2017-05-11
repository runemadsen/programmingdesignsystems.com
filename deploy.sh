echo "Building site"

NODE_ENV=production ./node_modules/.bin/magicbook build

echo "-> Uploading to S3"

# Sync everything that is not HTML to cache for a year
echo "-> Syncing assets"
s3cmd sync --acl-public --guess-mime-type --exclude '*.html' --add-header="Cache-Control: max-age=31536000"  build/build1/ s3://programmingdesignsystems.com

# Sync html files last to not provoke CDN to cache 404's on images. Also set 300 seconds cache control
echo "-> Syncing .html"
s3cmd sync --acl-public --mime-type="text/html; charset=utf-8" --exclude '*.*' --include  '*.html' --add-header="Cache-Control: max-age=300, must-revalidate"  build/build1/ s3://programmingdesignsystems.com

echo "-> Done!"
