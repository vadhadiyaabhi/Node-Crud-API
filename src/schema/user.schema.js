// import { object, string, ref} from "yup";
const yup = require("yup");

const createUserSchema = yup.object({
    body: yup.object({
        username: yup.string().required("Name is required"),
        password: yup.string()
                 .required("Password is required")
                 .min(6, "Password is too short - should be 6 chars minimum.")
                 .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,14}/, "Password must contain atleast one Uppercase, Lowercase and one digit"),
        cpassword: yup.string().oneOf(
            [yup.ref("password"), null],
            "password must match"
        ),
        email: yup.string()
              .email("Must be a valid email")
              .required("Email is required")
    })
})

module.exports = createUserSchema;