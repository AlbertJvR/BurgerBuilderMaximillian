import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props: any) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey: string) => {
            return (<li key={ igKey }>
                <span
                    style={ { textTransform: 'capitalize' } }>
                        { igKey }
                </span>
            </li>);
        });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p><strong>Total Price: { props.price.toFixed(2) }</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={ 'Danger' } clicked={ props.cancelCheckout }>CANCEL</Button>
            <Button btnType={ 'Success' } clicked={ props.continueCheckout }>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;