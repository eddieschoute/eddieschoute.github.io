SHELL := /bin/zsh
BUILDDIR := build

all: validate_yaml $(BUILDDIR)/academic_resume.pdf $(BUILDDIR)/cv.html

validate_yaml:
	@yq . cv.yaml > /dev/null

directories:
	@mkdir -p $(BUILDDIR)

$(BUILDDIR)/%_resume.pdf: $(BUILDDIR)/%_resume.tex directories
	latexmk --output-directory=$(BUILDDIR) $<

$(BUILDDIR)/%_resume.tex: template_%_resume.tex cv.yaml directories
	echo "" | pandoc --metadata-file cv.yaml --template=$< -t latex > $@

$(BUILDDIR)/cv.html: template_cv.html cv.yaml directories
	echo "" | pandoc --metadata-file cv.yaml --template=$< -t html > $@

clean:
	rm build/*

