
Module.register("birthdays",{

	// Default module config.
	defaults: {
		maximumEntries: 10
  },

	start: function() {
		this.birthdays = [];
		this.loaded = false;
		this.getBirthdays();
	},

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
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

		if(this.birthdays.length == 0) {
			wrapper.innerHTML = "No upcoming birthdays.";
			wrapper.className = "small dimmed";
			return wrapper;
		}

		for(var b in this.birthdays) {
			var birthday = this.birthdays[b]

			var birthdayWrapper = document.createElement("tr");
			birthdayWrapper.className = "normal";

			var nameWrapper = document.createElement("td");
			nameWrapper.innerHTML = birthday.name;
			nameWrapper.className = "title bright pull-left";
			birthdayWrapper.appendChild(nameWrapper);

			var ageWrapper = document.createElement("td");
			ageWrapper.innerHTML = moment(birthday.birthDate, "YYYY-MM-DD").fromNow()
			ageWrapper.className = "time light xsmall";
			birthdayWrapper.appendChild(ageWrapper);

			var dateWrapper = document.createElement("td");
			dateWrapper.innerHTML = moment(birthday.birthDate).format('MMM Do');
			dateWrapper.className = "time light pull-right";
			birthdayWrapper.appendChild(dateWrapper);

			if((this.config.fade) && (b == this.birthdays.length-1)) {
				birthdayWrapper.style.opacity = '0.5';
			}

			wrapper.appendChild(birthdayWrapper);
		}

		return wrapper;
	},

	processBirthdays: function(data) {
		this.birthdays = [];

		for (var i = 0, count = data.length; i < count; i++) {
			this.birthdays.push({
				name: data[i].firstName + ' ' + data[i].lastName,
				birthDate: data[i].birthDate
			});
		}

		this.loaded = true;
		this.updateDom(1000);
	},

	getBirthdays: function() {
		var url = this.config.url + this.config.maximumEntries;
		var self = this;

		var birthdaysRequest = new XMLHttpRequest();
		birthdaysRequest.open("GET", url, true);
		birthdaysRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processBirthdays(JSON.parse(this.response));
				} else if (this.status === 401) {
					this.loaded = true;
					// self.updateDom(self.config.animationSpeed);
					//
					// Log.error(self.name + ": Incorrect APPID.");
					// retry = true;
				} else {
					this.loaded = true;
					// Log.error(self.name + ": Could not load weather.");
				}
			}
		};

		birthdaysRequest.send();
	}

});
