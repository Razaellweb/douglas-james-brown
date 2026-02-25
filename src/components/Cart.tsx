import { useCartStore } from '@/store/cartStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

export const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  
  const hasDigitalOnly = useMemo(() => {
    if (items.length === 0) return false;
    return items.every(item => item.product.productType === 'digital');
  }, [items]);

  const hasPhysicalOnly = useMemo(() => {
    if (items.length === 0) return false;
    return items.every(item => item.product.productType === 'physical');
  }, [items]);

  const hasMixed = useMemo(() => {
    if (items.length <= 1) return false;
    return !hasDigitalOnly && !hasPhysicalOnly;
  }, [items, hasDigitalOnly, hasPhysicalOnly]);

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center border-border/30 bg-card/50">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-cinzel text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h3>
        <p className="font-cormorant text-muted-foreground mb-6 max-w-md mx-auto">
          Browse our collection of books, audiobooks, signed editions, and exclusive merchandise.
        </p>
        <Link to="/shop">
          <Button className="font-cinzel bg-gradient-peacock text-primary-foreground hover:shadow-glow">
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <Card className="border-border/30 bg-card/50 overflow-hidden">
        {items.map((item, index) => (
          <div key={item.product.id}>
            <div className="p-6 flex gap-6 items-start">
              {/* Product Image */}
              {item.product.image ? (
                <div className="w-20 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0" />
              )}

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-foreground">{item.product.name}</h4>
                    <p className="font-cormorant text-sm text-muted-foreground">{item.product.bookTitle}</p>
                  </div>
                  <Badge
                    variant={item.product.productType === 'digital' ? 'default' : 'secondary'}
                    className="font-cormorant text-xs"
                  >
                    {item.product.productType === 'digital' ? 'Digital' : 'Physical'}
                  </Badge>
                </div>

                <p className="font-cormorant text-sm text-foreground/80 mb-4 line-clamp-1">
                  {item.product.description}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-accent" />
                    </button>
                    <span className="w-8 text-center font-cinzel font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-accent" />
                    </button>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-cormorant">Each</p>
                      <p className="font-cinzel text-lg font-bold text-accent">${item.product.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {index < items.length - 1 && <Separator className="bg-border/30" />}
          </div>
        ))}
      </Card>

      {/* Product Type Info */}
      {hasMixed && (
        <Card className="p-4 bg-accent/10 border-accent/30">
          <p className="font-cormorant text-sm text-foreground">
            <span className="font-bold">Note:</span> Your cart contains both digital and physical items. They will be processed accordingly after checkout.
          </p>
        </Card>
      )}

      {/* Cart Summary */}
      <Card className="p-8 bg-gradient-to-br from-card via-card to-muted/30 border-accent/30 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-cormorant text-muted-foreground">Items ({getTotalItems()})</span>
            <span className="font-cinzel font-bold text-foreground">{items.length} item(s)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-cormorant text-muted-foreground">Subtotal</span>
            <span className="font-cinzel font-bold text-foreground">${totalPrice.toFixed(2)}</span>
          </div>

          <Separator className="bg-border/30" />

          <div className="flex justify-between items-center text-lg">
            <span className="font-cinzel font-bold text-foreground">Total</span>
            <span className="font-cinzel font-bold text-accent text-2xl">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Link to="/checkout" className="block">
            <Button className="w-full bg-gradient-peacock hover:shadow-glow text-primary-foreground font-cinzel text-lg py-6 group">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link to="/shop" className="block">
            <Button variant="outline" className="w-full font-cinzel border-border/50">
              Continue Shopping
            </Button>
          </Link>

          <button
            onClick={clearCart}
            className="w-full text-center text-muted-foreground hover:text-destructive transition-colors font-cormorant text-sm py-2"
          >
            Clear Cart
          </button>
        </div>

        <div className="text-center pt-4 border-t border-border/30">
          <p className="font-cormorant text-xs text-muted-foreground">
            Secure checkout powered by Stripe • 100% satisfaction guaranteed
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
