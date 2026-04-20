import {z} from "zod";

export const signupSchema = z.object({
    full_name: z.string().min(5, { message: "El nombre completo debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirm_password: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres" }),
}
)