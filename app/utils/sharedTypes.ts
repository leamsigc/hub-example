import { z } from "zod";

const tagZodSchema = z.object({
  name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
  Label: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
});

const validationSchema = {
  Tags: tagZodSchema,
  Tools: z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    description: z
      .string({ required_error: "Required" })
      .min(3, { message: "Min 3 characters" }),
    icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    status: z.boolean({ required_error: "Required" }).default(true),
  }),
  Categories: z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    description: z
      .string({ required_error: "Required" })
      .min(3, { message: "Min 3 characters" }),
    icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    status: z.boolean({ required_error: "Required" }).default(true),
  }),
  Promotions: z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    description: z
      .string({ required_error: "Required" })
      .min(3, { message: "Min 3 characters" }),
    icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    status: z.boolean({ required_error: "Required" }).default(true),
  }),
  Stats: z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    description: z
      .string({ required_error: "Required" })
      .min(3, { message: "Min 3 characters" }),
    icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    status: z.boolean({ required_error: "Required" }).default(true),
  }),
  Images: z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    description: z
      .string({ required_error: "Required" })
      .min(3, { message: "Min 3 characters" }),
    icon: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    status: z.boolean({ required_error: "Required" }).default(true),
  }),
  // Users: createInsertSchema(users),
};
export const getValidationSchemaFromDrizzle = (table: keyof typeof validationSchema) => {
  return validationSchema[table];
};
