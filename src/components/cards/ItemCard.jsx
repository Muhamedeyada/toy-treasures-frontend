import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneEye } from "react-icons/ai";
import { useUserContext } from "../../contexts/UserContext";
import wishlistServices from "../../services/wishlistServices";

const getConditionColor = (condition) => {
  switch (condition) {
    case "new":
      return "bg-green-500";
    case "gentle":
      return "bg-yellow-500";
    case "used":
      return "bg-red-500";
  }
};

const ItemCard = ({ item }) => {
  const { user, wishlist, setWishlist, userContextLoading } = useUserContext();
  const [inWishlist, setInWishlist] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (wishlist?.items.length > 0) {
      setInWishlist(wishlist.items.some((i) => i._id === item._id));
    }
  }, []);

  const handleAddToOrRemoveFromWishlist = async () => {
    try {
      if (inWishlist) {
        wishlistServices.removeItemFromWishlist(
          item._id,
          wishlist,
          setWishlist
        );
      } else {
        wishlistServices.addItemToWishlist(item, wishlist, setWishlist);
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="transform transition-all duration-500 hover:scale-105  rounded-lg shadow-md overflow-hidden w-full h-[300px]  flex flex-col">
      <div className="p-2 sm:p-3 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2 gap-1">
          <span
            className={`inline-block px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white ${getConditionColor(
              item.condition
            )} rounded-md`}
          >
            {item.condition}
          </span>

          {item.isAvailableForSwap && (
            <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-lg text-[--primary-color] border border-[--primary-color] animate-text-shimmer bg-gradient-to-r from-[--primary-color] via-[--secondary-color] to-[--primary-color] bg-[length:200%_100%] bg-clip-text text-transparent whitespace-nowrap">
              Available For Swap
            </span>
          )}
        </div>

        <div className="relative w-full h-40 sm:h-40 mb-2 flex-shrink-0 ">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-fit transition-opacity duration-300 rounded-md "
          />
        </div>

        <div className="flex justify-between items-start gap-1 ">
          <h6 className="text-sm sm:text-base font-semibold line-clamp-2 flex-1">
            <Link to={`/items/${item._id}`}>{item.name}</Link>
          </h6>
          <div className="text-white bg-[--secondary-color] font-bold rounded-full text-[10px] sm:text-xs py-0.5 px-2 whitespace-nowrap">
            ${item.price ? item.price.toFixed(2) : "0.00"} USD
          </div>
        </div>

        <div className="mt-auto">
          {user && user._id !== item.ownerId._id && (
            <button
              className="bg-[--primary-color] w-auto mx-auto py-1.5 sm:py-2 px-3 border-none rounded-full flex items-center justify-center gap-1.5 text-white text-xs sm:text-sm font-medium relative shadow-lg shadow-gray-900/20 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden hover:shadow-gray-900/30 active:scale-95 group"
              onClick={handleAddToOrRemoveFromWishlist}
              disabled={userContextLoading}
            >
              <AiTwotoneEye className="w-3 h-3 sm:w-4 sm:h-4 fill-white z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-[4px]" />
              <span className="whitespace-nowrap">
                {userContextLoading
                  ? "Loading..."
                  : inWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </span>
            </button>
          )}
          {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
