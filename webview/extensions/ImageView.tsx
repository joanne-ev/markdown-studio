import React, { useState, useEffect, useRef, useCallback } from "react";
import { Image } from "@tiptap/extension-image";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { vscodeApi } from "../vscode-api";

function ImageNodeView({ node, updateAttributes, selected }: any) {
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(node.attrs.alt || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCaption(node.attrs.alt || "");
  }, [node.attrs.alt]);

  useEffect(() => {
    setError(false);
  }, [node.attrs.src]);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing]);

  const saveCaption = useCallback(() => {
    updateAttributes({ alt: caption });
    setEditing(false);
  }, [caption, updateAttributes]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    const href = node.attrs.href;
    if (href) {
      e.preventDefault();
      e.stopPropagation();
      vscodeApi.postMessage({ type: "openUrl", url: href });
    }
  }, [node.attrs.href]);

  const imageContent = error ? (
    <div className="image-placeholder">
      <span className="image-placeholder-icon">&#128247;</span>
      <span>Image not found</span>
      <span className="image-placeholder-path">
        {node.attrs.src?.split("/").pop() || "unknown"}
      </span>
    </div>
  ) : (
    <img
      src={node.attrs.src}
      alt={node.attrs.alt || ""}
      title={node.attrs.title || undefined}
      onError={() => setError(true)}
      draggable={false}
    />
  );

  const href = node.attrs.href;
  const renderedImage = href ? (
    <a href={href} onClick={handleImageClick} target="_blank" rel="noopener noreferrer">
      {imageContent}
    </a>
  ) : (
    imageContent
  );

  return (
    <NodeViewWrapper
      className={"image-block" + (selected ? " selected" : "")}
      data-drag-handle=""
    >
      <figure>
        {renderedImage}
        <figcaption onClick={() => setEditing(true)}>
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              className="image-caption-input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onBlur={saveCaption}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  e.preventDefault();
                  saveCaption();
                }
              }}
              placeholder=""
            />
          ) : (
            <span className="image-caption-text">
              {node.attrs.alt || ""}
            </span>
          )}
        </figcaption>
      </figure>
    </NodeViewWrapper>
  );
}

export const ImageBlock = Image.extend({
  // Force block-level so images aren't inline
  inline: false,
  group: "block",

  addAttributes() {
    return {
      ...this.parent?.(),
      href: {
        default: null,
        parseHTML: (element) => {
          const link = element.closest("a");
          return link?.getAttribute("href") || null;
        },
        renderHTML: (attributes) => {
          if (attributes.href) {
            return { href: attributes.href };
          }
          return {};
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});
