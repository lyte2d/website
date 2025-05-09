################################################################################################################################################################
--targets:
	@echo "Available Makefile targets:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'
################################################################################################################################################################

LYTE2D=../lyte2d

clean:	## clean: docs and tmp folders
	rm -rf docs/*
	rm -rf tmp/*


refresh-root-files:  # copy public files + CNAME (for github hosting)
	cp -r ./root/* ./docs

refresh-apidocs: # update examples.zip. assumes lyte2d repo is on a sibling directory
	cp $(LYTE2D)/typings/lyte.d.tl ./tmp/

refresh-examples:  # update examples.zip. assumes lyte2d repo is on a sibling directory
	cp -r $(LYTE2D)/samples ./tmp/
	cd ./tmp/samples && zip -9 -u -r ../../docs/examples.zip * && cd ../..

refresh-lyte-html:	# update lyte.html from lyte folder
	echo "MAKE SURE YOU HAVE UPDATED './lyte/lyte.html' to the correct version!"
	cp -r ./lyte/* ./docs

update-index-html: # update (rebuild) index.html
	node build.js > docs/index.html

build: clean  refresh-root-files  refresh-apidocs  refresh-examples  refresh-lyte-html update-index-html ## BUILD SITE

host:	## run the website (docs folder) for testing
	npx http-server docs

PUSH-TO-PROD:
	rm -rf tmp/*
	git add -a
	git commit -m "update"
	git push origin main
