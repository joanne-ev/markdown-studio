# 2026-06-07 master Changes

## Branch
master

## Problem
Combined release incorporating three hotfixes:
1. Linked images weren't opening target URLs and weren't persisting on save/reopen
2. Table of contents only expanded/collapsed when clicking the arrow icon, not the entire grey handle bar
3. Tables had variable column widths based on content — each column sized to its own longest cell, resulting in uneven, hard-to-read tables

## Solution
Merged three hotfix branches:
- **hotfix/image-click**: Modified `ImageView.tsx` and `useVSCodeSync.ts` to handle linked image clicks and persistence
- **hotfix/toc-click**: Added `onHandleClick` handler to `toc-handle` div in `TableOfContents.tsx` to toggle collapse on click anywhere
- **hotfix/table-fix-width**: 
  1. **Visual (CSS)**: Added `table-layout: fixed` to `.tiptap-editor table` in `webview/styles/editor.css` — forces all columns to equal width (100% / column count) in the editor
  2. **Serialization (markdown.config.ts)**: Modified `padTables()` to compute a **single global max width** across ALL columns, then pad every column to that width. This ensures the saved markdown matches the equal-width visual rendering

## Model
nemotron-3-ultra-free (via OpenCode)
