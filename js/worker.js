function factorizer(num) {
  var factors = [];
  var output = [];
  var x,c,d;
	
	for (x=1; x <= num; x++) {
		c = num / x;
		d = Math.floor(c);
    
		if (c === d){
			factors.push(x);
		}
	}

  return "factors of " + num + " are " + factors.join(", ");
}

self.addEventListener('message', function(e) {
  var num = e.data;
  self.postMessage(factorizer(num));
},false);
