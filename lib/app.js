var app = angular.module('prevTempo', []);


//# Parâmetros de Configuração
var key = "[SUA_KEY_DA_API]"; //# Secret Key fornecida pela DarkSky.
var units = "auto"; //# aceita os parâmetros: auto, ca, uk2, us e si.
var language = "pt"; //# idioma das informações recebidas. Para ver a lista completa, acessar: https://darksky.net/dev/docs/forecast
var exclude = "flags"; //# parâmetros que deseja excluir da consulta 


//# Setando data atual e corrigindo data da API
var dataHoje = new Date();
var dataAtual = dataHoje.getTime();
var umDia = 86400000;
var diaAmanha = dataAtual + umDia;



//# Criando o controlador WeatherCtrl 
app.controller('WeatherCtrl', function($scope, $http){

	$scope.dataAtual = dataAtual;
	$scope.diaAmanha = diaAmanha;

 //# Captura os dados de latitude e longitude da localização do usuário 
  var latitude= 0; var longitude = 0; 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude; 
                var longitude = position.coords.longitude;
        });       
    }


	$scope.$watch(function() {
	  previsao();
	  icones();
	  diasSemana();
		normalTemp();

	});



  //# Função que realiza a conexão com a API e retorna os dados 
	function previsao(){
	  $http.get("https://api.darksky.net/forecast/" + key + "/" + latitude + "," + longitude + "?lang=" + language + "&units=" + units + "&exclude=" + exclude)
	  .then(function(response){ $scope.details = response.data; })
	  .then(function(){$scope.temperaturaAtual = $scope.details.currently.temperature;})
	  .then(function(){$scope.sensacaoAtual = $scope.details.currently.apparentTemperature;})
	  .then(function(){$scope.temperaturaMin = $scope.details.daily.data[0].temperatureMin; })
	  .then(function(){$scope.temperaturaMax = $scope.details.daily.data[0].temperatureMax; }); 	
			
	 }


  //# Função que adiciona os icones do tempo
	function icones(){
	 	     var icons = new Skycons({"color" : "white"}),
          list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],
          i;
      for(i = list.length; i--; )
        icons.set(list[i], list[i]);
      icons.play();
     
	 }


//# Função que seta a data corrigida dos 7 dias seguintes
function diasSemana(){
	 	$scope.diaUm = dataAtual + umDia ; 
	  $scope.diaDois = dataAtual + (umDia*2); 
	  $scope.diaTres = dataAtual + (umDia*3);  
	  $scope.diaQuatro = dataAtual + (umDia*4);
	  $scope.diaCinco = dataAtual + (umDia*5);
	  $scope.diaSeis = dataAtual + (umDia*6);	  
	  $scope.diaSete = dataAtual + (umDia*7);	
	}


	//# Função que normaliza os dados 
	function normalTemp(){
		$scope.siglaTemp = "C";
		var tempAtual = $scope.temperaturaAtual;
		$scope.tempAtual = tempAtual;

		var sensaAtual = $scope.sensacaoAtual;
		$scope.sensaAtual = sensaAtual;

		var tempMin = $scope.temperaturaMin;
		$scope.tempMin = tempMin;	

		var tempMax = $scope.temperaturaMax;
		$scope.tempMax = tempMax;			

	}


	//# Função que realiza a conversão para Celsius
	$scope.converteC = function(){
		$scope.siglaTemp = "C";
		var tempAtual = $scope.temperaturaAtual;
		$scope.tempAtual = tempAtual;

		var sensaAtual = $scope.sensacaoAtual;
		$scope.sensaAtual = sensaAtual;

		var tempMin = $scope.temperaturaMin;
		$scope.tempMin = tempMin;	

		var tempMax = $scope.temperaturaMax;
		$scope.tempMax = tempMax;		


	}

	//# Função que realiza a conversão para Fahrenheit
	$scope.converteF = function(){
		$scope.siglaTemp = "F";
		var tempAtual = $scope.temperaturaAtual;
		$scope.tempAtual = tempAtual*9/5+32;

		var sensaAtual = $scope.sensacaoAtual;
		$scope.sensaAtual = sensaAtual*9/5+32;

		var tempMin = $scope.temperaturaMin;
		$scope.tempMin = tempMin*9/5+32;	

		var tempMax = $scope.temperaturaMax;
		$scope.tempMax = tempMax*9/5+32;		

	}


	$scope.passaParam1 = function (){
		window.open("?timeVar="+$scope.diaUm, '_self');
	} 

	$scope.passaParam2 = function (){
		window.open("?timeVar="+$scope.diaDois, '_self');	
	} 

	$scope.passaParam3 = function (){
		window.open("?timeVar="+$scope.diaTres, '_self');
	} 

	$scope.passaParam4 = function (){
		window.open("?timeVar="+$scope.diaQuatro, '_self');
	}

	$scope.passaParam5 = function (){
		window.open("?timeVar="+$scope.diaCinco, '_self');
	} 

	$scope.passaParam6 = function (){
		window.open("?timeVar="+$scope.diaSeis, '_self');
	} 

	$scope.passaParam7 = function (){
		window.open("?timeVar="+$scope.diaSete, '_self');
	} 	


});



