# Instructions for Agents and Developers

This repository relies on several external tools to build the CV and Resume files. Please ensure these are installed in the environment before running the build.

## Dependencies

The following tools are required:
*   **Pandoc**: Universal document converter.
*   **LaTeX (with latexmk)**: Typesetting system. `latexmk` is used to automate the build process.
*   **yq**: YAML processor (specifically the python wrapper or a compatible version that handles YAML-to-JSON conversion if needed, though the Makefile checks with `yq -e . cv.yaml`).

## Installation

### Ubuntu / Debian

```bash
sudo apt-get update
sudo apt-get install -y pandoc texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-luatex latexmk yq
```

*Note: Depending on the specific `yq` version available in the package manager, you might need to install it via snap or pip if the default one is not compatible.*

### macOS (Homebrew)

```bash
brew install pandoc texlive yq
```

*Note: `texlive` is quite large. You can also install BasicTeX (`brew install --cask basictex`) and then install `latexmk` via `tlmgr`, but full `texlive` is recommended for compatibility.*

## Build

Once dependencies are installed, you can verify the setup by running:

```bash
make check_deps
```
