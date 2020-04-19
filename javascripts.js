
var requestStream = Rx.Observable.create(o => {
  o.onNext('https://api.github.com/users');
  o.onCompleted();
});

requestStream.subscribe(function(requestUrl) {
  // execute the request
  var responseStream = requestStream.flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

  responseStream.subscribe(function(response) {
    console.log(`Do something with the ${response.length} items returned.`);
    console.log(response);
  });
});