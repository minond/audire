-include .scaffold/plugins/js.mk
-include .scaffold/plugins/minify.mk

TEST_DIR =

all:: lint

clean::
	if [ -f build.js ]; then rm build.js; fi
	if [ -d node_modules ]; then rm -r node_modules; fi

dependencies:
	git submodule update --init

install: dependencies
	npm install

build: install
	$(NPM_BIN)/browserify index.js -o build.js -t node-lessify -t brfs

lint: install js-lint

pages:
	git fetch --all
	git checkout gh-pages
	git pull --rebase origin gh-pages
	git merge --no-ff master
	git push origin gh-pages
