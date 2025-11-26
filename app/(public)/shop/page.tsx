import { db } from "@/lib/db";

export default async function ShopPage() {
  const products = await db.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-rr-yellow">Shop</h1>
      {products.length === 0 ? (
        <p className="text-center text-lg text-rr-green/70">
          Merch coming soon! Check back later.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg overflow-hidden hover:border-rr-pink/50 transition-all hover:shadow-lg hover:shadow-rr-green/20"
            >
              {product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-rr-green">{product.name}</h2>
                {product.description && (
                  <p className="text-rr-green/70 mb-4 text-sm">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rr-yellow">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  <button
                    disabled
                    className="bg-rr-green/20 border border-rr-green text-rr-green px-6 py-2 rounded-lg hover:bg-rr-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

