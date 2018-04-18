var PRICE = 9.99;
new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{ id: 1, title: 'Item 1' },
			{ id: 2, title: 'Item 2' },
			{ id: 3, title: 'Item 3' }
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			this.total += PRICE; // increment item total
			var item = this.items[index]; // find the item by index
			var found = false; // init found
			// check if item found in cart
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === item.id) {
					found = true; // item found in cart
					this.cart[i].qty++;
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
		}
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}
	}
});