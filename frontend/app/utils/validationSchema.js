import * as Yup from "yup";

export const validationSchema = Yup.object({
  carName: Yup.string().required("Car Name is required"),
  carModel: Yup.string().required("Car Model is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  city: Yup.string().required("City is required"),
  numberOfCopies: Yup.number()
    .required("Number of copies is required")
    .min(1, "At least one copy must be selected")
    .max(3, "Maximum 3 copies can be selected"),
});
