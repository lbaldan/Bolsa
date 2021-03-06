angular.module('Bolsa.services', [])

.factory('encodeURIService',function(){
  return{
    encode: function(string) {
      return encodeURIComponent(string).replace(/\"/g,"%22").replace(/\ /g,"%20").replace(/[!'()]/g,escape);
    }
  };
})

.factory('dateService', function($filter){
    var currentDate = function() {
      var d = new Date();
      var date = $filter('date')(d,'yyyy-MM-dd');
      return date;
    };

    var oneYearAgorDate = function() {
      var d = new Date(new Date().setDate(new Date().getDate()-365));
      var date = $filter('date')(d,'yyyy-MM-dd');
      return date;
    };

    return{
      currentDate:currentDate,
      oneYearAgorDate:oneYearAgorDate
    };

})

.factory('stockDataService', function($q, $http, encodeURIService){
  var getDetailsData = function(ticker){
    var deferred = $q.defer();
    query = 'select * from yahoo.finance.quotes where symbol in ("'+ ticker+'")';
    url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encode(query) + '&env=store://datatables.org/alltableswithkeys&format=json';

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
