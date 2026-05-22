// ─── Keyboard Shortcuts Hook ──────────────────────────────────────

import { useEffect } from "react";
import { useStudioStore } from "@/store/useStudioStore";

export function useKeyboardShortcuts() {
  const {
    togglePlayback,
    triggerSave,
    deleteNode,
    selectedNodeId,
    toggleSidebar,
    startPreview,
    resetPreview,
    isPreviewMode,
  } = useStudioStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Don't trigger shortcuts when typing in inputs
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Space → Play/Pause
      if (e.code === "Space" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        togglePlayback();
      }

      // Ctrl+S → Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        triggerSave();
      }

      // Delete / Backspace → Delete selected node
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedNodeId &&
        !isPreviewMode
      ) {
        e.preventDefault();
        deleteNode(selectedNodeId);
      }

      // [ → Toggle sidebar
      if (e.key === "[") {
        toggleSidebar();
      }

      // P → Toggle preview mode
      if (e.key === "p" && !e.ctrlKey && !e.metaKey) {
        if (isPreviewMode) {
          resetPreview();
        } else {
          startPreview();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlayback, triggerSave, deleteNode, selectedNodeId, toggleSidebar, startPreview, resetPreview, isPreviewMode]);
}
