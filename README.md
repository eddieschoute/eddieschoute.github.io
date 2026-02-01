# CV Template

This repository contains a system to generate professional CVs, Resumes, and Publication Lists in PDF and HTML formats. It uses a single YAML database (`cv.yaml`) as the source of truth, allowing for easy updates and consistent formatting across different output versions.

## Build

### Requirements
* Make
* pandoc
* latex (specifically `latexmk` and standard packages)
* yq

### How to build
Run
```
> make
```
to build all targets.
The output is in the `build/` subdirectory.

You can also just build one target by running e.g.
```
> make build/cv.html
```

# Copyright
All files except for `cv.yaml` are licensed under GPLv3 (see `LICENSE`).
All rights reserved &copy; 2020 Eddie Schoute for `cv.yaml`.
