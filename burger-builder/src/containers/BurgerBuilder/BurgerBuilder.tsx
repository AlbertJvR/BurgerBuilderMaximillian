import React, { Component, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { AppState, Ingredients } from '../../store/reducer';
import { Dispatch } from 'redux';
import { ActionType } from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component<any, any> {
    state = {
        purchasing: false,
        loading: false
    }

    //componentWillMount() {
        /*axios.get('https://react-http-87092.firebaseio.com/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            });*/
    //}

    updatePurchaseState = (ingredients: Ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key as keyof Ingredients]
            })
            .reduce((sum: number, el: number) => {
                return sum + el;
            }, 0)

        return sum > 0;
    }

    purchaseHandler = (newState: boolean) => {
        this.setState({purchasing: newState});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = async () => {
        /*const queryParams = [];

        for (let i in this.props.ings) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ings[i as keyof Ingredients])}`);
        }
        queryParams.push(`price=${this.props.total}`);

        const queryString = '?' + queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });*/
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo: any = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if (this.props.ings) {
            burger = <Fragment>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    price={this.props.total}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                />;
            </Fragment>

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.total}
                cancelCheckout={this.purchaseCancelHandler}
                continueCheckout={this.purchaseContinueHandler}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        ings: state.ingredients,
        total: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onIngredientAdded: (ingredientName: string) => dispatch({
            type: ActionType.AddIngredient,
            ingredientName: ingredientName
        }),
        onIngredientRemoved: (ingredientName: string) => dispatch({
            type: ActionType.RemoveIngredient,
            ingredientName: ingredientName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);