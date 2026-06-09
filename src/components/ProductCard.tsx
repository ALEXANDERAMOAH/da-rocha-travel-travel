import { MessageCircle } from 'lucide-react';
import type { Product } from '../data/products';

const WHATSAPP_NUMBER = '233534010350';

function getWhatsAppLink(product: Product) {
  const text = encodeURIComponent(
    `Hi! I'm interested in ${product.name} for GH₵${product.price}. Please assist me.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
      </div>
      <div className="product-card-body">
        <h4 className="product-card-name">{product.name}</h4>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">GH₵{product.price}</span>
          <a
            href={getWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card-whatsapp"
          >
            <MessageCircle size={14} />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
