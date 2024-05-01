import React from "react";
import { BlockWrapper } from "./Wrapper";
import { Draggable } from "@/components/dnd/Draggable";
import { useBlockDrag } from "@/components/context/PostDragProvider";
const ImageBlock = () => {
  return (
    <>
      <Draggable id="draggable-block-image">
        <BlockWrapper>
          <h1 className="text-2xl font-bold">{"<Image / >"}</h1>
        </BlockWrapper>
      </Draggable>
    </>
  );
};

export default ImageBlock;
