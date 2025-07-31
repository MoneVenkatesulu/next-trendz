import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    document.title = 'Nxt Trendz | ecommerce-application'
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isAddedToCart = cartList.find(eachItem => eachItem.id === product.id)
    if (isAddedToCart === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id, product.quantity)
    }
  }

  incrementCartItemQuantity = (itemId, quantity = 1) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === itemId) {
          return {...eachItem, quantity: eachItem.quantity + quantity}
        }
        return {...eachItem}
      }),
    }))
  }

  decrementCartItemQuantity = (itemId, quantity) => {
    if (quantity === 1) {
      this.removeCartItem(itemId)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === itemId) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return {...eachItem}
        }),
      }))
    }
  }

  removeCartItem = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== itemId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
