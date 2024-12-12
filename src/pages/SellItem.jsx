import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import itemApiRequests from "../services/apiRequests/itemApiRequests";
import { SellItemSchema } from "../utils/validation/itemValidation";
import BreadCrumbs from "../components/BreadCrumbs";
import ConfirmationModal from "../components/modals/ConfirmationModal";

const SellItem = () => {
  const [submitError, setSubmitError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [formActions, setFormActions] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: null,
    condition: "",
    category: "",
    isAvailableForSwap: false,
  };

  const onSubmit = (values, actions) => {
    setFormValues(values);
    setFormActions(actions);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!formValues || !formActions || isSubmitting) return;

    const { setSubmitting, resetForm } = formActions;

    try {
      setIsSubmitting(true);
      setSubmitting(true);
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (key === "image") {
          formData.append("thumbnail", formValues[key]);
        } else {
          formData.append(key, formValues[key]);
        }
      });

      await itemApiRequests.createItem(formData);
      setSubmitError("");
      resetForm();
      navigate("/my-items", { state: { isRedirected: true } });
    } catch (error) {
      setSubmitError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      setShowModal(false);
    }
  };

  return (
    <div className="mx-auto w-full flex-col align-middle p-4 md:p-4">
      <div className="w-full md:w-11/12 mx-auto py-4">
        <BreadCrumbs currentPage={"Sell Item"} />
      </div>

      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mt-2 mb-6">
          Sell Your Item
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SellItemSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting: formIsSubmitting, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Two Columns Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left Section */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="ml-4 font-semibold">
                    Item Name
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 p-4">
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter item name"
                      className="grow bg-transparent outline-none w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="ml-4 font-semibold">
                    Description
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 px-4 py-20">
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      placeholder="Enter a detailed description about your item"
                      className="grow bg-transparent outline-none w-full resize-none"
                      rows="6
                      "
                    />
                  </div>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="ml-4 font-semibold">
                    Price
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 p-4">
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="1"
                      placeholder="Enter item price"
                      className="grow bg-transparent outline-none w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Right Section */}
              {/* Image */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="image" className="ml-4 font-semibold">
                    Image
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 p-4">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept=".jpg,.jpeg,.png"
                      className="grow bg-transparent outline-none w-full"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Condition */}
                <div className="space-y-2">
                  <label htmlFor="condition" className="ml-4 font-semibold">
                    Item Condition
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 p-4">
                    <Field
                      as="select"
                      name="condition"
                      id="condition"
                      className="grow bg-transparent outline-none w-full"
                    >
                      <option value="">Select Item Condition</option>
                      <option value="new">New</option>
                      <option value="gentle">Gently Used</option>
                      <option value="used">Used</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="condition"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label htmlFor="category" className="ml-4 font-semibold">
                    Category
                  </label>
                  <div className="input input-bordered rounded-3xl bg-[#f8f8f8] flex items-center gap-2 p-4">
                    <Field
                      as="select"
                      name="category"
                      id="category"
                      className="grow bg-transparent outline-none w-full"
                    >
                      <option value="">Select Item Category</option>
                      <option value="Educational">Educational</option>
                      <option value="Action Figures & Dolls">
                        Action Figures & Dolls
                      </option>
                      <option value="Outdoor & Sports">Outdoor & Sports</option>
                      <option value="Electronic & Interactive">
                        Electronic & Interactive
                      </option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Swap Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-4">
                    <Field
                      type="checkbox"
                      id="isAvailableForSwap"
                      name="isAvailableForSwap"
                      className="w-4 h-4"
                    />
                    <label htmlFor="isAvailableForSwap" className="text-lg">
                      Available for Swap
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={formIsSubmitting}
                className="btn rounded-3xl bg-[var(--secondary-color)] w-32 py-2 text-white font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formIsSubmitting}
                className="btn rounded-3xl bg-[var(--primary-color)] w-32 py-2 text-black font-semibold hover:bg-[--primary-color] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formIsSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ConfirmationModal
        show={showModal}
        message="Are you sure you want to list this item for sale?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  );
};
export default SellItem;
