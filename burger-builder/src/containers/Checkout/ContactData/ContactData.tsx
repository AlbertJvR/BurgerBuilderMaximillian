import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { AppState } from '../../../store/reducer';

type OrderFormType = {name: any, street: any, zipCode: any, country: any, email: any, deliveryMethod: any};

class ContactData extends Component<any, any> {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        } as OrderFormType,
        loading: false
    }

    orderHandler = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData: any = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier as keyof OrderFormType].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        try {
            const result: {data: {name: string}} = await axios.post('/orders.json', order);
            console.log(`CreatedRecordId: ${result.data.name}`);
            this.setState({loading: false});
            this.props.history.push('/');
        } catch (e) {
            console.log('Shit is broken');
            this.setState({loading: false});
        }
    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier as keyof OrderFormType]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier as keyof OrderFormType] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key as keyof OrderFormType]
            });
        }

        let form = (<Spinner/>);
        if (!this.state.loading) {
            form = <form action="">
                {formElementsArray.map((formElement: any) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event: React.ChangeEvent<HTMLInputElement>) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >ORDER</Button>
            </form>;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);