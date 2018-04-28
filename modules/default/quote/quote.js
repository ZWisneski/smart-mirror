
Module.register("quote", {

  defaults: {
		updateInterval: 30000,
    animationSpeed: 1000
	},

	start: function() {
		var self = this;

    this.loaded = false;
    self.loadQuote();

		setInterval(function() {
      this.loaded = false;
			self.loadQuote();
		}, this.config.updateInterval);
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var self = this;
		wrapper.className = "small";
		wrapper.style.width = "375px";

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.currentQuote) {
			wrapper.innerHTML = "No quote available.";
			wrapper.className = "small dimmed";
			return wrapper;
		}

		var quoteWrapper = document.createElement("div");
    quoteWrapper.className = "normal align-center";

    var quoteAuthor = document.createElement("div");
    quoteAuthor.className = "bold medium bright";
    quoteAuthor.innerHTML = this.currentQuote.title;
    quoteWrapper.appendChild(quoteAuthor);

    var textWrapper = document.createElement("div");
    textWrapper.className = "normal align-center";

    var quoteText = document.createElement("div");
    quoteText.className = "light small";
    quoteText.innerHTML = this.currentQuote.content.substring(3, this.currentQuote.content.length - 5);
    textWrapper.appendChild(quoteText);

    wrapper.appendChild(quoteWrapper);
    wrapper.appendChild(textWrapper);
		return wrapper;
	},

	processQuote: function(data) {
    if (data) {
      this.currentQuote = data[0];
    } else {
      this.currentQuote = null;
    }

		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	loadQuote: function() {
		var self = this;

		var quoteRequest = new XMLHttpRequest();
		quoteRequest.open("GET", 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', true);
		quoteRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processQuote(JSON.parse(this.response));
				} else if (this.status === 401) {
					this.loaded = true;
				} else {
					this.loaded = true;
				}
			}
		};

		quoteRequest.send();
	}

});
