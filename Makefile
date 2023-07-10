SHELL := /bin/zsh
BUILDDIR := build

all: validate_yaml \
	$(BUILDDIR)/resume.pdf \
	$(BUILDDIR)/cv.pdf \
	$(BUILDDIR)/publication_list.pdf \
	$(BUILDDIR)/cv.html

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

clean:
	rm build/*

