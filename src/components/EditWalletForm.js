import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpenseAction, fetchCurrency, fetchQuotation } from '../redux/actions';

class EditWalletForm extends Component {
  state = {
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
    id: 0,
  };

  componentDidMount() {
    const { idToEdit, expenses } = this.props;
    const editingExpense = expenses[idToEdit];
    const { value, description, method, tag, currency, id } = editingExpense;
    this.setState({ value, description, method, tag, currency, id });
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { editExpenseDispatch, expenses, idToEdit } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const xabla = expenses.find((e) => e.id === idToEdit);
    console.log(xabla);
    const index = expenses.indexOf(xabla);

    expenses.splice(index, 1, {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: xabla.exchangeRates,
    });

    console.log(expenses); // 👉️ [ 'z', 'b', 'c' ]

    editExpenseDispatch(expenses);
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor($):
          {' '}
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <textarea
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((e) => (<option key={ e } value={ e }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo de gasto:
          {' '}
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Editar despesa</button>
      </form>
    );
  }
}

EditWalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  quotation: state.wallet.quotation,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrency()),
  quotationDispatch: (state) => dispatch(fetchQuotation(state)),
  editExpenseDispatch: (state) => dispatch(editExpenseAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWalletForm);
