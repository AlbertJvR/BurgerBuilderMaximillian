import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';

type OrderSummaryProps = {
    cancelCheckout: any,
    continueCheckout: any,
    price: number,
    ingredients: any
}

class OrderSummary extends Component<OrderSummaryProps, any> {
    /*componentDidUpdate() {
        console.log('[OrderSummary] rendered');
    }*/

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
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
                <p><strong>Total Price: { this.props.price.toFixed(2) }</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType={ 'Danger' } clicked={ this.props.cancelCheckout }>CANCEL</Button>
                <Button btnType={ 'Success' } clicked={ this.props.continueCheckout }>CONTINUE</Button>
            </Fragment>
        );
    }
}

export default OrderSummary;