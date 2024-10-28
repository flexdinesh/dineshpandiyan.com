---
featured: true
external: false
title: Arch Linux with Hyprland is very good
description: I now run Arch Linux with Hyprland and I love it
date: 2024-10-29
---

![Arch Linux with Hyprland](/images/blog/arch-linux-hyprland/arch-hypr.png)

I recently switched my laptop from [Pop!_OS](https://pop.system76.com/) with [GNOME](https://www.gnome.org/) to [Arch Linux](https://archlinux.org/) with [Hyprland](https://hyprland.org/) and I'm loving it. The keyboard-driven workflow of the tiling window manager feels natural. I enjoy jumping around windows and workspaces using the keyboard. Paired with a blue switch mechanical keyboard, spending time with my laptop is pure _click clack_ joy.

I started from scratch, and here's my [ricing](https://excaliburzero.gitbooks.io/an-introduction-to-linux-ricing/content/ricing.html) journey.

- [Arch Linux](#arch-linux)
- [Hyprland](#hyprland)
- [Waybar](#Waybar)
- [Wofi](#wofi)
- [Hypr Ecosystem](#hypr-ecosystem)
- [Custom Hyprland config](#custom-hyprland-config)
- [Kitty](#kitty)
- [Wrapping up](#wrapping-up)

## Arch Linux

I was already running Pop!_OS on my System76 Lemur Pro. It's an ubuntu based distro. It was okay. But the GNOME based tiling didn't really work for me. I'm used to [magnet workspace organizer](https://magnet.crowdcafe.com/) in macOS. Compared to it, Pop!_OS was disappointing. Additionally, the tools I want to use were often not the latest version in the `apt` package manager. Often, I had to compile tools on my own from GitHub repos which is cumbersome. I wanted to be on the bleeding edge without much extra effort. So natually, I wanted to go with Arch Linux.

The last time I installed Arch Linux, it was on an old desktop 10 years ago. Just the installation was a daunting process back then. It's a whole different story now. I used [archinstall](https://wiki.archlinux.org/title/Archinstall) which automated most of the installation. I just watched a YouTube video, flashed a USB drive with the latest ISO and had Arch up and running in no time.

## Hyprland

I chose Hyprland as my tiling window manager. I have used [i3wm](https://i3wm.org/) in the past and have an idea of what tiling window managers are but never really used it as a daily driver. I've been reading up a lot on Hyprland lately in the linux subreddits. It's new, it's modern, it looks good and people seem to like it. So I wanted to give it a go. And, boy am I glad to have made that decision. 

I like Hyprland.

- It's beautiful. It has the latest Wayland features, the animations are great and everything feels fast and good.
- The config changes are hot reloaded. I can play around with the config to get a feel for things instantly without having to reboot the session.
- A rich ecosystem of hypr tools.

Here's a screenshot of window tiles: two terminal windows runing different CLI tools and Obsidian notes on the left. The 2nd workspace is reserved from browser windows.

![Tiling in Hyprland](/images/blog/arch-linux-hyprland/tiling.png)

## Waybar

I chose [waybar](https://github.com/Alexays/Waybar) as the status bar. There's no specific reason for picking this other than that Hyprland examples recommended it. The styling and configuration were straightforward. The [modules](https://github.com/Alexays/Waybar/wiki/Module:-Custom) and customization they offered were sufficient for me.

## Wofi

I chose [wofi](https://hg.sr.ht/~scoopta/wofi) as the status bar. Similar to waybar, there's no specific reason for picking this other than that the Hyprland examples recommended it and I went with it. It's a launcher, other tools work well with it and it can be styled. I have setup emoji picker and clipboard manager to work with wofi.

Here's a screenshot of the wofi launcher. It is mapped to `Super + Space`.

![Wofi launcher](/images/blog/arch-linux-hyprland/launcher.png)

Here's a screenshot of the emoji picker in wofi. It is mapped to `Ctrl + Alt + Space`

![Wofi launcher](/images/blog/arch-linux-hyprland/emoji-picker.png)

Here's a screenshot of the clipboard manager in wofi. It is mapped to `Super + Shift + V`. Feature-wise, it's similar to [Flycut in macOS](https://apps.apple.com/us/app/flycut-clipboard-manager/id442160987?mt=12).

![Wofi launcher](/images/blog/arch-linux-hyprland/clipboard-list.png)

## Swaync

[SwayNotificationCenter](https://github.com/ErikReider/SwayNotificationCenter) is my notification manager/sidebar. It can dismiss notifications and has a DND mode out of the box.

## Hypr Ecosystem

Hypr ecosystem is a bunch of optional tools that make the hyprland experience better. I've setup these ecosystem tools.

- [hyprlock](https://github.com/hyprwm/hyprlock): a lockscreen tool
- [hypridle](https://github.com/hyprwm/hypridle): automatically turn screen off and suspend after inactivity
- [hyprpaper](https://github.com/hyprwm/hyprpaper): set background wallpaper
- [hyprshot](https://github.com/Gustash/Hyprshot): screenshot tool

Here's a screenshot of the wallpaper set with hyprpaper. It's loaded into the memory when the session starts. This really adds to the look of the tiles.

![Wofi launcher](/images/blog/arch-linux-hyprland/wallpaper.png)

I configured hyprshot to be used in three different ways:
- `Print` key will take a full screen screenshot
- `Shift + Print` will take a screenshot of one window
- `Super + Shift + Print` will take a screenshot of a selected region in the screen

## Custom Hyprland config

In addition to the ecosystem tools I have also set up custom workflows.

- All the tools have been configured with Dracula theme
- `Super + L` and `Super + D` will switch between light and dark modes instantly
- `Ctrl + Super + Enter` will toggle the current active window's state b/w fullscreen and tiled
- Chrome will always open in workspace 2
- Obsidian will always open in workspace 3

## Kitty

[Kitty](https://sw.kovidgoyal.net/kitty/) has been my terminal for a long time now. It's good, fast and configurable. It works well in macOS too.

I spend most of my time in the terminal. Here are some of the tools I use everyday.

- Neovim with [AstroNvim](https://astronvim.com/)
- [Lazygit](https://github.com/jesseduffield/lazygit)
- [zsh](https://ohmyz.sh/) git aliases
- [fzf](https://github.com/junegunn/fzf)

Here's a screenshot of neovim configured with AstroNvim.
![Neovim](/images/blog/arch-linux-hyprland/neovim.png)

Here's a screenshot of fzf which makes working with reverse lookup easy.
![Neovim](/images/blog/arch-linux-hyprland/fzf.png)

## Wrapping up

I think my favourite part about setting up Hyprland is that you end up with a unique setup. That's the beauty of tiling window managers. You start with a blank slate and work your way to things that feel good to you. My fully riced setup is mine, and mine alone. Linux is beautiful. Life is good.