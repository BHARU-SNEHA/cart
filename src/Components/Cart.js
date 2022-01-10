import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Cart({ products, setList }) {

    const [addedProducts, setProducts] = useState([]);
    const [list, setSelected] = useState(products);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let temptotal = 0
        let temp = [...list]
        let selected = [];
        temp.forEach((item) => {
            if (item.quantity >= 1) {
                selected.push(item);
                temptotal = temptotal + item.amount
            }
        })

        setTotal(temptotal)
        setProducts(selected);

    }, [products]);

    function orderedItems() {

        let orderedProd = [...addedProducts];
        let order = { total: total, Orders: [] };

        orderedProd.forEach((orders) => {
            let Orders = {}

            Orders.ProductName = orders.name;
            Orders.Price = orders.price;
            Orders.Quantity = orders.quantity;
            Orders.subTotal = orders.amount;
            order.Orders.push(Orders);



        })
        axios.post('https://janam.free.beeceptor.com', order)
            .then((res) => {
                console.log(res.code)
            })
    }


    function deleteItem(item) {
        let temp = [...list];
        temp.forEach((b, index) => {
            if (b.id == item.id) {
                b.product_stock = b.product_stock + b.quantity;
                b.amount = 0;
                b.quantity = 0;



            }
        })
        setList(temp);

    }
    return (
        <>
            {addedProducts.length > 0 &&
                <div className='cart_main_div'>
                    <h1>Cart</h1>
                    <div>
                        <div className='displayOrdered1'>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Amount</p>
                            <p>Delete</p>


                        </div>

                        {
                            addedProducts.map((item, index) => {
                                return (

                                    <div className='displayOrdered' key={index}>
                                        <p>{item.name}</p>
                                        <p>{item.quantity}</p>
                                        <p>{item.price}</p>
                                        <p><FontAwesomeIcon icon={faTrashAlt} onClick={() => { deleteItem(item) }}/></p>

                                    </div>

                                )
                            })
                        }
                        {total > 0 ?
                            <button style={{width:'100%'}} className='btn btn-danger' onClick={() => {
                                orderedItems();
                            }}>Pay {total == 0 ? '' : total}
                            </button> : ''}


                    </div>
                </div>
            }
        </>
    )
}

export default Cart
