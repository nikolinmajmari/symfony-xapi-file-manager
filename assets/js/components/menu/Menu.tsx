import React, { Children, RefObject } from "react";
import { motion } from "framer-motion";
import { useHover, useLayer, useMousePositionAsTrigger } from "react-laag";
import { Options } from "react-laag/dist/types";
import { any } from "prop-types";

const menuItem = {
    key:"item-1",
    text: "Item 1",
    onCLick:()=>1,
    items:[
        {key:"item-1-1",text:"item 1.1"}
    ]
};

const baseOptions:Options = {
    overflowContainer: true,
    auto: true,
    snap: true,
    placement: "right-start",
    possiblePlacements: ["right-start", "left-start"],
    triggerOffset: 8,
    containerOffset: 16,
    arrowOffset: 8,
    isOpen: false
}


export function ContextMenu({items,children}:any){
    const {
        hasMousePosition,
        resetMousePosition,
        handleMouseEvent,
        trigger
    } = useMousePositionAsTrigger();
    const {
        renderLayer,layerProps
    } = useLayer( {...baseOptions, isOpen:hasMousePosition,
        onOutsideClick:resetMousePosition,
        trigger});

    return (
        <div onContextMenu={handleMouseEvent}>
            {hasMousePosition && renderLayer(
                <ul className="menu" {...layerProps}>
                    {renderItems(items(resetMousePosition))}
                </ul>
            )}
            {children}
        </div>
    );
}


function renderItems(items:any){
    return items.map((item:any)=>{
        if(item.items){
            return <NestedMenuItem/>
        }
        return (
            <li key={item.key} className="menu-item">
                {item.next}
            </li>
        );
    })
}

function NestedMenuItem({item}:any){
    const [isOpen,hoverProps,close] = useHover({
        delayEnter:0,
        delayLeave:100,
    });
    const { renderLayer, triggerProps, layerProps } = useLayer({
        ...baseOptions, // the base-options we defined earlier
        isOpen, // tell whether the user is hovering this item
    
        // this is an important one: when the root-menu closes, we want all nested
        // menu's to close as well. Therefore, we can utilize this `onParentClose` props
        // to instruct `useHover` in this case to force-close possible nested menu's
        onParentClose: close
      });
    // Notice how we're reusing `renderItems` -> recursion :)
  // Also we're not only providing `hoverProps` to the menu-item (trigger), but also
  // the menu. Maybe this seems weird at first, but it allows us to have multiple menus open
  // at the same time
  return (
    <>
      <li
        {...hoverProps}
        {...triggerProps}
        className="menu-item"
        onClick={item.onClick}
      >
        {item.text}
      </li>
      {isOpen &&
        renderLayer(
          <ul {...layerProps} {...hoverProps} className="menu">
            {renderItems(item.items)}
          </ul>
        )}
    </>
  );
}