"use client";

import { SortableItem, useSortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp, PostUserMedia } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { omit } from "lodash";
import { useDroppable } from "@dnd-kit/core";
import { ImageCarouselVisualEffect } from "./ImageCarouselVisualWrapper";

export const ImageContent = (props: ContentBlockProp) => {
  const { value, style } = props;
  const [vertPos, horizPos] = [style?.alignItems, style?.justifyContent];

  return (
    <SortableItem id={props.id}>
      <ContentWrapper id={props.id} type="image">
        <div
          className="flex w-full p-4"
          style={{ justifyContent: horizPos, alignItems: vertPos }}
        >
          <ImageCarouselVisualEffect id={props.id}>
            <div
              style={omit(style, ["justifyContent", "alignItems"])}
              className={`w-fit flex relative aspect-[4/3] transition-opacity  overflow-hidden`}
            >
              {value ? (
                <Image
                  width={(value as PostUserMedia).content.width}
                  height={(value as PostUserMedia).content.height}
                  src={(value as PostUserMedia).content.location}
                  alt={(value as PostUserMedia).file.name}
                />
              ) : (
                <DefaultContent />
              )}
            </div>
          </ImageCarouselVisualEffect>
        </div>
      </ContentWrapper>
    </SortableItem>
  );
};

const DefaultContent = () => {
  //todo: give user ability to upload a picture or select from sidebar
  return (
    <div className="max-w-2xl flex justify-center items-center">
      <PhotoIcon className="w-36 h-36" />
      <h2>Add an Image Here</h2>
    </div>
  );
};
