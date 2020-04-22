dev-setup:
	sudo gem install mustache

build:
	mustache src/html-templates/template_bits.yaml src/html-templates/index.mustache > src/index.html
	mustache src/html-templates/template_bits.yaml src/html-templates/about.mustache > src/about.html
	mustache src/html-templates/template_bits.yaml src/html-templates/add-a-wif.mustache > src/add-a-wif.html
	python3 build_wif_pages.py

test:
	make build
	sleep 1 && open -a "Google Chrome" http://localhost:9999/src &
	python3 -m http.server 9999

deploy:
	make build
	aws s3 cp --recursive src/ s3://dot-run/ --acl public-read
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" http://dot-run.s3-website-us-east-1.amazonaws.com/ -incognito &

git:
	git add -A && git commit -m "automatic commit" && git push
