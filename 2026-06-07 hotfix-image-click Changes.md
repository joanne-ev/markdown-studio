# 2026-06-07 hotfix-image-click Changes

## Branch
hotfix/image-click

## Problem
Linked images weren't opening target URLs when clicked, and linked image state wasn't persisting on save/reopen.

## Solution
Modified `webview/extensions/ImageView.tsx` to handle click events on linked images and open the target URL. Modified `webview/hooks/useVSCodeSync.ts` to preserve linked image data during markdown-HTML round-trips so the link persists on save/reopen.

## Model
nemotron-3-ultra-free (via OpenCode)
