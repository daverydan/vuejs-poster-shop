var PRICE = 9.99;

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
		cart: [],
		search: ''
	},
	methods: {
		onSubmit: function() {
			// imgur API call using vue-resource
			this.$http
				.get('/search/'.concat(this.search))
				.then(function(response) {
					this.items = response.data;
				});
		},
		addItem: function(index) {
			this.total += PRICE; // increment item total
			var item = this.items[index]; // find the item by index
			var found = false; // init found
			// check if item found in cart
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === item.id) {
					found = true; // item found in cart
					this.cart[i].qty++;
					break;
				}
			}
			// if item not found in cart - put in cart
			if (!found) {
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: PRICE
				});
			}
		}, // addItem
		increment: function(item) {
			item.qty++;
			this.total += PRICE;
		},
		decrement: function(item) {
			item.qty--;
			this.total -= PRICE;
			// check if qty is 0 & remove from cart
			if (item.qty <= 0) {
				for (var i =0; i < this.cart.length; i++) {
					if (this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		}
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}
	}
});