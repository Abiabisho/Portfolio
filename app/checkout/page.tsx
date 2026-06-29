'use client';
import { useState } from 'react';
import { useCart } from '../../components/context/cartcontext';
import Link from 'next/link';
 
export default function CheckoutPage() {
  const { cart, clearCart, removeFromCart } = useCart();
  // compute cart total locally because CartContextType doesn't provide cartTotal
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 🎟️ የኩፖን ቅናሽ መፈተኛ ፈንክሽን
  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'MERKATO20') {
      setDiscount(cartTotal * 0.20); // 20% ቅናሽ
      setPromoSuccess('🎉 Promo code applied! 20% discount added.');
      setPromoError('');
    } else {
      setPromoError('❌ Invalid promo code. Try "MERKATO20"');
      setPromoSuccess('');
    }
  };

  const finalTotal = cartTotal - discount;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-green-100 space-y-4">
          <div className="text-6xl text-green-500">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">Order Placed Securely!</h2>
          <p className="text-gray-600 text-sm">ትዕዛዝዎ እና የክፍያ ማረጋገጫዎ በስኬት ደርሶናል። እናመሰግናለን!</p>
          <Link href="/products" className="block bg-[#1F3864] text-white py-2.5 rounded-xl font-medium hover:bg-blue-900 transition text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-3xl font-bold text-[#1F3864] mb-8 text-center">Advanced Checkout System</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Order Summary & Promo Code Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border h-fit space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800">Your Summary</h3>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-red-100 transition">
                  🗑️ Cancel All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">Your cart is empty. <Link href="/products" className="text-blue-600 underline">Browse items</Link></p>
            ) : (
              <div className="divide-y text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-start gap-4">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} | Price: ${item.price}</p>
                      <p className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded w-fit mt-1">🕒 Modified: {item.dateAdded}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-bold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">❌ Remove</button>
                    </div>
                  </div>
                ))}
                
                {/* Promo Code Input Box */}
                <div className="py-4 space-y-2">
                  <label className="block text-xs font-semibold text-gray-600">Have a Promo Code? (Try: MERKATO20)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border p-2 text-sm rounded-lg outline-none flex-1 focus:ring-1 focus:ring-blue-400 uppercase"
                    />
                    <button type="button" onClick={applyPromo} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-black transition">Apply</button>
                  </div>
                  {promoError && <p className="text-xs text-red-600 font-medium">{promoError}</p>}
                  {promoSuccess && <p className="text-xs text-green-600 font-medium">{promoSuccess}</p>}
                </div>

                {/* Pricing Totals */}
                <div className="pt-4 space-y-1.5 text-gray-600">
                  <div className="flex justify-between"><span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount (20%):</span><span>-${discount.toFixed(2)}</span></div>}
                  <div className="flex justify-between font-extrabold text-lg text-gray-950 pt-2 border-t">
                    <span>Final Amount:</span>
                    <span className="text-yellow-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Payment & Receipt Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Select Payment Method</h3>
          <form onSubmit={handlePayment} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['chapa', 'cbe', 'abyssinia', 'telebirr'].map((method) => (
                <label key={method} className={`border p-3.5 rounded-xl flex items-center gap-3 cursor-pointer transition ${paymentMethod === method ? 'border-blue-600 bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold capitalize text-gray-800">
                    {method === 'cbe' ? '🏦 CBE Bank' : method === 'abyssinia' ? 'eagle 🦅 Abyssinia' : method === 'telebirr' ? '✨ Telebirr' : '📱 Chapa'}
                  </span>
                </label>
              ))}
            </div>

            {/* 📸 የክፍያ ማረጋገጫ ፎቶ መጫኛ (Receipt Upload) ለአገር ውስጥ ባንኮች */}
            {(paymentMethod === 'cbe' || paymentMethod === 'abyssinia') && (
              <div className="bg-yellow-50/60 border border-yellow-100 p-4 rounded-xl space-y-2 mt-2 animate-fade-in">
                <p className="text-xs text-yellow-800 font-medium">💡 እባክዎ ወደ ባንክ አካውንታችን ካስተላለፉ በኋላ የደረሰኝ ፎቶ እዚህ ያያይዙ፦</p>
                <input 
                  type="file" 
                  accept="image/*"
                  required
                  onChange={(e) => setReceipt(e.files ? e.files[0] : null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1F3864] file:text-white hover:file:bg-blue-900 cursor-pointer"
                />
              </div>
            )}

            {/* Customer Information Fields */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                <input type="text" required className="w-full border p-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Phone Number</label>
                <input type="tel" required className="w-full border p-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-400" placeholder="+251..." />
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0 || isProcessing}
              className="w-full bg-[#1F3864] text-white py-3 rounded-xl font-bold transition text-sm shadow-md mt-4 hover:bg-blue-900"
            >
              {isProcessing ? '🔄 Verification in Process...' : `Place Order ($${finalTotal.toFixed(2)})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}