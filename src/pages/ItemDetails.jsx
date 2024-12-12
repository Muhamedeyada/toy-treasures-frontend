import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userApiRequests from "../services/apiRequests/userApiRequests";
import itemApiRequests from "../services/apiRequests/itemApiRequests";
import MagnifyingGlassImage from "../components/MagnifyingGlassImage";
import { AiTwotoneEye } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import wishlistServices from "../services/wishlistServices";

const getConditionColor = (condition) => {
  switch (condition) {
    case "new":
      return "bg-green-500";
    case "gently used":
      return "bg-yellow-500";
    case "used":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const ItemDetails = () => {
  const { id } = useParams();
  const { user, wishlist, setWishlist, userContextLoading } = useUserContext();
  const [inWishlist, setInWishlist] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemApiRequests.getItemById(id);
        setItem(response.item);
        if (response.item.ownerId) {
          const sellerResponse = await userApiRequests.getUserById(
            response.item.ownerId
          );
          setSeller(sellerResponse.user);
        } else {
          setError("Seller information is not available");
        }
      } catch (error) {
        setError(error.message || "Error fetching item or seller information");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [id]);

  useEffect(() => {
    if (wishlist?.items.length > 0) {
      setInWishlist(wishlist.items.some((i) => i._id === item?._id));
    }
  }, [wishlist, item]);

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
      setError(error.message || "Error Adding or removing item from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="flex mx-auto w-full lg:w-3/5 flex-col gap-4 h-screen my-20">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="container mx-auto w-full lg:w-4/5 shadow-2xl bg-base-100 rounded-2xl my-6 p-2 lg:p-5">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Image + Seller Info */}
          <figure className="lg:w-1/3 flex items-center justify-center mt-6 lg:mt-0 order-1 lg:order-2">
            <div className="w-full aspect-square">
              <MagnifyingGlassImage
                src={item.thumbnail}
                alt={item.name}
                magnifierSize={120}
                zoomLevel={2.5}
              />
            </div>
          </figure>

          {/* Right Section - Item Details + Wishlist + Seller Contact */}
          <div className="lg:w-2/3 pr-0 lg:pr-10 order-2 lg:order-1">
            <h1 className="card-title mb-4 text-2xl lg:text-4xl font-semibold text-[var(--secondary-color)]">
              {item.name}
            </h1>
            <p className="text-[var(--secondary-color)] mb-5 text-base">
              {item.description}
            </p>
            <p className="text-[var(--secondary-color)] mb-5 text-base pb-3">
              Condition:
              <span
                className={`inline-block px-2 ml-2 text-xs font-semibold text-white ${getConditionColor(
                  item.condition
                )} rounded-md`}
              >
                {item.condition}
              </span>
            </p>
            {item.isAvailableForSwap && (
              <span className="text-xs p-1 rounded-lg text-[--primary-color] border border-[--primary-color] animate-text-shimmer bg-gradient-to-r from-[--primary-color] via-[--secondary-color] to-[--primary-color] bg-[length:200%_100%] bg-clip-text text-transparent">
                Available For Swap
              </span>
            )}
            <p className="text-4xl font-bold mt-4 mb-6 text-[var(--secondary-color)]">
              ${item.price.toFixed(2)} USD
            </p>

            {/* Wishlist Button */}
            {user && (
              <button
                className="bg-[--primary-color] w-auto mt-auto py-2 px-4 border-none rounded-full flex items-center justify-center gap-2
                 text-white text-sm font-medium relative shadow-lg shadow-gray-900/20 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden hover:shadow-gray-900/30 active:scale-95 group"
                onClick={handleAddToOrRemoveFromWishlist}
                disabled={userContextLoading}
              >
                <AiTwotoneEye className="w-4 h-4 fill-white z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-[4px]" />
                {userContextLoading
                  ? "Loading..."
                  : inWishlist
                  ? "Remove from "
                  : "Add to "}
                Wishlist
              </button>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            {/* Seller Contact Information Section */}
            {seller && (
              <div className="mt-6 bg-[--secondary-color-light] p-6 rounded-xl  transition-transform duration-300 ease-in-out transform">
                <h2 className="text-3xl font-bold text-[--secondary-color] mb-4">
                  Seller Contact Information
                </h2>
                <div className="space-y-3 text-lg text-[--secondary-color-dark]">
                  <p>
                    <strong className="font-semibold">Name: </strong>
                    {seller.name}
                  </p>
                  <p>
                    <strong className="font-semibold">Email: </strong>
                    <a
                      href={`mailto:${seller.email}`}
                      className="text-[--primary-color] underline"
                    >
                      {seller.email}
                    </a>
                  </p>
                  <p>
                    <strong className="font-semibold">Phone: </strong>
                    <a
                      href={`tel:${seller.phoneNumber}`}
                      className="text-[--primary-color] underline"
                    >
                      {seller.phoneNumber}
                    </a>
                  </p>
                  <p>
                    <strong className="font-semibold">Address: </strong>
                    {seller.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
