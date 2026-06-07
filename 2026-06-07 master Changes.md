# 2026-06-07 master Changes

## Branch
master

## Problem
Combined release incorporating two hotfixes:
1. Linked images weren't opening target URLs and weren't persisting on save/reopen
2. Table of contents only expanded/collapsed when clicking the arrow icon, not the entire grey handle bar

## Solution
Merged both hotfix branches:
- **hotfix/image-click**: Modified `ImageView.tsx` and `useVSCodeSync.ts` to handle linked image clicks and persistence
- **hotfix/toc-click**: Added `onHandleClick` handler to `toc-handle` div in `TableOfContents.tsx` to toggle collapse on click anywhere

## Model
nemotron-3-ultra-free (via OpenCode)
