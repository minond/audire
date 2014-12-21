-include .scaffold/plugins/js.mk
-include .scaffold/plugins/minify.mk

TEST_DIR =

all:: lint

dependencies:
	git submodule update --init

install: dependencies
	npm install

build: install
	$(NPM_BIN)/browserify index.js -o build/out.js

lint: install js-lint
