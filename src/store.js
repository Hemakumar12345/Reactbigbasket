import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage first
const savedCart = localStorage.getItem("cart");
const localStorageCart = savedCart ? JSON.parse(savedCart) : [];

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 2.0, image: '/images/tomato.jpg' },
      { name: 'potato', price: 100.8, image: '/images/potato.jpg' },
      { name: 'Onion', price: 150.0, image: '/images/onion.jpg' },
      { name: 'Carrot', price: 180.0, image: '/images/carrot.jpg' },
      { name: 'Cabbage', price: 90.5, image: '/images/cabbage.jpg' },
      { name: 'Spinach', price: 75.0, image: '/images/spinach.jpg' },
      { name: 'Cauliflower', price: 130.0, image: '/images/cauliflower.jpg' },
      { name: 'Broccoli', price: 200.0, image: '/images/broccoli.jpg' },
      { name: 'Beetroot', price: 110.0, image: '/images/beetroot.jpg' },
      { name: 'Bell Pepper', price: 160.0, image: '/images/bellpepper.jpg' }
    ],
    nonVeg: [
      { name: 'Chicken', price: 800.0, image: '/images/chicken.jpg' },
      { name: 'Fish', price: 1000.0, image: '/images/Fish.jpg' },
      { name: 'Mutton', price: 1200.0, image: '/images/mutton1.jpg' },
      { name: 'Prawns', price: 950.0, image: '/images/prawns1.jpg' },
      { name: 'Eggs', price: 120.0, image: '/images/eggs.jpg' },
      { name: 'Crab', price: 1050.0, image: '/images/crab.jpg' },
      { name: 'Turkey', price: 1500.0, image: '/images/turkey.jpg' },
      { name: 'Duck', price: 1300.0, image: '/images/duck.jpg' },
      { name: 'Lobster', price: 1800.0, image: '/images/lobster.jpg' },
      { name: 'Squid', price: 700.0, image: '/images/squid.jpg' }
    ]
  }
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorageCart,//[]
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incCart: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decCart: (state, action) => {
      const itemIndex = state.findIndex(item => item.name === action.payload.name);
      if (itemIndex !== -1) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.name !== action.payload.name);
    },
    clearCart: () => {
      return [];
    }
  }
});


//create userSlice

// const userSlice=createSlice({
//   name:'users',
//   initialState:{
//     users:[],
//     isAuthenticated:false,
//     currentUser:null
//   },

//    reducers: {
//     registerUser:(state,action)=>{
//       state.users.push(action.payload);
//     },

//  LoginUser:(state.action)=>{


//       const foundUser=state.users.find(
//         user=>user.username===action.payload.username&& user.password===action.payload.password
//       );

//       if(foundUser){
//         state.isAuthenticated=true;
//         state.currentUser=foundUser;
//       }
//       else{
//         alert("Invalid credentials");
//       }
//     },
//     LogOut:(state)=>{
//       state.isAuthenticated=false;
//       state.currentUser=null;
//     }
//   }
// });



const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null
  },

  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },

    LoginUser: (state, action) => {
      const foundUser = state.users.find(
        user =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (foundUser) {
        state.isAuthenticated = true;
        state.currentUser = foundUser;
      } else {
        alert("Invalid credentials");
      }
    },

    LogOut: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
});



// Store configuration
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,

    users:userSlice.reducer
  }
});

// Save cart data to localStorage whenever store updates
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

// Exports
export const { addToCart, incCart, decCart, removeFromCart, clearCart } = cartSlice.actions;
export const { registerUser,LoginUser,LogOut } = userSlice.actions;
export default store;
