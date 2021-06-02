import * as log from "loglevel";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip, Position } from "@blueprintjs/core";

import { AppState } from "reducers";
import AnalyticsUtil from "utils/AnalyticsUtil";
import PerformanceTracker from "utils/PerformanceTracker";
import Icon, { IconSize } from "components/ads/Icon";
import { getCurrentApplication } from "selectors/applicationSelectors";
import { Colors } from "constants/Colors";
import Button, { Size } from "components/ads/Button";
import { FormIcons } from "icons/FormIcons";
import { ControlIcons } from "icons/ControlIcons";
import { theme } from "constants/DefaultTheme";

const CopyIcon = ControlIcons.COPY_CONTROL;
const DeleteIcon = FormIcons.DELETE_ICON;

const DragHandler = styled.div`
  cursor: move !important;
  display: flex;
  align-items: center;
`;

/* eslint-disable react/display-name */
function PagesEditor() {
  const currentApp = useSelector(getCurrentApplication);
  const pages = useSelector((state: AppState) => {
    return state.entities.pageList.pages;
  });

  // log page load
  useEffect(() => {
    AnalyticsUtil.logEvent("PAGE_LIST_LOAD", {
      appName: currentApp?.name,
      mode: "EDIT",
    });
  }, []);

  log.debug("Canvas rendered");
  PerformanceTracker.stopTracking();

  const onDragEnd = (result: any) => {
    //
  };

  return (
    <div className="py-6 px-8 bg-appsmith-artboard h-full">
      <div className="flex">
        <Button
          className="t--apiFormRunBtn ml-auto"
          onClick={() => {
            //
          }}
          size={Size.medium}
          tag="button"
          text="New Page"
          type="button"
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-pages-list-${currentApp?.id}`}>
          {(provided) => (
            <div
              className="pt-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {pages.map((page, index) => (
                <Draggable
                  draggableId={page.pageId}
                  index={index}
                  key={page.pageId}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center p-4 mt-2 bg-appsmith-app"
                    >
                      <DragHandler {...provided.dragHandleProps}>
                        {/* drag handler */}
                        <Icon
                          className="opacity-30"
                          fillColor={Colors.BLACK}
                          name="arrow-left"
                          size={IconSize.SMALL}
                        />
                      </DragHandler>
                      <div className="flex-1 pl-2">
                        <p className="text-gray-800">{page.pageName}</p>
                      </div>
                      <Tooltip
                        content="Copy Widget"
                        hoverOpenDelay={200}
                        position={Position.TOP}
                      >
                        <CopyIcon
                          className="t--copy-widget"
                          color={theme.colors.paneSectionLabel}
                          height={14}
                          width={14}
                        />
                      </Tooltip>
                      <div className="ml-3">
                        <DeleteIcon
                          className=""
                          color={theme.colors.paneSectionLabel}
                          height={16}
                          width={16}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default PagesEditor;
