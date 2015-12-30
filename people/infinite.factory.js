(function() {
    'use strict';

    angular
        .module('xCCeedGlobalApp')
        .factory('infiniteFactory', function($http, constantAPIService,commonAPIService) {
            var infiniteFactoryObj = function() {
                this.items = [];
                this.busy = false;
                this.after = 0;
            };

            infiniteFactoryObj.prototype.nextPage = function(recUrl, type, data,filterCounter,scope) {

            	if(recUrl !== undefined && type !== undefined){

	                console.log('inside nextPage method ');

	                if (this.busy) return;
	                this.busy = true;

	                if(type.toLowerCase() == "get"){		                	

		                return $http.get(recUrl+this.after).success(function(resp) {

		                	console.log('inside get condition');
		                	//console.log(resp);

		                	if(resp !== null && resp !== undefined && resp.length !== 0){			                		
			                    var items = resp;
			                    for (var i = 0; i < items.length; i++) {
			                        this.items.push(items[i]);
			                    }
			                    //console.log('Total items length ' +this.items.length);

			                    this.after = this.items.length;//this.items[this.items.length - 1].RowNumber;
			                    this.busy = false;
			                    //console.log(this.after);
		                	}
		                	else{
		                		this.busy = false;
		                	}
			                
			                console.log(this.items.length);
		                    
		                }.bind(this)).error(function(data,status, header, config){
		                	//this is to show the service error
							commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
		                });


	                }
	                else if(type.toLowerCase() == 'post' && data !== undefined){
	                	var cntFilter = filterCounter * 100;
	                	return $http.post(recUrl+this.after, data).success(function(resp) {

		                	console.log('inside post condition');
		                	console.log(resp);

		                	if(resp !== null && resp !== undefined && resp.length !== 0){			                		
			                    var items = resp;
			                    for (var i = 0; i < items.length; i++) {
			                        this.items.push(items[i]);
			                    }
			                    //Row no not needed to get the specified record.
			                    this.after = cntFilter; //this.items[this.items.length - 1].RowNumber;
			                    this.busy = false;
			                    console.log(this.after);
		                    }
		                	else{
		                		this.busy = false;
		                	}
		                }.bind(this)).error(function(data,status, header, config){
		                	//this is to show the service error
							commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
		                });
	                }
            	}
            };

            return infiniteFactoryObj;
        });

})();
