import { useSortable } from '@dnd-kit/sortable';
import React from 'react'
import { CSS } from '@dnd-kit/utilities';
const ExcerciseElement = ({ isRest, exe }) => {

    const { name, id } = exe
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    var patron = /\bscaleX\(\s*[\d.]+\s*\)\s*/g;

    const stylesWithNoScaleX = CSS.Transform.toString(transform)?.replace(patron, '')

    const style = {
        transform: stylesWithNoScaleX,
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            className={`${isRest ? 'bg-slate-400' : 'bg-slate-300'} px-2 py-1 rounded-sm min-w-[75px] text-center`}
            style={style}
            {...attributes} {...listeners}
        >
            {name}
        </div>
    )
}

export default ExcerciseElement