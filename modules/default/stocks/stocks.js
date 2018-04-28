
Module.register("stocks", {

	getScripts: function () {
		return ["moment.js"];
	},

	start: function() {
		var self = this;

		var loadStocks = function() {
			self.loaded = false;
			self.getStocks();
		};

		var setRepeatingCalls = function() {
			// If weekday, start repeating timer
			if (moment().isoWeekday() <= 5) {
				setInterval(function() {
					loadStocks();
				}, (this.config.updateInterval) ? this.config.updateInterval : 5000);
			}
		}

		loadStocks();
		setRepeatingCalls();

		// Day interval to reset day check for repeat calls
		setInterval(function() {
			setRepeatingCalls();
		}, 60000 * 60 * 24);
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

		if(this.stocks.length == 0) {
			wrapper.innerHTML = "No cryptocurrency prices.";
			wrapper.className = "small dimmed";
			return wrapper;
		}

		for(var c in this.stocks) {
			var stock = this.stocks[c]

			var stockWrapper = document.createElement("tr");
			stockWrapper.className = "normal";

			var nameWrapper = document.createElement("td");
			nameWrapper.innerHTML = stock.name;
			nameWrapper.className = "title bright pull-left";
			stockWrapper.appendChild(nameWrapper);

			var priceWrapper = document.createElement("td");
			priceWrapper.innerHTML = stock.price;
			priceWrapper.className = "time light";
			stockWrapper.appendChild(priceWrapper);

      var percentChangeWrapper = document.createElement("td");
      percentChangeWrapper.innerHTML = stock.percentChange + '%';

      var classes = "light xsmall";
      if (stock.percentChange < 0.0) {
        classes += " font-red";
      } else if (stock.percentChange > 0.0) {
        classes += " font-green";
      }

      percentChangeWrapper.className = classes;
      stockWrapper.appendChild(percentChangeWrapper);

			wrapper.appendChild(stockWrapper);
		}

		return wrapper;
	},

	processStocks: function(data) {
		this.stocks = [];

		for (var i = 0; i < this.config.stockCodes.length; i++) {
			this.stocks.push({
				name: (this.config.cryptos[i].displayName) ? this.config.cryptos[i].displayName : data[i].t,
				price: '$' + data[i].l,
        percentChange: data[i].c
			});
		}

		this.loaded = true;
		this.updateDom(self.config.animationSpeed);
	},

	getStocks: function() {
		var url = this.config.url;

    for (var i=0; i < this.config.stockCodes.length; i++) {
      url += this.config.stockCodes[i];
      if (i != this.config.stockCodes.length -1) {
        url += ',';
      }
    }

		var self = this;

		var stocksRequest = new XMLHttpRequest();
		stocksRequest.open("GET", url, true);
		stocksRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processStocks(JSON.parse(this.response.substring(3)));
				} else if (this.status === 401) {
					this.loaded = true;
				} else {
					this.loaded = true;
				}
			}
		};

		stocksRequest.send();
	}

});
