
const MenuItem = ({ item }) => {

    const { image, name, recipe, price } = item;
    return (
        <div className="flex space-x-4">
            <img style={{ borderRadius: '0 200px 200px 200px' }} className="w-[70px] h-[70px] md:w-[100px] md:h-[100px]" src={image} alt="" />
            <div>
                <h3 className="uppercase text-primary">{name} -------</h3>
                <p className="text-gray-300"> {recipe}</p>
            </div>
            <p className="hidden md:block text-yellow-600">{price}</p>
        </div>
    );
};

export default MenuItem;