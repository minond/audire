-include .scaffold/plugins/js.mk
-include .scaffold/plugins/minify.mk

SOURCE_DIR = audire
TEST_DIR =

all:: lint

lint: js-lint
