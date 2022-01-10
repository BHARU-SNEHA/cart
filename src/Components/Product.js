import React, { useState, useEffect } from 'react';
import list from '../ProductList/product.json'
import { Card } from 'react-bootstrap';
import Cart from './Cart';
import '../Styles/product.css';



function Product() {

    const [products, setProducts] = useState(list.products)
    const [text, setText] = useState('');
    const [numberOfproducts, setNum] = useState(list.products.length)


    useEffect(() => {
        let filteredList = [];
        let option = list.products;
        option.forEach((b) => {
            if (b.name.toLowerCase().includes(text.toLowerCase())) {
                filteredList.push(b);
            }

        })
        setNum(filteredList.length)
        setProducts(filteredList)
    }, [text])


    function onDecrement(a) {
        let quantityArr = [...products]
        quantityArr.forEach((b) => {
            if (b.id === a.id) {
                if (b.quantity > 0 ) {
                    b.quantity = b.quantity - 1;
                    b.product_stock = b.product_stock + 1;
                    b.amount = b.price * b.quantity;
                }
            }
        })
        setProducts(quantityArr);
    }

    function onIncrement(a) {
        let quantityArr = [...products]
        quantityArr.forEach((b) => {
            if (b.id === a.id && b.product_stock > 0 ) {
                b.product_stock = b.product_stock - 1;
                b.quantity = b.quantity + 1;
                b.amount = b.price * b.quantity;
            }
        })
        setProducts(quantityArr);
    }

    function handleChange(value, a) {
        let quantityArr = [...products]
        quantityArr.forEach((b) => {
            if (b.id === a.id) {
                if (b.quantity > value) {
                    let diff = b.quantity - value;
                    b.product_stock = b.product_stock + diff
                }
                else {
                    let diff = value - b.quantity;
                    b.product_stock = b.product_stock - diff;
                }
                b.quantity = value;

                b.amount = b.price * b.quantity;
            }
        })
        setProducts(quantityArr);
    }


    return (
        <>
        <h1 className='heading'>Products </h1>
        <div className="main_div">
           
            <div className="product_div">
                <div className='input_div'>
                    <input type='text' className='search_div' placeholder='&#x1F50D; Search Products... ' onChange={(e) => {
                        setText(e.target.value);
                    }} />
                    <span>{numberOfproducts} Products</span>
                </div>

                <ul className='product_list'>
                    {
                        products.map((list, key) => {
                            return (
                                <div>
                                    <Card className='card_product' key={key} >
                                        <Card.Body>
                                            <Card.Title style={{ fontWeight: 'bold' }} >{list.name}</Card.Title>
                                            <Card.Text style={{ fontWeight: 'bold' }} className={list.product_stock > 0 ? 'disp_green':'disp_red'}>{list.product_stock <= 0 ? `Out of Stock` :`In Stock ${list.product_stock}`}</Card.Text>
                                            <div className='quantity'>
                                                <p onClick={() => { onDecrement(list) }}>-</p>
                                                <input type='number' value={list.quantity} onChange={(e) => { handleChange(e.target.value, list) }} />
                                                <p onClick={() => { onIncrement(list) }}>+</p>
                                            </div>
                                            <p className='amount'>{`Price : $${list.price} `}</p>
                                            <p className='amount'>{list.product_stock > 0? `Amount : $${list.amount} `:`Amount : 0`}</p>


                                        </Card.Body>
                                    </Card>

                                </div>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="cart_div" >
                <Cart products={products} setList={setProducts} />
            </div>
        </div>
        </>
    )
}

export default Product;
