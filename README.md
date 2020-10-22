# CV Template
A way to build CV in various formats from yaml cv database.

## Build

### Requirements
* Make
* pandoc
* latex (for pdf)

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