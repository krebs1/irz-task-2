import {IIngredient} from "../../../models/IIngredient";
import React, {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {constructorSlice} from "../../../store/reducers/ConstructorSlice";
import {useDrag, useDrop, DragPreviewImage} from "react-dnd";
import {XYCoord, Identifier} from "dnd-core";
import {itemTypes} from "../../../dndItemTypes/itemTypes";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import Style from "./MainIngredient.module.scss";
import {viewedIngredientSlice} from "../../../store/reducers/ViewedIngredientSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';

interface IProps {
    data: IIngredient,
    index: number,
    classname?: string,
}

interface IDragItem {
    index: number
}

const MainIngredient: FC<IProps> = ({data, index, classname = ''}) => {
    const dispatch = useAppDispatch();
    const {moveIngredient, deleteIngredient} = constructorSlice.actions
    const {toggleModal, setIngredient} = viewedIngredientSlice.actions;

    const ref = useRef<HTMLDivElement>(null);

    const nav = useNavigate();
    const location = useLocation();

    const [{handlerId, canDrop}, drop] = useDrop<IDragItem,
        void,
        { handlerId: Identifier | null, canDrop: any }>({
        accept: itemTypes.ingredientMove,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                canDrop: monitor.canDrop(),
            }
        },
        canDrop() {
            return true
        },
        hover(item: IDragItem, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            if (index !== null) {
                item.index = index;
                dispatch(moveIngredient({dragIndex: dragIndex, hoverIndex: hoverIndex}));
            }
        },
        drop(item: IDragItem) {

        }
    }, [index])
    const [{isDragging}, drag, dragPreview] = useDrag({
        type: itemTypes.ingredientMove,
        item: () => {
            return {index: index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drop(ref);

    return (
                    <div className={`${Style.MainIngredient} ${classname}`}
                         style={{
                             opacity: isDragging ? 0.5 : 1,
                         }}
                         ref={ref}
                         data-handler-id={handlerId}
                         onClick={(e) => {
                             const target = e.target as HTMLElement;
                             if (target.closest(`.${Style.MainIngredient}`) && !target.closest(".constructor-element__action")) {
                                 nav(`ingredients/${data._id}`, {replace: true, state: {background: location}});
                             }
                         }}
                    >
                        <DragPreviewImage connect={dragPreview} src={data.image}/>
                        <div className={`${Style.MainIngredient_dragIcon}`}
                             ref={drag}
                        >
                            <DragIcon type="primary"/>
                        </div>
                        <div className='pl-2'></div>
                        <ConstructorElement
                            text={data.name}
                            price={data.price}
                            thumbnail={data.image}
                            extraClass={`${isDragging ? Style.MainIngredient_dragging : ''} ${canDrop ? Style.MainIngredient_canDrop : ''}`}
                            handleClose={() => {
                                dispatch(deleteIngredient(index));
                            }}
                        />
                    </div>
    );
};

export default MainIngredient;