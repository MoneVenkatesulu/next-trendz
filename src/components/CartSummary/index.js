// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {selectedPayment: '', orderedPlaced: false}

  onClickCashPayment = () => this.setState({selectedPayment: 'cash'})

  onConfirmOrder = () => this.setState({orderedPlaced: true})

  render() {
    const {selectedPayment, orderedPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalAmount = 0
          cartList.forEach(eachItem => {
            totalAmount += eachItem.price * eachItem.quantity
          })

          const itemsCount = cartList.length

          return (
            <div className="summary-container">
              <div>
                <h4 className="order-total-text">{`Order Total: RS ${totalAmount}/-`}</h4>
                <p>{`${itemsCount} items in cart`}</p>

                <Popup
                  modal
                  trigger={
                    <button type="button" className="popup-btns">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <div className="checkout-popup-container">
                      {!orderedPlaced && (
                        <div>
                          <div className="popup-payments-container">
                            <input
                              id="payment-card"
                              type="radio"
                              name="checkout-payment"
                              disabled
                              className="checkout-payment-input"
                            />
                            <label
                              htmlFor="payment-card"
                              className="disabled-label"
                            >
                              Credit / Debit / ATM Card
                            </label>
                            <br />
                            <br />
                            <input
                              id="payment-net-banking"
                              type="radio"
                              name="checkout-payment"
                              disabled
                              className="checkout-payment-input"
                            />
                            <label
                              htmlFor="payment-net-banking"
                              className="disabled-label"
                            >
                              Net Banking
                            </label>
                            <br />
                            <br />
                            <input
                              id="payment-upi"
                              type="radio"
                              name="checkout-payment"
                              disabled
                              className="checkout-payment-input"
                            />
                            <label
                              htmlFor="payment-upi"
                              className="disabled-label"
                            >
                              UPI
                            </label>
                            <br />
                            <br />
                            <input
                              id="payment-wallet"
                              type="radio"
                              name="checkout-payment"
                              disabled
                              className="checkout-payment-input"
                            />
                            <label
                              htmlFor="payment-wallet"
                              className="disabled-label"
                            >
                              Wallet
                            </label>
                            <br />
                            <br />
                            <input
                              id="payment-cash"
                              type="radio"
                              name="checkout-payment"
                              className="checkout-payment-input"
                              onClick={this.onClickCashPayment}
                            />
                            <label htmlFor="payment-cash">
                              Cash on Delivery
                            </label>
                          </div>
                          <hr className="hr-line" />
                          <ul className="popup-prices-list">
                            {cartList.map(eachProduct => (
                              <li key={eachProduct.id} className="popup-prices">
                                <p>
                                  {eachProduct.title} ({eachProduct.quantity})
                                </p>
                                <p>
                                  {eachProduct.quantity * eachProduct.price}
                                </p>
                              </li>
                            ))}
                          </ul>
                          <hr className="hr-line" />
                          <div className="popup-prices">
                            <p>Total Amout</p>
                            <p>{totalAmount}</p>
                          </div>
                          <div className="popup-btn-container">
                            <button
                              type="button"
                              className="popup-btns"
                              disabled={selectedPayment !== 'cash'}
                              onClick={this.onConfirmOrder}
                            >
                              Confirm Order
                            </button>
                            <button
                              type="button"
                              className="popup-btns"
                              onClick={close}
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      )}
                      {orderedPlaced && (
                        <div className="ordered-placed-container">
                          <p className="ordered-placed-msg">
                            Your order has been placed successfully
                          </p>
                          <Link to="/products">
                            <button
                              type="button"
                              className="popup-btns"
                              onClick={close}
                            >
                              Continue Shopping
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
