var app = angular.module('myApp', []).factory('newsHandler', function($http){
    
    var sources = [
        {name: 'Hacker News', 
         api: '3ohsojdc'},
        {name: 'Google News', 
         api: 'd2859ucg'},
        {name: 'Lifehacker',  
         api: '3jmix9t2'},
        {name: 'Gizmodo',     
         api: '8mt4om9w'},
        {name: 'CNN Tech',    
         api: '7j1v7o3i'},
        {name: 'Ars Technica',
         api: 'akrnd8po'},
        {name: 'CNET', 
         api: '60kmt1ti'},
        {name: 'Macworld', 
         api: '5pmozpf4'},
        {name: 'The Verge',
         api: 'dov3wv56'},
        {name: 'TechCrunch',
         api: '8ufy858c'},
        {name: 'MIT Technology Review',
         api: '86i92cgo'}
    ];
    
    // public key
    var apiKey = 'DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3';
    var functions = [];
    for(var i = 0; i < sources.length; i++){
        
        
        var api = sources[i].api;
        
        var name = sources[i].name;
        
        var sourceFunc = function(api, name, apiKey) {
            return $http.jsonp('https://www.kimonolabs.com/api/' + api + '?apikey=' + apiKey +   '&callback=JSON_CALLBACK').then(function(data){
            
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = name;
               }
               return data.data.results.all_news;
            });
            
        };
        
        functions.push(sourceFunc(api, name, apiKey));
    }
    
    return {functions: functions, sources: sources};
    
}).controller('HackerNewsCtrl', function($scope, $http, newsHandler) {

            $scope.hackerNews = [];
            var articles = newsHandler.functions;
    
            $scope.sources = newsHandler.sources;
            
            // The below code does essentially nested callbacks
            articles.forEach(function(callback){
                callback.then(function(result){
                    $scope.hackerNews = $scope.hackerNews.concat(result);
                    $scope.hackerNews.sort(function(first, second){
                        
                        return first.news_headline.text.localeCompare(second.news_headline.text);
                    });
                });
            });
    
            // EDIT: The code below is before i learned about forEach
            // riding the callback rollercoaster 
            /*
            articles[0]().then(function(result){
                $scope.hackerNews = result;
                articles[1]().then(function(result){
                    $scope.hackerNews = $scope.hackerNews.concat(result);
                    articles[2]().then(function(result){
                        $scope.hackerNews = $scope.hackerNews.concat(result);
                        articles[3]().then(function(result){
                   .... AND SO ON AND SO FORTH
                   
            */
        });