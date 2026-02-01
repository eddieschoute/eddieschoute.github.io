SHELL := /bin/bash
BUILDDIR := build

all: check_deps validate_yaml \
	$(BUILDDIR)/resume.pdf \
	$(BUILDDIR)/cv.pdf \
	$(BUILDDIR)/publication_list.pdf \
	$(BUILDDIR)/cv.html \
	$(BUILDDIR)/main.js

check_deps:
	@command -v pandoc >/dev/null 2>&1 || { echo >&2 "Error: pandoc is not installed."; exit 1; }
	@command -v latexmk >/dev/null 2>&1 || { echo >&2 "Error: latexmk is not installed."; exit 1; }
	@command -v yq >/dev/null 2>&1 || { echo >&2 "Error: yq is not installed."; exit 1; }

validate_yaml:
	@yq -e . cv.yaml > /dev/null

directories:
	@mkdir -p $(BUILDDIR)

$(BUILDDIR)/%.pdf: $(BUILDDIR)/%.tex directories
	latexmk --output-directory=$(BUILDDIR) $<

$(BUILDDIR)/%.tex: template_%.tex cv.yaml directories
	echo "" | pandoc --metadata-file cv.yaml --template=$< -t latex > $@

$(BUILDDIR)/cv.html: template_cv.html cv.yaml directories
	echo "" | pandoc --metadata title="My Title" --metadata-file cv.yaml --template=$< -t html > $@

$(BUILDDIR)/main.js: main.js
	cp main.js $(BUILDDIR)/main.js

clean:
	rm -rf $(BUILDDIR)
