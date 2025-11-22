---
title: Setting Up a Modern Development Environment on Windows
description: A comprehensive guide to configuring PowerShell, package managers, Git, SSH, and Node.js tooling for an efficient development workflow.
slug: setting-up-a-modern-development-environment-on-windows
publishedAt: 2025-11-22
tags: ["Windows", "PowerShell", "Git", "Node.js"]
---

# Setting Up a Modern Development Environment on Windows

A comprehensive guide to configuring PowerShell, package managers, Git, SSH, and Node.js tooling for an efficient development workflow.

---

## Part 1: PowerShell & Package Managers

```powershell
# Create PowerShell profile
New-Item -Path $PROFILE -Type File -Force

# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Install Scoop package manager
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
scoop --version

# Add extras bucket for additional packages
scoop bucket add extras
```

**Why?**

- **PowerShell profile** is your personal configuration file that runs every time you open a terminal — perfect for aliases and shortcuts
- **Execution policy** allows PowerShell to run scripts (disabled by default for security)
- **Scoop** is a clean, user-friendly package manager that installs tools to your user directory without admin rights
- **Extras bucket** adds access to more packages like LazyGit

---

## Part 2: Git & Version Control

```powershell
# Install Git
winget install --id Git.Git -e --source winget
git --version

# Install LazyGit (terminal UI for Git)
scoop install lazygit
```

**Why?**

- **Git** is the industry-standard version control system for tracking code changes
- **winget** is Windows' built-in package manager
- **LazyGit** provides a visual terminal interface for Git — makes staging, committing, branching, and merging much faster and intuitive

---

## Part 3: Node.js Environment

```powershell
# Install FNM (Fast Node Manager)
winget install Schniz.fnm
fnm --version

# View available versions and install Node.js
fnm list-remote
fnm install 24.11.1

# Enable pnpm via Corepack
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

**Why?**

- **FNM** is a blazingly fast Node.js version manager (written in Rust) — lets you install and switch between multiple Node versions instantly
- **Corepack** is Node's built-in tool for managing package managers
- **pnpm** is faster and more disk-efficient than npm, using a shared store for packages

---

## Part 4: SSH Setup for GitHub

```powershell
# Generate SSH key
ssh -V
ssh-keygen -t ed25519 -C "your_email@example.com"

# Configure SSH agent
Get-Service ssh-agent | Select-Object StartType
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent

# Add key to agent
cd ~/.ssh
ssh-add C:\Users\Admin\.ssh/id_ed25519

# Copy public key (add this to GitHub)
cat ~/.ssh/id_ed25519.pub
```

**Adding to GitHub:**
1. Go to **GitHub → Settings → SSH and GPG keys**
2. Click **New SSH key**
3. Paste your public key and save

**Why?**

- **SSH keys** provide secure, passwordless authentication with GitHub
- **ed25519** is a modern, secure encryption algorithm
- **SSH agent** stores your key in memory so you don't re-enter passphrases
- Once set up, you can push/pull without entering credentials

---

## Part 5: PowerShell Profile Customization

```powershell
# Open profile for editing
notepad $PROFILE
```

**Add this content:**

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
Set-Alias ll Get-ChildItem
Set-Alias lg lazygit
Set-Alias ag antigravity 
function pgh { Set-Location "$HOME\code\github\tannn86" }
```

**Verify your profile:**

```powershell
cat $PROFILE
```

**Apply changes:**

```powershell
. $PROFILE
```

**Why?**

| Config | Purpose |
|--------|---------|
| `fnm env --use-on-cd` | Auto-switches Node.js version when entering project directories |
| `Set-Alias ll` | Short command for listing files (Linux-style) |
| `pgh` | Instantly jump to your GitHub projects folder |
| `lg` | Launch LazyGit with 2 keystrokes |
| `ag` | Open Antigravity editor in current directory |

---

## Quick Reference

| Tool | Command | Purpose |
|------|---------|---------|
| Scoop | `scoop install <pkg>` | Install packages |
| Git | `git --version` | Version control |
| LazyGit | `lg` | Visual Git UI |
| FNM | `fnm use <version>` | Switch Node versions |
| pnpm | `pnpm install` | Package management |

---

## Conclusion

Your Windows development environment now includes:

- ✅ **Scoop & winget** — Package managers
- ✅ **Git & LazyGit** — Version control
- ✅ **FNM & Node.js** — JavaScript runtime
- ✅ **SSH keys** — Secure GitHub authentication
- ✅ **pnpm** — Fast package management
- ✅ **Custom shortcuts** — Productivity boosters

Happy coding! 🚀