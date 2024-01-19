import { model, Model, Document, Schema } from "mongoose";
import { Password } from "../services/Password";

/**
 * The properties required to create a new User.
 */
interface UserFields {
  email: string;
  password: string;
}

/**
 * The properties that a mongoose User document has.
 * A document is akin to a row in a table
 * (may be different than {@link UserFields}
 */
interface UserDoc extends Document {
  email: string;
  password: string;
}

/**
 * The properties of a User mongoose model.
 *
 * A model is akin to the table (entire collection) of rows,
 * It is the primary object you interact with when working with the collection.
 *
 * Defining a typesafe `build` method here to create new Users.
 */
interface UserModel extends Model<UserDoc> {
  build(fields: UserFields): UserDoc;
}

/**
 * A mongoose schema defines the structure and types of your document.
 *
 * You can define static methods on the model, instance methods on the document,
 * create indexes and attach lifecycle hooks (middleware).
 */
const userSchema = new Schema<UserDoc, UserModel>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      // mongoose has a built in 'toJSON' method we can customize
      // using this as the DTO mapper
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);
userSchema.statics.build = (fields: UserFields) => {
  return new User(fields);
};
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // hash the password on user save
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
