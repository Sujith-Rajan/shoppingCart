function addToCartAjax(productId){
    console.log(productId)
    $.ajax({
        url:'/addToCart/'+productId,
        method:'get',
        success:(response) =>{
            if(response.status){
                let count =$('#cart-count').html()
                count =parseInt(count)+1
                $('#cart-count').html(count)
            }
            //  alert(response)
        }
    })
}