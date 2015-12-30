(function(){
	'use strict'


	angular.module('xCCeedGlobalApp')

	.directive('autoListDivider', function($timeout) {  
		var lastDivideKey = "";

		return {
			link: function(scope, element, attrs) {

				var key = attrs.autoListDividerValue;

				//console.log();

				//var peopleListLnth = scope.$parent.peopleCtrl.peopleList.length, count = 0;

				var defaultDivideFunction = function(k){
					return k.slice( 0, 1 ).toUpperCase();
				}
	      
				var doDivide = function(){
					var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;

					var divideKey = divideFunction(key);
					
					if(divideKey != lastDivideKey) { 
						var contentTr = angular.element("<div class='item item-divider' id='item-divider-"+divideKey+"'>"+divideKey+"</div>");
						element[0].appendChild(contentTr[0], element[0]);
					}

					lastDivideKey = divideKey;
				}
			  
				$timeout(doDivide,0);

				//console.log(peopleListLnth +' ' + count);
				//console.log(doDivide());

				/*
if(peopleListLnth == count){
					$('.jsAlphaChar').fadeIn('slow');
				}else{
					$('.jsAlphaChar').fadeOut('fast');
				}
*/
				

			}
		}
	});
	
})();