import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decCart, incCart, removeFromCart, clearCart } from './store';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import './cart.css';
import { toast } from 'react-toastify';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponInputRef = useRef();
  const emailRef = useRef();

  const [discountPercent, setDiscountPercent] = useState(10);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [email, setEmail] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const handleApplyCoupon = () => {
    const code = couponInputRef.current.value.trim().toUpperCase();
    setCouponCode(code);

    if (code === 'RAVI10') {
      setCouponDiscount(10);
    } else {
      alert('❌ Invalid Coupon Code');
      setCouponDiscount(0);
      setCouponCode('');
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = (subtotal * discountPercent) / 100;
    const taxed = (subtotal - discount) * 0.005;
    const preCouponTotal = subtotal - discount + taxed;
    const coupon = (preCouponTotal * couponDiscount) / 100;
    const total = preCouponTotal - coupon;
    return { subtotal, discount, taxed, coupon, total };
  };

  const { subtotal, discount, taxed, coupon, total } = calculateTotals();

  const handleCompletePurchase = () => {
    const orderId = `ORD-${Date.now()}`;
    const date = new Date().toLocaleString();

    const templateParams = {
      order_Id: orderId,
      orders: cartItems.map(item => `${item.name} (${item.quantity} × ₹${item.price})`).join(', '),
      shipping: '50',
      tax: taxed.toFixed(2),
      total: total.toFixed(2),
      email: email,
    };

    emailjs
      .send('service_s6863zu', 'template_wc5oigr', templateParams, 'h3V_Jc0BTSZdLlE0T')
      .then(() => console.log('✅ Email sent successfully'))
      .catch(err => console.error('❌ Email sending failed:', err));

    const order = {
      OrderId: orderId,
      DateTime: date,
      items: cartItems,
      finalPrice: total.toFixed(2),
    };

    localStorage.setItem('latestOrder', JSON.stringify(order));
    dispatch(clearCart());
    setThankYouMessage(true);
    setTimeout(() => navigate('/order'), 1500);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img || item.image} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className="cart-buttons">
                      <button onClick={() => dispatch(incCart(item))}>+</button>
                      <button onClick={() => dispatch(decCart(item))} disabled={item.quantity <= 1}>-</button>
                      <button onClick={() => {dispatch(removeFromCart(item));toast.warn('your cart is removed!')}}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: ₹{subtotal.toFixed(2)}</h2>

              <div className="discount-buttons">
                <span>Discount:</span>
                <button onClick={() => setDiscountPercent(10)}>10%</button>
                <button onClick={() => setDiscountPercent(30)}>30%</button>
                <button onClick={() => setDiscountPercent(50)}>50%</button>
              </div>

              <h3>Discount ({discountPercent}%): -₹{discount.toFixed(2)}</h3>
              <h3>Tax (0.5%): +₹{taxed.toFixed(2)}</h3>

              {couponDiscount > 0 && (
                <h3>Coupon ({couponCode}): -₹{coupon.toFixed(2)} ({couponDiscount}%)</h3>
              )}

              <h2>Final Amount: ₹{total.toFixed(2)}</h2>

              <button className="clear-cart" onClick={() => dispatch(clearCart())} disabled={cartItems.length === 0}>
                Clear Cart
              </button>

              <button className="complete-purchase" onClick={handleCompletePurchase}>
                Complete Purchase
              </button>

              <div className="payment-method">
                <h3>Select Payment Method:</h3>
                <button onClick={() => setPaymentMethod('QR')}>QR Code</button>
                <button onClick={() => setPaymentMethod('card')}>Card</button>
              </div>

              {paymentMethod === 'QR' && (
                <div className="qr-section">
                  <h4>Scan QR to pay ₹{total.toFixed(2)}</h4>
                  <QRCode value={`upi://pay?pa=9182866832@axl&pn=RatanStore&am=${total.toFixed(2)}&cu=INR`} />
                  <p>UPI ID: 9182866832@axl</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-section">
                  <h4>Pay ₹{total.toFixed(2)}</h4>
                  <label>Card Number</label>
                  <input type="tel" placeholder="1234 5678 9012 3456" maxLength={19} />
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxLength={5} />
                  <label>CVV</label>
                  <input type="password" placeholder="123" maxLength={3} />
                </div>
              )}

              {thankYouMessage && (
                <h2 style={{ color: 'green' }}>
                  ✅ Thank you for your purchase! Redirecting to Orders...
                </h2>
              )}
            </div>
          </div>

          <div className="coupon-section">
            <input type="text" ref={couponInputRef} placeholder="Enter Coupon Code" />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>

          <div className="email-section">
            <label className="form-label">Enter your Gmail to receive order confirmation:</label>
            <input
              type="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="hemstargk4321@gmail.com"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
