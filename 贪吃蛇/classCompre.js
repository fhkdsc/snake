var classCompre=function(){
	var create=function(fn,methods,parent){
		var _instances=[],_unique,_initlizable;
		_initlizable=function(args){
			fn.apply(this,args);
		}
		if(parent){
			_initlizable.prototype=parent;
		}
		for(var parName in methods){
			_initlizable.prototype[parName]=methods[parName];
		}

		var getInstance=function(){
			var a=Array.prototype.slice.call(arguments,0);
			console.log(a);
			_instances[_unique++]=new _initlizable(a);
			return _instances[_unique-1];
		}

		return {
			getInstance:getInstance
		}

	}


	return {
		create:create
	}
}();