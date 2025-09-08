import React from 'react'
import Swal from 'sweetalert2'

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
    Swal.fire({
      icon: 'success',
      title: `ເພີ່ມສຳເລັດແລ້ວ`,
      text: `${product.name} ໄດ້ເພີ່ມເຂົ້າກະຕ່າແລ້ວ.`,
      timer: 2000,
      showConfirmButton: true,
      color: 'rgb(216,104,104)',
      timerProgressBar: true,
      timerProgressBarColor: 'rgb(216,104,104)',
      buttonsStyling: true,
      confirmButtonColor: 'rgb(216,104,104)',
      confirmButtonText: 'ຕົກລົງ',
    })
  }

  return (
    <div className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img 
          src={product.image || '/images/placeholder.jpg'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
        {/* Stock Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          product.stock > 10 
            ? 'bg-green-100 text-green-800' 
            : product.stock > 0 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}>
          {product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-grey-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[rgb(216,104,104)]">
            {product.price.toLocaleString()} LAK
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.stock > 0
              ? 'bg-[rgb(216,104,104)] hover:bg-[rgb(255,50,50)] text-white hover:shadow-lg active:transform active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard