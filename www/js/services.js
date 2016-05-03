angular.module('Bolsa.services', [])

.factory('stockDataService', function($q, $http){

  var getDetailsData = function(ticker){
    var deferred = $q.defer();
    url = "http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22"+ticker+"%22%29&env=store://datatables.org/alltableswithkeys&format=json"

    $http.get(url)
    .success(function(json){
      var jsonData = json.query.results.quote;
      deferred.resolve(jsonData);
    })
    .error(function(jsonData){
      console.log("Detais data error:" + error);
      deferred.reject();
    });

    return deferred.promise;
  };

  var getPriceData = function(ticker){
    var deferred = $q.defer(),
    url = "http://finance.yahoo.com/webservice/v1/symbols/"+ ticker +"/quote?format=json&view=detail";
    $http.get(url)
    .success(function(json){
      var jsonData = json.list.resources[0].resource.fields;
      deferred.resolve(jsonData);
    })
    .error(function(jsonData){
      console.log("Price data error:" + error);
      deferred.reject();
    });

    return deferred.promise;
  };

  return {
    getPriceData:getPriceData,
    getDetailsData:getDetailsData
  };
});
