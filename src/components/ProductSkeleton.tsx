function ProductSkeleton() {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {/* Image skeleton */}
        <div
          className="placeholder-glow"
          style={{ height: '240px' }}
        >
          <span className="placeholder w-100 h-100"></span>
        </div>

        <div className="card-body">
          {/* Category skeleton */}
          <p className="placeholder-glow mb-3">
            <span className="placeholder col-3"></span>
          </p>

          {/* Product title skeleton */}
          <h5 className="placeholder-glow mb-2">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-8"></span>
          </h5>

          {/* Rating skeleton */}
          <p className="placeholder-glow mb-3">
            <span className="placeholder col-5"></span>
          </p>

          {/* Price skeleton */}
          <h4 className="placeholder-glow mb-3">
            <span className="placeholder col-4"></span>
          </h4>

          {/* Add to cart button skeleton */}
          <span className="placeholder-glow d-block">
            <span
              className="placeholder col-12"
              style={{ height: '38px' }}
            ></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
