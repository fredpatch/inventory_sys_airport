import Link from "next/link";

const AccessDenied = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="text-5xl font-bold">Access Denied</h1>
      <p className="text-2xl mt-10 text-red-500">
        You do not have permission to access this page.
      </p>
      <Link href="/">
        <p className="text-xl mt-10 underline">Go back to Home</p>
      </Link>
    </div>
  );
};

export default AccessDenied;
