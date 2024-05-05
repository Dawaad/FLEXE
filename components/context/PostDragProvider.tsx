"use client";

import {
  Active,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  Over,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import React, { createContext, useState } from "react";
import { usePostCreator } from "./PostCreatorProvider";
import BlockPreview from "../creator/blocks/BlockPreview";
import { BlockID } from "../creator/blocks/Blocks";

import { nanoid } from "nanoid";
import { images } from "@/lib/placeholder";
import { PostContentBlock } from "@/lib/interface";
import { TextContent } from "../creator/content/TextContent";
import { SubTitleContent } from "../creator/content/SubTitleContent";
import { TitleContent } from "../creator/content/TitleContent";
import { ImageContent } from "../creator/content/ImageContent";

interface PostDragProviderState {
  activeDragID: UniqueIdentifier | null;
  setActiveDragID: React.Dispatch<
    React.SetStateAction<UniqueIdentifier | null>
  >;
}

const initialState: PostDragProviderState = {
  activeDragID: null,
  setActiveDragID: () => {},
};

export const PostDragContext =
  createContext<PostDragProviderState>(initialState);

export const PostDragProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeDragID, setActiveDragID] = useState<UniqueIdentifier | null>(
    null
  );

  const { document, setDocument, onDelete } = usePostCreator();
  const [originalDocumentState, setOriginalDocumentState] = useState<
    PostContentBlock[] | undefined
  >();
  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragID(e.active.id);
    setOriginalDocumentState(document);
  };

  const RenderedItem: Record<BlockID, PostContentBlock> = {
    "draggable-block-title": {
      id: `draggable-content-title-${nanoid()}`,
      value: "Title",
      content: TitleContent,
    },
    "draggable-block-subtitle": {
      id: `draggable-content-subtitle-${nanoid()}`,
      value: "Sub-Title",
      content: SubTitleContent,
    },
    "draggable-block-text": {
      id: `draggable-content-text-${nanoid()}`,
      value: "Text",
      content: TextContent,
    },
    "draggable-block-image": {
      id: `draggable-content-image-${nanoid()}`,
      value: images[0].src as string,
      content: ImageContent,
    },
    "draggable-block-video": {
      id: `draggable-content-video-${nanoid()}`,
      value: images[0].src as string,
      content: ImageContent,
    },
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveDragID(null);
      setDocument(originalDocumentState!);
      return;
    }
    // Handle In Container Manipulation
    if (
      (active.id as string).includes("draggable-content") &&
      (over.id as string).includes("draggable-content")
    ) {
      const activeIndex = document.findIndex((doc) => doc.id === active.id);
      const overIndex = document.findIndex((doc) => doc.id === over.id);
      if (activeIndex === -1 || overIndex === -1) return;
      setDocument((prev) => arrayMove(prev, activeIndex, overIndex));
      return;
    }

    if (
      (active.id as string).includes("draggable-block") &&
      (over.id as string).includes("draggable-content")
    ) {
      const newBlock = document.findIndex(
        (doc) => doc.id === "draggable-content-new-block"
      );
      if (newBlock === -1) return;
      //Insert new content block based on insertion
      setDocument((prev) => [
        ...prev.slice(0, newBlock),
        RenderedItem[active.id as BlockID],
        ...prev.slice(newBlock + 1, prev.length),
      ]);
    }
    setActiveDragID(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    //Handle In Container Manipulation
    if (
      (active.id as string).includes("draggable-block") &&
      (over.id as string).includes("draggable-content")
    ) {
      const newContentBlock: PostContentBlock = {
        id: "draggable-content-new-block",
        value: "",
        content: BlockPreview,
      };
      setDocument((items) => {
        const overIndex = items.findIndex((doc) => doc.id === over.id);
        let newIndex: number;
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : items.length + 1;
        return [
          ...items
            .slice(0, newIndex)
            .filter((item) => item.id !== "draggable-content-new-block"),
          newContentBlock,
          ...items
            .slice(newIndex, items.length)
            .filter((item) => item.id !== "draggable-content-new-block"),
        ];
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <PostDragContext.Provider
      value={{
        activeDragID,
        setActiveDragID,
      }}
    >
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={
          activeDragID && (activeDragID as string).includes("draggable-content")
            ? closestCenter
            : undefined
        }
      >
        {children}
      </DndContext>
    </PostDragContext.Provider>
  );
};

export const useBlockDrag = () => {
  const context = React.useContext(PostDragContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
