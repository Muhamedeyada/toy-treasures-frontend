import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { UpdateUserSchema } from "../../utils/validation/userValidation";
import cities from "../../utils/staticData/cities.json";
import { useCallback, useState } from "react";
import userApiRequests from "../../services/apiRequests/userApiRequests";
import { getModifiedFields } from "../../utils/formUtils";
import { useUserContext } from "../../contexts/UserContext";
import { useToast, TOAST_TYPES } from "../../hooks/useToast";

const AccountDetails = () => {
  const { user, setUser } = useUserContext();
  const [updateUserFormError, setUpdateUserFormError] = useState("");
  const [isFormModified, setIsFormModified] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    password: "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const modifiedValues = getModifiedFields(initialValues, values);
    if (Object.keys(modifiedValues).length === 0) {
      setSubmitting(false);
      return;
    }
    try {
      const response = await userApiRequests.updateUser(
        user._id,
        modifiedValues
      );
      setUpdateUserFormError("");
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      setIsFormModified(false);
      showToast("Account Updated successfully", TOAST_TYPES.SUCCESS);
    } catch (error) {
      setUpdateUserFormError(
        error.message || "An unexpected error occurred. Please try again later."
      );
      showToast(error.message, TOAST_TYPES.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Edit Your Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateUserSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, setFieldValue, initialValues, isValid }) => (
          <Form className="space-y-6">
            {updateUserFormError && (
              <div className="bg-red-200 border border-red-400 text-red-800 px-4 py-2 rounded relative mb-2">
                <span className="block sm:inline">{updateUserFormError}</span>
              </div>
            )}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[--secondary-color]"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-[--primary-color] focus:border-[--primary-color]"
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                  e.target.value !== initialValues.name
                    ? setIsFormModified(true)
                    : setIsFormModified(false);
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[--secondary-color]"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-[--primary-color] focus:border-[--primary-color]"
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                  e.target.value !== initialValues.email
                    ? setIsFormModified(true)
                    : setIsFormModified(false);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[--secondary-color]"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-[--primary-color] focus:border-[--primary-color]"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                  e.target.value !== initialValues.password
                    ? setIsFormModified(true)
                    : setIsFormModified(false);
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className=" flex justify-between">
              <div className="space-y-2 w-5/12">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[--secondary-color]"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-[--primary-color] focus:border-[--primary-color]"
                  onChange={(e) => {
                    setFieldValue("phoneNumber", e.target.value);
                    e.target.value !== initialValues.phoneNumber
                      ? setIsFormModified(true)
                      : setIsFormModified(false);
                  }}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2 w-5/12">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[--secondary-color]"
                >
                  Address
                </label>
                <Field
                  as="select"
                  name="address"
                  id="address"
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:ring focus:ring-[--primary-color] focus:border-[--primary-color]"
                  onChange={(e) => {
                    setFieldValue("address", e.target.value);
                    e.target.value !== initialValues.address
                      ? setIsFormModified(true)
                      : setIsFormModified(false);
                  }}
                >
                  <option value="">Select Address</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !isFormModified}
                className={`mt-4 w-3/5 py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out ${
                  isFormModified && isValid
                    ? "bg-[--primary-color] text-[--secondary-color] hover:bg-lime-300"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Saving Your Changes..." : "Save Change"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default AccountDetails;
