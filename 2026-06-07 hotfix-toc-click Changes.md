# 2026-06-07 hotfix-toc-click Changes

## Branch
hotfix/toc-click

## Problem
Table of contents only expanded/collapsed when clicking the arrow icon specifically, not when clicking anywhere on the grey handle bar.

## Solution
Added `onHandleClick` handler to the `toc-handle` div in `webview/components/TableOfContents.tsx` that toggles the collapsed state when clicking anywhere on the handle bar. The handler respects drag state (won't toggle during drag) and preserves the last open width when expanding.

## Model
nemotron-3-ultra-free (via OpenCode)
