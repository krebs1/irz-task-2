import {IIngredient} from "../../../models/IIngredient";
import React, {FC, useRef, useState} from "react";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {constructorSlice} from "../../../store/reducers/ConstructorSlice";
import {useDrag, useDrop} from "react-dnd";
import {XYCoord, Identifier} from "dnd-core";
import {itemTypes} from "../../../dndItemTypes/itemTypes";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import Style from "./MainIngredient.module.scss";
import IngredientDetails from "../../Modals/IngredientDetailsModal/IngredientDetails";


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

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    const [{isDragging}, drag] = useDrag({
        type: itemTypes.ingredientMove,
        item: () => {
            return {index: index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{handlerId}, drop] = useDrop<IDragItem,
        void,
        { handlerId: Identifier | null }>({
        accept: itemTypes.ingredientMove,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
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

            dispatch(moveIngredient({dragIndex: dragIndex, hoverIndex: hoverIndex}));
            item.index = hoverIndex;
        },
        drop(item: IDragItem) {

        }
    }, [])

    drop(ref);

    return (
        <>
            <div className={`${Style.MainIngredient} ${classname}`}
                 ref={ref}
                 onClick={()=>setModalOpened(true)}
            >
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
                    handleClose={()=>{
                        dispatch(deleteIngredient(index))
                    }}
                />

            </div>
            <IngredientDetails isOpened={modalOpened}
                               onModalClose={()=>setModalOpened(false)}
                               data={data}
            />
        </>

    );
};

export default MainIngredient;