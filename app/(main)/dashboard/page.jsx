import { currentUser } from "@clerk/nextjs/server";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const user = await currentUser();

  const displayName =
    user?.username ||
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "User";

  return <Dashboard displayName={displayName} />;
}