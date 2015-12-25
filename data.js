var app = angular.module('myApp', []).controller('HackerNewsCtrl', function($scope, $http) {

            $scope.hackerNews = [];
            
            $http.jsonp('https://www.kimonolabs.com/api/3ohsojdc?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Hacker News";
               }
               $scope.hackerNews = data.data.results.all_news;
            });
            
            $http.jsonp('https://www.kimonolabs.com/api/d2859ucg?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
                
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Google News";
                   $scope.hackerNews.push(data.data.results.all_news[i])
               }
            });
            
            $http.jsonp('https://www.kimonolabs.com/api/3jmix9t2?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
                
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Lifehacker";
                   $scope.hackerNews.push(data.data.results.all_news[i])
               }
            });
            
            $http.jsonp('https://www.kimonolabs.com/api/8mt4om9w?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
                
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Gizmodo";
                   $scope.hackerNews.push(data.data.results.all_news[i])
               }
            });
            
            $http.jsonp('https://www.kimonolabs.com/api/7j1v7o3i?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
                
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "CNN Tech";
                   $scope.hackerNews.push(data.data.results.all_news[i])
               }
            });
            
            $http.jsonp('https://www.kimonolabs.com/api/akrnd8po?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
                
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Ars Technica";
                   $scope.hackerNews.push(data.data.results.all_news[i])
               }
            });
            
            $scope.hlen = $scope.hackerNews.length;
        });