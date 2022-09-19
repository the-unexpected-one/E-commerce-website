window.addEventListener("DOMContentLoaded",()=>{
    let orderList=document.getElementById('orderList')
    axios.get('http://localhost:3000/orders')
    .then(res=>{
        for(let i=0;i<res.data.ordersinfo.length;i++){
            let orderId=res.data.ordersinfo[i].order.id;
            console.log(res.data    )
           let a=document.createElement('div') 
         a.setAttribute('id',`${orderId}`)
         let b=document.createElement('h5');
         b.innerHTML=`${orderId}`
         a.appendChild(b)
            console.log(a)
            res.data.ordersinfo[i].order;
            for(let j=0;j<res.data.ordersinfo[i].products.length;j++){

                let prodDiv=document.createElement('div'); 
                prodDiv.setAttribute('id',`${res.data.ordersinfo[i].products[j].id}`)

                let req=res.data.ordersinfo[i].products[j]
                // console.log(prodDiv)
                let prod=document.createElement('h6');
                prodDiv.appendChild(prod)
                // console.log(req.order.quantity)
                prod.innerHTML=`name:${req.title}-price:${req.price}-productId:${req.orderItem.productId}-Qty:${req.orderItem.quantity}`

                b.appendChild(prodDiv)
                orderList.appendChild(prodDiv)
            }
        }
        console.log(res.data.ordersinfo)
        
    }).catch(err=>{
        console.log(err)
    })
})