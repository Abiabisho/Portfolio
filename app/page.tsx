'use client';
import Link from 'next/link';

export default function HomePage() {
  // ታዋቂ ካቴጎሪዎችን በሆም ፔጅ ላይ በክብ ቅርጽ ለማሳየት
  const popularCategories = [
    {
      name: 'Electronics', icon: '💻', count: '10+ Items',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEwfHxlbGVjdHJvbmljc3xlbnwwfHx8fDE2OTg1NzQyMTh8MA&auto=format&fit=crop&w=800&q=60'
    },
    { name: 'Clothing', icon: '🧥', count: '25+ Items' },
    { name: 'Food & Beverage', icon: '🌾', count: '15+ Items' },
    { name: 'Home & Living', icon: '🧺', count: '8+ Items' },
  ];

  return (
    <div className="min-h-screen space-y-16 pb-12 transition-colors duration-300">

      {/* 🚀 1. HERO SECTION (ትልቁ ሳቢ ባነር) */}
      <section className="relative bg-gradient-to-r from-[#1F3864] to-blue-900 text-white py-20 px-4 sm:px-8 text-center shadow-inner no-invert">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            ✨ Welcome to the Ultimate Marketplace
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Shop Smart. <br />
            <span className="text-amber-400">Discover Quality Products.</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 max-w-xl mx-auto font-light">
            በኢትዮጵያ ምርጥ የተባሉ ምርቶችን፣ ዘመናዊ ኤሌክትሮኒክሶችንና ባህላዊ አልባሳትን በአንድ ቦታ በጥራት እና በቅናሽ ይሸምቱ።
          </p>
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-block bg-amber-500 text-[#1F3864] px-8 py-3.5 rounded-xl font-black text-sm shadow-lg hover:bg-amber-400 hover:scale-105 transition duration-300"
            >
              Start Shopping 🛍️
            </Link>
          </div>
        </div>
      </section>

      {/* 🛡️ 2. TRUST BADGES / FEATURES GRID (የጥራት ማረጋገጫዎች) */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4 transition hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
            <span className="text-3xl bg-blue-50 p-3 rounded-xl dark:bg-gray-700">🚚</span>
            <div>
              <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">Fast Delivery</h3>
              <p className="text-xs text-gray-400 mt-0.5">ያዘዙትን እቃ ባሉበት ቦታ በፍጥነት እናስተሳስራለን።</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4 transition hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
            <span className="text-3xl bg-amber-50 p-3 rounded-xl dark:bg-gray-700">💳</span>
            <div>
              <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">Secure Payments</h3>
              <p className="text-xs text-gray-400 mt-0.5">በChapa, Telebirr ወይም በባንክ በሰላም ይክፈሉ ያረጋግጡ።</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4 transition hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
            <span className="text-3xl bg-green-50 p-3 rounded-xl dark:bg-gray-700">🌟</span>
            <div>
              <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">100% Top Quality</h3>
              <p className="text-xs text-gray-400 mt-0.5">ለእርስዎ የሚሆኑ በጥራት የተመረጡ ምርጥ እቃዎች ብቻ።</p>
            </div>
          </div>

        </div>
      </section>

      {/* 🗂️ 3. POPULAR CATEGORIES (ታዋቂ ዘርፎች) */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">Explore Popular Categories</h2>
          <p className="text-xs text-gray-400">የሚፈልጉትን ዘርፍ መርጠው በቀጥታ ይግቡ</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {popularCategories.map((cat) => (
            <Link
              key={cat.name}
              href="/products"
              className="bg-white p-6 rounded-2xl border text-center shadow-sm block transition hover:border-amber-500 hover:shadow-md dark:bg-gray-800 dark:border-gray-700 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition duration-300">{cat.icon}</div>
              <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100">{cat.name}</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-full inline-block">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎟️ 4. CALL-TO-ACTION PROMO BOX (የኩፖን ማስታወቂያ) */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-[#1F3864] flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md no-invert">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Get 20% Special Discount!</h3>
            <p className="text-xs sm:text-sm font-medium text-blue-950 max-w-md">
              የመጀመሪያ ትዕዛዝዎን ሲፈጽሙ <span className="bg-[#1F3864] text-white px-2 py-0.5 rounded font-bold text-xs uppercase">MERKATO20</span> የሚለውን ኮድ በመጠቀም የ 20% ቅናሽ ያግኙ።
            </p>
          </div>
          <Link
            href="/products"
            className="bg-[#1F3864] text-white px-6 py-3 rounded-xl font-bold text-xs shadow hover:bg-blue-900 transition whitespace-nowrap"
          >
            Claim Discount Now
          </Link>
        </div>
      </section>

    </div>
  );
}