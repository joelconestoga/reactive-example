
var requestStream = Rx.Observable.create(o => {
  o.onNext('https://api.github.com/users');
  o.onCompleted();
});

requestStream.subscribe(function(requestUrl) {
  // execute the request
  var responseStream = Rx.Observable.create(function (observer) {
    jQuery.getJSON(requestUrl)
    .done(function(response) { observer.onNext(response); })
    .fail(function(jqXHR, status, error) { observer.onError(error); })
    .always(function() { observer.onCompleted(); });
  });
  
  responseStream.subscribe(function(response) {
    console.log(`Do something with the ${response.length} items returned.`);
    console.log(response);
  });
});