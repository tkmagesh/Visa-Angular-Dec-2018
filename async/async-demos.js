(function(){
	function addSync(x,y){
		console.log(`	[@addSync] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@addSync] returning the result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@addSyncClient] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@addSyncClient] result = ${result}`);
	}

	window['addSyncClient'] = addSyncClient;

	function addAsync(x,y, callback){
		console.log(`	[@addAsync] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@addAsync] returning the result`);
			callback(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log(`[@addAsyncClient] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@addAsyncClient] result = ${result}`);	
		});
		
	}

	window['addAsyncClient'] = addAsyncClient;



	var addAsyncEvents = (function(){
		var callbacks = [];
		function subscribe(callback){
			callbacks.push(callback);
		}
		function add(x,y){
			console.log(`	[@addAsyncEvents] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@addAsyncEvents] returning the result`);
				callbacks.forEach(callback => callback(result));
			}, 4000);
		}

		return { subscribe, add};
	})();

	window['addAsyncEvents'] = addAsyncEvents;


	function addAsyncPromise(x,y){
		console.log(`	[@addAsync] processing ${x} and ${y}`);

		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@addAsync] returning the result`);
				resolveFn(result);
			}, 4000);
		});
		
		return promise;
	}

	window['addAsyncPromise'] = addAsyncPromise;

})();