-include .scaffold/plugins/js.mk
-include .scaffold/plugins/minify.mk

TEST_DIR =

all:: lint

clean::
	if [ -d build ]; then rm -r build; fi
	if [ -d node_modules ]; then rm -r node_modules; fi

dependencies:
	git submodule update --init

install: dependencies
	npm install

build: install
	if [ ! -d build ]; then mkdir build; fi
	$(NPM_BIN)/browserify index.js -o build/player.js -t brfs
	$(NPM_BIN)/lessc player/styles.less > build/player.css

lint: install js-lint
