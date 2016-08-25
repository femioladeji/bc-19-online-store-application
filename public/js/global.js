var MyGlobal = function() {

  this.customAjax = function(type, data, url, dom) {
    return $.ajax({
      type:type,
      url:url,
      data:data,
      beforeSend:function() {
        dom.addClass('disabled');
        dom.siblings('.progress').show();
      },
      complete:function() {
        dom.removeClass('disabled');
        dom.siblings('.progress').hide();
      }
    })
  }

  this.getFormData = function(idArray, compulsoryFields) {
    var formDetails = {};
    var emptyFlag = false;
    for(var i = 0; i < idArray.length; i++) {
      formDetails[idArray[i]] = $('#'+idArray[i]).val().trim();
      if(compulsoryFields === undefined) {
        if(formDetails[idArray[i]] === '') {
          emptyFlag = true;
          //$('#'+idArray[i]).css('border-color', '#f00');
        }
      }
    }
    return (emptyFlag) ? 'null' : formDetails;
  }

  this.pageRedirect = function(url) {
    $.ajax({
      url:url,
      method:'GET',
      headers:{
        'x-access-token':window.localStorage.getItem('token')
      }
    })
  }

  this.loginAction = function(data, dom, responseDom) {
    var apiresponse = this.customAjax('POST', data, 'api/login', dom);
        apiresponse.done(function(reply) {
          responseDom.text(reply.message);
          if(reply.status == false) {
            responseDom.css('color', '#f00');
          } else {
            window.localStorage.setItem('token', reply.token);
            responseDom.css('color','green');
            setTimeout(function() {
              window.location.href = '/home?q='+window.localStorage.getItem('token');
            }, 1000);
          }
        })
  }
}