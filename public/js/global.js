var MyGlobal = function() {

  this.customAjax = function(type, data, url, dom) {
    return $.ajax({
      type:type,
      url:url,
      data:data,
      headers:{
        'x-access-token':window.localStorage.getItem('token')
      },
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


  this.advanceAjax = function(data, url, dom) {
    return $.ajax({
      type:'POST',
      url:url,
      data:data,
      headers:{
        'x-access-token':window.localStorage.getItem('token')
      },
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
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
    return $.ajax({
      url:url,
      method:'GET',
      headers:{
        'x-access-token':window.localStorage.getItem('token')
      }
    })
  }

  this.loginAction = function(data, dom, responseDom) {
    var apiresponse = this.customAjax('POST', data, 'api/login', dom);
    var instance = this;
    apiresponse.done(function(reply) {
      responseDom.text(reply.message);
        if(reply.status == false) {
          responseDom.css('color', '#f00');
        } else {
          window.localStorage.setItem('token', reply.token);
          responseDom.css('color','green');
          setTimeout(function() {
            window.location.href = '/home?q='+window.localStorage.getItem('token');
            /*var r = instance.pageRedirect('/home');
            r.done(function(x) {
              $('html').html(x);
            })*/
          }, 1000);
        }
      })
  }

  this.renderPage = function(url) {
    var pageLoad = this.pageRedirect(url);
    pageLoad.done(function(page) {
      $('#page-inner').html(page);
    })
  }

}