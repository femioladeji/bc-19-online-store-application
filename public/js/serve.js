$(document).ready(function() {
  var myGlobal = new MyGlobal();
  $('a').click(function(event) {
    event.preventDefault();
    myGlobal.renderPage($(this).attr('href'));
  })

  $('#page-inner').delegate('.action', 'click', function(e) {
    e.preventDefault();
    var responseDom = $(this).parents('.modal-footer').siblings('.modal-body').find('.message');
    var domid = $(this).attr('id');
    if(domid == 'createstore' || domid == 'editstore') {
      var formFieldIds = ['storename', 'contact', 'address', 'description'];
      var data = myGlobal.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').addClass('label-danger');
      else {
        if(domid == 'createstore'){
          var apiresponse = myGlobal.customAjax('POST', data, '/api/store', $(this));
          apiresponse.done(function(reply) {
            if(reply != undefined) {
              responseDom.text('Store Creation was successfull').removeClass('label-danger').addClass('label-success');
              $('#storemodal').modal('hide');
              setTimeout(function() {
                myGlobal.renderPage('/stores');
              }, 500);
            } else {
              responseDom.text('An error occurred, please try again').removeClass('label-success').addClass('label-danger');
            }
            
          })
        } else if(domid == 'editstore') {
          var apiresponse = myGlobal.customAjax('POST', data, '/api/updatestore/'+$(this).attr('storeid'), $(this));
          apiresponse.done(function(reply) {
            if(reply != undefined) {
              responseDom.text('Store successfully updated').removeClass('label-danger').addClass('label-success');
              $('#storemodal').modal('hide');
              setTimeout(function() {
                myGlobal.renderPage('/stores');
              }, 500);
            } else {
              responseDom.text('An error occurred, please try again').removeClass('label-success').addClass('label-danger');
            }
          })
        }
      }
    } else if(domid == 'createproduct') {
      var formFieldIds = ['product_name', 'product_desc', 'price', 'stores_id', 'category_id'];
      var data = myGlobal.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').addClass('label-danger');
      else {
        var formdata = new FormData()
        formdata.append('product_image', $('#productimage')[0].files[0]);
        $.each(data, function(key, value) {
          formdata.append(key, value);
        });
        var apiresponse = myGlobal.advanceAjax(formdata, '/api/product', $(this));
        apiresponse.done(function(reply) {
          if(reply == undefined) {
            responseDom.text('An error occurred, please try again').removeClass('label-success').addClass('label-danger');
          } else {
            if(reply.status == false) {
              responseDom.text('Invalid product image').removeClass('label-success').addClass('label-danger');
            } else {
              responseDom.text('Product Successfully created').removeClass('label-danger').addClass('label-success');
              $('#productmodal').modal('hide');
              setTimeout(function() {
                myGlobal.renderPage('/products');
              }, 500);
            }
          }
        })
      }
    } else if(domid == 'updateuser') {
      var responseDom = $(this).siblings('.message');
      var formFieldIds = ['firstname', 'lastname', 'email', 'password', 'confirmpassword'];
      var data = myGlobal.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').removeClass('label-success').addClass('label-danger');
      else if(data.confirmpassword != data.password) responseDom.text('Passwords do not match').removeClass('label-success').addClass('label-danger');
      else {
        var response = myGlobal.customAjax('POST', data, '/api/updateuser', $(this));
        response.done(function(reply) {
          if(!reply) {
            responseDom.text('This email already exists').removeClass('label-success').addClass('label-danger');
          } else {
            responseDom.text('Profile successfully updated').removeClass('label-danger').addClass('label-success');
            $('.usersname').text(data.firstname+' '+data.lastname);
          }
        })
      }
    } 
  })
  
  $('#page-inner').delegate('.editstore', 'click', function(e) {
    var tdAll = $(this).parents('tr').find('td');
    var fields = {storename:'', address: '', description:'', contact:''}
    var index = 0;
    for(var key in fields) {
      if(key === 'description') {
        $('#'+key).text(tdAll.eq(index).text());
      } else {
        $('#'+key).attr('value', tdAll.eq(index).text());
      }
      $('.create').hide();
      $('.edit').attr('storeid', $(this).attr('id'));
      $('.edit').show();
      index++;
    }
  });
})