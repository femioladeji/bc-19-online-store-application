$(document).ready(function() {
  var myGlobal = new MyGlobal();
  $('a').click(function(event) {
    event.preventDefault();
    myGlobal.renderPage($(this).attr('href'));
  })

  $('#page-inner').delegate('.action', 'click', function() {
    var responseDom = $(this).parents('.modal-footer').siblings('.modal-body').find('.message');
    if($(this).attr('id') == 'createstore') {
      var formFieldIds = ['storename', 'contact', 'address', 'description'];
      var data = myGlobal.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').addClass('label-danger');
      else {
        var apiresponse = myGlobal.customAjax('POST', data, '/api/store', $(this));
        apiresponse.done(function(reply) {
          if(reply != undefined) {
            responseDom.text('Shop Creation was successfull').removeClass('label-danger').addClass('label-success');
            $('#storemodal').modal('hide');
            setTimeout(function() {
              myGlobal.renderPage('/stores');
            }, 500);
          } else {
            responseDom.text('An error occurred, please try again').removeClass('label-success').addClass('label-danger');
          }
          
        })
      }
    } else if($(this).attr('id') == 'createproduct') {
      var formFieldIds = ['product_name', 'product_desc', 'price', 'stores_id'];
      var data = myGlobal.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').addClass('label-danger');
      else {
        var formdata = new FormData()
        formdata.append('product_image', $('#productimage')[0].files[0]);
        data.forEach(function(i, each) {
          formdata.append(each, data[each]);
        })
        var apiresponse = myGlobal.advanceAjax(formdata, '/api/product', $(this));
        apiresponse.done(function(reply) {
          console.log(reply);
        })
      }
    }
  })
  
})