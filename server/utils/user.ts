import type { SQL } from "drizzle-orm";
import type { UserInsert, UserInsertWithRole } from "~~/server/utils/drizzle";

export async function findUserById(userId: string) {
  return useDrizzle().select().from(tables.users).where(eq(tables.users.id, userId)).get();
}

export async function findUserByGitHubId(githubId: number) {
  return useDrizzle().select().from(tables.users).where(eq(tables.users.githubId, githubId)).get();
}

export async function findUserByTwitchId(twitchId: string) {
  return useDrizzle().select().from(tables.users).where(eq(tables.users.twitchId, twitchId)).get();
}

export async function findUserBy(query: SQL | undefined) {
  return useDrizzle().select().from(tables.users).where(query).get();
}

export async function createUser(user: UserInsertWithRole) {
  // Check that the role exists
  const roleExists = await useDrizzle().select().from(tables.roles).where(eq(tables.roles.id, user.roles[0])).get();

  if (!roleExists) {
    // Create role
    const createdRole = await useDrizzle()
      .insert(tables.roles)
      .values({ id: user.roles[0], name: "USER", label: "USER" })
      .returning({ id: tables.roles.id, name: tables.roles.name })
      .get();
    user.roles[0] = createdRole.id;
  }

  const createdUser = await useDrizzle()
    .insert(tables.users)
    .values(user)
    .returning({
      id: tables.users.id,
      email: tables.users.email,
      name: tables.users.name,
      avatar: tables.users.avatar,
      verifiedAt: tables.users.verifiedAt,
    })
    .get();
  if (user.roles && user.roles.length > 0) {
    await useDrizzle().insert(tables.userRoles).values(
      user.roles.map(roleId => ({
        userId: createdUser.id,
        roleId: roleId,
      })),
    );
  }

  return createdUser;
}

export async function updateUser(userId: string, user: Partial<UserInsert>) {
  return useDrizzle().update(tables.users).set(user).where(eq(tables.users.id, userId)).run();
}

export async function deleteProfilePicture(avatar: string) {
  if (avatar.startsWith("profile-pictures/")) {
    await hubBlob().delete(avatar);
  }
}
