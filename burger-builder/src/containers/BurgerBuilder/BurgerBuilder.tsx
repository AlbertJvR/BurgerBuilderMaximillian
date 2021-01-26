import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

type Ingredients = { salad: number, bacon: number, cheese: number, meat: number }

const INGREDIENT_PRICES: Ingredients = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component<any, any> {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        } as Ingredients,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentWillMount() {
        axios.get('https://react-http-87092.firebaseio.com/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            });
    }

    updatePurchaseState = (ingredients: Ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key as keyof Ingredients]
            })
            .reduce((sum: number, el: number) => {
                return sum + el;
            }, 0)

        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type: string) => {
        const oldCount = this.state.ingredients[type as keyof Ingredients];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type as keyof Ingredients] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type as keyof Ingredients];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type: string) => {
        const oldCount = this.state.ingredients[type as keyof Ingredients];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type as keyof Ingredients] = oldCount >= 1 ? oldCount - 1 : 0;

        const priceDeduction = INGREDIENT_PRICES[type as keyof Ingredients];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice >= 4 ? newPrice : 4,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = (newState: boolean) => {
        this.setState({ purchasing: newState });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = async () => {

        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i as keyof Ingredients])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`);

        const queryString = '?' + queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render() {
        const disabledInfo: any = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if (this.state.ingredients) {
            burger = <Fragment>
                <Burger ingredients={ this.state.ingredients }/>
                <BuildControls
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledInfo }
                    ordered={ this.purchaseHandler }
                    price={ this.state.totalPrice }
                    purchaseable={ this.state.purchaseable }
                />;
            </Fragment>

            orderSummary = <OrderSummary
                ingredients={ this.state.ingredients }
                price={ this.state.totalPrice }
                cancelCheckout={ this.purchaseCancelHandler }
                continueCheckout={ this.purchaseContinueHandler }
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Fragment>
                <Modal
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </Fragment>
        );
    }
}

export default BurgerBuilder;