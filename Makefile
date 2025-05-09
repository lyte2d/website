################################################################################################################################################################
--targets:
	@echo "Available Makefile targets:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'
################################################################################################################################################################

# You'll need to clone the lyte2d repo next to this one
#    or update this line with the location
# Sample code and the guide will be copied from here
LYTE2D=../lyte2d

# The build/download location for the WASM build
# This is used in samples on the website
LYTE_HTML=~/Downloads/lyte2d.wasm.v0.8.0/lyte.html

clean:	## clean: docs and tmp folders
	rm -rf docs/*
	rm -rf tmp/*

refresh-lyte-html:	## update lyte.html from lyte folder
	cp ${LYTE_HTML} ./docs

refresh-root-files:  ## copy public files + CNAME (for github hosting)
	cp -r ./src/root/* ./docs

refresh-apidocs: ## update examples.zip. assumes lyte2d repo is on a sibling directory
	cp $(LYTE2D)/typings/lyte.d.tl ./tmp/

refresh-examples:  ## update examples.zip. assumes lyte2d repo is on a sibling directory
	cp -r $(LYTE2D)/samples ./tmp/
	cd ./tmp/samples && zip -9 -u -r ../../docs/examples.zip * && cd ../..

refresh-guide:  ## update guide.html. assumes lyte2d repo is on a sibling directory
	cp -r $(LYTE2D)/docs/guide.html ./tmp/

update-index-html: ## update (rebuild) index.html
	node src/gen_website.js > docs/index.html

build: clean  refresh-root-files  refresh-apidocs  refresh-examples  refresh-guide refresh-lyte-html update-index-html ## clean and rebuild  the website

host:	## run the website (docs folder) for testing
	npx http-server docs

PUSH-TO-PROD: ## update the website (git push)
	git add -A
	git commit -m "update"
	git push origin main
