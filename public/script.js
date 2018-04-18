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
		cart: [],
		search: ''
	},
	methods: {
		onSubmit: function() {
			console.log(this.search);
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