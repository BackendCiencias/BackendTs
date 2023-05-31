import Role, { IRole } from "./../models/role.model";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = Promise.all([
      new Role({ name: "user" }).save(), // public
      new Role({ name: "student" }).save(),
      new Role({ name: "teacher" }).save(),
      new Role({ name: "director" }).save(),
      new Role({ name: "secretary" }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};
