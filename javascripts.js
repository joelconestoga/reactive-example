var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var requestOnRefreshStream = refreshClickStream.map(function() {
  var randomOffset = Math.floor(Math.random()*500);
  return 'https://api.github.com/users?since=' + randomOffset;
});

var startupRequestStream = Rx.Observable.create(o => {
  o.onNext('https://api.github.com/users');
  o.onCompleted();
});

var requestStream = Rx.Observable.merge(
  requestOnRefreshStream, startupRequestStream
);

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