
Module.register("crypto", {

	start: function() {
		var self = this;
		self.previousPrices = {};

		var loadCryptos = function() {
			self.loaded = false;
			self.getCryptoCurrencies();
		};

		loadCryptos();
		setInterval(function() {
			loadCryptos();
		}, (self.config.updateInterval && self.config.updateInterval >= 5000) ? self.config.updateInterval : 30000);
	},

	resetColors: function(name) {
		setTimeout(function() {
			var priceElement = document.getElementById('price-id-' + name);
			priceElement.className = "time light color-fade pull-right";
		}, 5000);
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("table");
		var self = this;
		wrapper.className = "small";
		wrapper.style.width = "375px";

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if(this.crypocurrencies.length == 0) {
			wrapper.innerHTML = "No cryptocurrency prices.";
			wrapper.className = "small dimmed";
			return wrapper;
		}

		for (var c in this.crypocurrencies) {
			var cryptoCurrency = this.crypocurrencies[c]

			var cryptoCurrencyWrapper = document.createElement("tr");
			cryptoCurrencyWrapper.className = "normal";

			var iconWrapper = document.createElement("td");
			iconWrapper.innerHTML = '<img src="' + cryptoCurrency.icon + '" height="25" width="25">';
			iconWrapper.className = 'pull-left';
			cryptoCurrencyWrapper.appendChild(iconWrapper);


			var nameWrapper = document.createElement("td");
			nameWrapper.innerHTML = cryptoCurrency.name;
			nameWrapper.className = "title bright pull-left left-spacer-5";
			cryptoCurrencyWrapper.appendChild(nameWrapper);

			var priceWrapper = document.createElement("td");
			var priceClassName = "time light color-fade pull-right";
			priceWrapper.id = 'price-id-' + cryptoCurrency.name;
			priceWrapper.innerHTML = '$' + cryptoCurrency.price.toFixed(2);

			if (!self.previousPrices[cryptoCurrency.name]) {
				self.previousPrices[cryptoCurrency.name] = {};
				self.previousPrices[cryptoCurrency.name].price = cryptoCurrency.price;
			} else {
				if (cryptoCurrency.price > self.previousPrices[cryptoCurrency.name].price) {
					priceClassName += " font-green";
					self.resetColors(cryptoCurrency.name);
				} else if (cryptoCurrency.price < self.previousPrices[cryptoCurrency.name].price) {
					priceClassName += " font-red";
					self.resetColors(cryptoCurrency.name);
				}
			}

			priceWrapper.className = priceClassName;
			cryptoCurrencyWrapper.appendChild(priceWrapper);

			wrapper.appendChild(cryptoCurrencyWrapper);
		}

		return wrapper;
	},

	processCryptoPrices: function(data) {
		this.crypocurrencies = [];

		for (var i = 0; i < this.config.cryptos.length; i++) {
			this.crypocurrencies.push({
				name: this.config.cryptos[i].displayName,
				price: data[this.config.cryptos[i].code][this.config.price],
				icon: this.config.cryptos[i].iconUrl
			});
		}

		this.loaded = true;
		this.updateDom(0);
	},

	getCryptoCurrencies: function() {

	  var apiUrl = 'https://api.coinbase.com/v2';

		var url = this.config.url + 'tsyms=' + this.config.price + '&fsyms=';
    for (var i=0; i < this.config.cryptos.length; i++) {
      url += this.config.cryptos[i].code;
      if (i != this.config.cryptos.length - 1) {
        url += ',';
      }
    }

		var self = this;

		var cryptoRequest = new XMLHttpRequest();
		cryptoRequest.open("GET", url, true);
		cryptoRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processCryptoPrices(JSON.parse(this.response));
				} else if (this.status === 401) {
					this.loaded = true;
				} else {
					this.loaded = true;
				}
			}
		};

		cryptoRequest.send();
	}

});
