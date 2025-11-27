---
title: Installing Neovim in MacOS
slug: install-neovim-macos
description: A guide to install and run neovim in MacOS using nvim command.
date: 2024-07-27
params:
  featured: true
  external: false
---

Neovim moves fast. If you want to stay on the bleeding edge, you have to install the latest version directly from the [releases](https://github.com/neovim/neovim/releases) page.

**Note:** If you don't want to stay on the bleeding edge, just running the homebrew command `brew install neovim` will have everything setup and running in just a few seconds.

## Install Neovim

There are many ways to go about this. The easiest way IMO is to download the executable from the GitHub releases page and create an alias to the downloaded executable in `~/.zshrc`.

_Note: You cannot move files into the bin directory in MacOS like you do in Linux systems._

1. Go to the [release page](https://github.com/neovim/neovim/releases) and pick the version you want to install.
2. Follow the steps and extract the `nvim-macos-*.tar.gz` file in your Downloads directory.
3. Create a new directory called `bin` in your home directory `mkdir ~/bin`.
4. Move the extracted nvim directory to the newly created bin directory `mv ~/Downloads/nvim-macos-your-version ~/bin/`.
5. Open your `~/.zshrc` or `~/.bashrc` using your existing editor. Eg. `code ~/.zshrc` or `nano ~/.zshrc`.
6. Add an alias to the nvim executable at the end of the rc file. `alias nvim="$HOME/bin/nvim-macos-your-version/bin/nvim"`. Save the changes.
7. Source the latest rc Eg. `source ~/.zshrc` or `source ~/.bashrc` to refresh your shell. Alternatively you can also restart your terminal.
8. All done. You can now use the `nvim` command to start neovim from your terminal.

## Making the most out of your Neovim

Neovim in itself is a powerful text editor but to get the full IDE experience that you usually get in editors like VSCode, you will need use configs like [AstroNvim](https://astronvim.com/) or [NvChad](https://nvchad.com/). I usually go with AstroNvim as it involves the least amount of setup steps and there are plenty of community plugins that you can just plug and play to get the functionality you want.

I'm not going to in the details of how to setup AstroNvim. Their [Get Started](https://docs.astronvim.com/) docs does a pretty good job of it. I will however write a few steps that I usually follow whenever I install a fresh copy of neovim.

1. Install neovim
2. Install AstroNvim
3. Setup the [community.lua file](https://docs.astronvim.com/astrocommunity)
4. Add a few [community themes](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/colorscheme) to the `community.lua` file. My favourites are `gruvbox` and `dracula`.
5. Add a few [community packs](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack) to add language, formatting and syntax highlighting support. For example, typescript.
6. Restart nvim.
7. All done. You editor should now look something like this.

![neovim should now look like this](/images/blog/21-neovim-screengrab.jpg)
