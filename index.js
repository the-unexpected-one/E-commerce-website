const pagination = document.getElementById('pagination')
const cartPagination1=document.getElementById('cartPagination')
console.log(cartPagination1)
window.addEventListener("DOMContentLoaded",()=>   
{  
    const page = 1
   

   axios.get(`http://localhost:3000/products?page=${page}`)
   .then((res)=>{
    console.log(res)
    listproducts(res)
    showPagination(res.data)


        })
      

   
   .catch((err)=>{
       document.body.innerHTML="<h4>Something went wrong<h4>"
       console.log(err)
    })
    
        // let total_cart_price=0;
       axios.get(`http://localhost:3000/cart/?page=${page}`)

       .then(res=>{
        cartItems(res)
        cartPagination(res.data);
//         console.log(res)
// for(let i=0;i<res.data.products.length;i++){
//         const prod=res.data.products[i];
//         const ID='a'+prod.id;
//         const name=prod.title;
//         const price=prod.price;
//         const qty=prod.cartItem.quantity;
//         const img_src=prod.imageUrl;
// // total_cart_price=total_cart_price+price;

//         //  console.log(res.data[1].cartItem.quantity)

//         document.querySelector('.cart-number').innerText = qty;

//         const cart_item = document.createElement('div');
//         cart_item.classList.add('cart-row');
//         cart_item.setAttribute('id',`in-cart-${ID}`);
//         total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
//         total_cart_price = total_cart_price.toFixed(2)
//         document.querySelector('#total-value').innerText = `${total_cart_price}`;
//         cart_item.innerHTML = `
//         <span class='cart-item cart-column'>
//         <img class='cart-img' src="${img_src}" alt="">
//             <span>${name}</span>
//     </span>
//     <span class='cart-price cart-column'>${price}</span>
//     <span class='cart-quantity cart-column'>
//         <input type="text" value="${qty}">
//         <button>REMOVE</button>
//     </span>`
//         cart_items.appendChild(cart_item)
//         cartPagination(res.data)
// }
       }).catch(err=>{
        console.log(err)
       })
})


function cartItems(res){
    console.log(res)
    let total_cart_price=0;
    if(cart_items.innerHTML!=''){
        cart_items.innerHTML=''
    }

    for(let i=0;i<res.data.products.length;i++){
            const prod=res.data.products[i];
            const ID='a'+prod.id;
            const name=prod.title;
            const price=prod.price;
            const qty=prod.cartItem.quantity;
            const img_src=prod.imageUrl;
    // total_cart_price=total_cart_price+price;
    
            //  console.log(res.data[1].cartItem.quantity)
    
            document.querySelector('.cart-number').innerText = qty;
    
            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-row');
            cart_item.setAttribute('id',`in-cart-${ID}`);
            total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
            total_cart_price = total_cart_price.toFixed(2)
            document.querySelector('#total-value').innerText = `${total_cart_price}`;
            cart_item.innerHTML = `
            <span class='cart-item cart-column'>
            <img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span>
        </span>
        <span class='cart-price cart-column'>${price}</span>
        <span class='cart-quantity cart-column'>
            <input type="text" value="${qty}">
            <button>REMOVE</button>
        </span>`
            cart_items.appendChild(cart_item)
            // cartPagination(res.data)
    }
}

const cart_items = document.querySelector('#cart .cart-items');
function cartPagination({
    currentPage,
    hasNextPage, 
    hasPreviousPage,
    lastPage,
    nextPage,
    previousPage
    
    
       }){
        cartPagination1.innerHTML='';
        if (hasPreviousPage) {
            const btn2 = document.createElement('button')
            btn2.innerHTML  = previousPage
            btn2.addEventListener('click',() => getCartProducts(previousPage))
        cartPagination1.appendChild(btn2)
        }
            const btn1 = document.createElement('button')
            btn1.innerHTML  = `<h3>${currentPage}</h3>`
            btn1.addEventListener('click',() => getCartProducts(currentPage))
        cartPagination1.appendChild(btn1)
    
        if (hasNextPage) {
            const btn3 = document.createElement('button')
            btn3.innerHTML  = nextPage
            btn3.addEventListener('click',() => getCartProducts(nextPage))
        cartPagination1.appendChild(btn3)

        }
       }

    function getCartProducts(page){
    axios.get(`http://localhost:3000/cart?page=${page}`)
   .then((res)=>{
    cartItems(res)
    cartPagination(res.data)

    })
    .catch(err => console.log(err))
}

       

function postCartItem(id){
    console.log(id)
    axios.post("http://localhost:3000/cart",
    {productId: id}).then(response=>{
        if(response.status===200){
            notifyUsers(response.data.message);
        }
    }).catch(err=>{
        console.log(err)
        //  notifyUsers(err.data.message)
    })
}

function notifyUsers(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}



const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        console.log(`#${id}`);
        
        const name = document.querySelector(`#${id} h3`).innerText;
        

        const img_src = document.querySelector(`#${id} img`).src;
        

        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
       
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`
        cart_items.appendChild(cart_item)

    //     const container = document.getElementById('container');
    //     const notification = document.createElement('div');
    //     notification.classList.add('notification');
    //     notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
    //     container.appendChild(notification);
    //     setTimeout(()=>{
    //         notification.remove();
    //     },2500)
    } 
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }

    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

function showPagination({
    currentPage,
    hasNextPage, 
    hasPreviousPage,
    lastPage,
    nextPage,
    previousPage
    
    
       }) {
        
        pagination.innerHTML = ``

        if (hasPreviousPage) {
            const btn2 = document.createElement('button')
            btn2.innerHTML  = previousPage
            btn2.addEventListener('click',() => getProducts(previousPage))
        pagination.appendChild(btn2)
        }
            const btn1 = document.createElement('button')
            btn1.innerHTML  = `<h3>${currentPage}</h3>`
            btn1.addEventListener('click',() => getProducts(currentPage))
        pagination.appendChild(btn1)
    
        if (hasNextPage) {
            const btn3 = document.createElement('button')
            btn3.innerHTML  = nextPage
            btn3.addEventListener('click',() => getProducts(nextPage))
        pagination.appendChild(btn3)
    
        
    
    
    
       }
    }



    function getProducts(page){
    axios.get(`http://localhost:3000/products?page=${page}`)
   .then((res)=>{
    listproducts(res)
    showPagination(res.data)

    })
    .catch(err => console.log(err))
}

    function listproducts(res){
        
    const song = document.getElementById("music-content")
    if(song.innerHTML!=""){
        song.innerHTML=''
    }
    
        
    console.log(res.data.products[0])
    for(let i=0;i<res.data.products.length;i++){
        let info= res.data.products[i]
    const ID = info.id
    const name = info.title
    const price = info.price
    const img_url = info.imageUrl
    
    const listen = document.createElement('div')
 
    listen.setAttribute("id",`a${ID}`)
    console.log(listen)
    console.log(img_url)
    
    listen.innerHTML  = 
    
    `<h3> ${name}</h3>
    <div class="image-container">
        <img class="prod-images" src="${img_url}"
        alt="">
    </div>
    <div class="prod-details">
        
         <span>$<span>${price}  </span></span>
       
        <button class="shop-item-button" type="button" onClick="postCartItem('${ID}')">ADD TO CART</button>
    
        
    </div>
 
 </div>`
 song.appendChild(listen)
    }
}