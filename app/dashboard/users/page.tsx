import UsersTable from "@/components/dashboard/users/users";
import { fetchUsers } from "@/lib/actions/user-actions";

const UsersPage = async () => {
  const users = await fetchUsers();
  const data = users?.data?.map((user) => {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      role: user.publicMetadata.role
        ? (user.publicMetadata.role as string)
        : "user",
    };
  });

  return (
    <>
      <h1 className="text-xl my-4 tracking-wider">Users</h1>
      <UsersTable data={data!} />
    </>
  );
};
export default UsersPage;
