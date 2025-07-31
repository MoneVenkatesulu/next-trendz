// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
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
            <h1>{`Order Total: RS ${totalAmount}/-`}</h1>
            <p>{`${itemsCount} items in cart`}</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
