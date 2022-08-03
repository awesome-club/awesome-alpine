document.addEventListener('alpine:init', () => {
  Alpine.data('app', function(){
    
    function onProductAdded() {
      this.$data.added = true;
      setTimeout(() => {
        this.$data.added = false;
      }, 2000)
    }

    return {
      dark: this.$persist(false),
      added: false,
      toggleDark() {
        this.dark = !this.dark;
      },
      onProductAdded: onProductAdded.bind(this)
    }
  });

  Alpine.data('header', () => ({
    dropdown: false,
    toggle() {
      this.dropdown = !this.dropdown;
    },
    hide() {
      this.dropdown = false;
    }
  }));

  Alpine.data('product', () => ({
    color: 'red',
    qty: 1,
    changeColor(ev) {
      this.color = ev.target.classList[0];
    }
  }));

  Alpine.store('cart', {
    products: [],
    add(name, qty = 1, color = "default") {
      if (this.products.indexOf(name) === -1) {
        this.products.push(`${qty} - ${name} (${color})`);
      }
    },
    get notEmpty() {
      return this.products.length > 0;
    },
    get size() {
      return this.products.length;
    }
  });
});