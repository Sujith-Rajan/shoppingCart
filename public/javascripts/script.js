function addToCart(proId){
    $.ajax({
        url:'/add-to-cart/'+proId,
        method:'get',
        success:(response)=>{
            if(response.status){
                let count=$('#cart-count').html()
                count=parseInt(count)+1
                $("#cart-count").html(count)
            }
           
        }
    })
}
//reomve items from cart
// function removeCartItem(cartId,productId){
//     $.ajax({
//         url:'//remove-item',
//         data:{
//             cart:cartId,
//             product:productId,
            
//         },
//         method:'post',
//         success:(response) =>{
//             if(response.removeProduct){
//            return confirm("Product Removed from the Cart")
//        location.reload()
          
//         }
//     }
//     })
// }