SHELL := /bin/zsh
BUILDDIR := build

all: validate_yaml $(BUILDDIR)/long_cv.pdf $(BUILDDIR)/cv.html

validate_yaml:
	@yq . cv.yaml > /dev/null

directories:
	@mkdir -p $(BUILDDIR)

$(BUILDDIR)/%_cv.pdf: $(BUILDDIR)/%_cv.tex directories
	latexmk --output-directory=$(BUILDDIR) $<

$(BUILDDIR)/%_cv.tex: template_%_cv.tex cv.yaml directories
	echo "" | pandoc --metadata-file cv.yaml --template=$< -t latex > $@

$(BUILDDIR)/cv.html: template_cv.html cv.yaml directories
	echo "" | pandoc --metadata-file cv.yaml --template=$< -t html > $@

clean:
	rm build/*

