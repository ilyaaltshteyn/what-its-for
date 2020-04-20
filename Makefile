dev-setup:
	sudo gem install mustache

build:
	mustache src/html-templates/header.yaml src/html-templates/index.mustache > src/index.html
	python3 build_wif_pages.py

deploy:
	make build
	aws s3 cp --recursive src/ s3://dot-run/ --acl public-read
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" http://dot-run.s3-website-us-east-1.amazonaws.com/ -incognito &

git:
	git add -A && git commit -m "automatic commit" && git push
