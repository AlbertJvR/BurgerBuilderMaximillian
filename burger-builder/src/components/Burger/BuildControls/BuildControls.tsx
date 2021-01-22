import React from 'react';

import IControlType from '../models/control-type.interface';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls: IControlType[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props: any) => (
    <div className={ styles.BuildControls }>
        <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        { controls.map((ctrl) => (
            <BuildControl
                key={ ctrl.label }
                label={ ctrl.label }
                added={ () => props.ingredientAdded(ctrl.type) }
                removed={ () => props.ingredientRemoved(ctrl.type) }
                disabled={ props.disabled[ctrl.type] }
            />
        )) }
        <button
            className={ styles.OrderButton }
            disabled={ !props.purchaseable }
            onClick={ () => props.ordered(true) }>
            ORDER NOW
        </button>
    </div>
);

export default buildControls;