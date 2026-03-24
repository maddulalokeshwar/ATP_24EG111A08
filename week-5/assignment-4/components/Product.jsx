function Product(props){
    const { productObj } = props;

    return(
        <div className="border border-black rounded-lg p-4 m-4 shadow">
            <h2 className="text-2xl text-green-500">
                {productObj.title}
            </h2>
            <p className="py-6">
                {productObj.description}
            </p>
            <p>
                Category: {productObj.category}
            </p>
            <p>
                Price: ₹{productObj.price}
            </p>
            <p>
                Rating: {productObj.rating.rate} ({productObj.rating.count})
            </p>
        </div>
    );
}

export default Product;